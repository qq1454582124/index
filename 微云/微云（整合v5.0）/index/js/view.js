var f = new File(fileData);

var oAllSideBarList = document.getElementById('disk_sidebar');
var oSideBarList = document.getElementById('root_ul');
var oBoxList = document.getElementById('content');
var oPathList = document.getElementById('main-path');
var isClearrecentRecode = false;//设置全局变量，表示有没有清除过最近列表纪录
//console.log(f);

var d = f.getChildren(0);//pid是0的节点是顶级节点
//console.log(d);

createView(d);
fnBindTopLi()//给dom树最顶层的li绑定事件

function createView(d, newRoot, isCreateDivNewId) {//obj是新父级dom节点，newRoot表示点击时以当前被点击的li作为父级，isCreateDivNewId表示是点击“新建文件夹”按钮创建的id
    oBoxList.innerHTML = '';
    oPathList.innerHTML = '';
    var pid = 0;
    for (var i=0; i<d.length; i++) {
        createSideBar(oSideBarList, d[i], newRoot);
        createContent(oBoxList, d[i], isCreateDivNewId);//默认显示缩略图
        pid=f.getPid(d[i].id);//获取展开元素的父级
    }
    //console.log(pid);
    createPath(oPathList, pid);
    if(totalStatus == 'time' || totalStatus == 'word'){//如果传了totalStatus参数，totalStatus等于time或word，就显示列表，并覆盖文件夹内容区域
        showListByMode(totalStatus);//totalStatus表示是显示缩略图还是显示列表，totalStatus是全局变量
    }
}

function createSideBar(context, d, newRoot) {//侧边栏，newRoot表示点击时以当前被点击的li作为父级
    //处理侧边栏
    if(d.type != 'folder') return;//如果数据不是文件夹类型，就不生成在dom树中
    var oLi = document.createElement('li');
    oLi.id = 'd' + d.id;
    oLi.status = 'up';
    fnBindLi(oLi, d);//给dom树中的li绑定事件
    createLiContent(d, oLi);//生成和计算当前生成的li中的图标样式值
    if(newRoot){//newRoot表示点击时以当前被点击的li作为父级
        newRoot.appendChild(oLi);
        //console.log(newRoot)
    }else{
        context.appendChild(oLi);
    }
}

function createContent(context, d, isCreateDivNewId, newPid) {//处理内容列表，isCreateDivNewId表示是点击“新建文件夹”按钮创建的，newPid表示“新建文件夹”时的父id
    var oDiv = document.createElement('div');
    var oChk = document.createElement('span');
    var oI = document.createElement('i');
    var oSpan = document.createElement('span');
    var oInput = document.createElement('input');//用于重命名
    oDiv.className = 'item left';
    oChk.className = 'checkbox-icon';
    oI.className = 'icon ' + typeData[d.type];
    //console.log(oI.className);
    oSpan.className = 'info';
    oInput.className = 'info_input';
    oInput.type = 'text';
    oSpan.innerHTML = d.name;
    fnCancelBubble(oInput);//取消文件夹图标中的文件名称的事件冒泡
    oDiv.id=d.id;
    oDiv.pid=d.pid;
    fnBindDiv(oDiv, d);//给文件夹区域中的div绑定事件
    oDiv.appendChild(oChk);
    oDiv.appendChild(oI);
    oDiv.appendChild(oSpan);
    oDiv.appendChild(oInput);
    if(isCreateDivNewId && isCreateDivNewId == d.id){//isCreateDivNewId是点击“新建文件夹”按钮创建的Div的id，如果传了isCreateDivNewId，并且这个新创建div的id和当前对象相等，就把当前对象创建的oSpan和oInput加样式
        if(newPid && f.getChildren(newPid) && !f.getChildren(newPid).length){//如果新建文件夹时，父级中没有子节点，就清空父级的“暂无文件”内容
            context.innerHTML = '';
        }
        context.insertBefore(oDiv, getFirst(context));//放到最前面
    }else{
        context.appendChild(oDiv);//通过数据读取生成的
    }
    selectAll();//全选
    hover();//鼠标悬浮
    drag();//拖拽产生图标
    fnInfo();//限制文件名过长撑开
}


/*生成上方导航路径*/
function createPath(context, nowId){
    /*如果存在父级就递归*/
    var oI = document.createElement('i');
    var parent = f.getById(f.getPid(nowId));
    if(parent){//如果存在父级就递归
        createPath(context, f.getPid(nowId));//递归调用，f.getPid(nowId)是当前要显示的节点的父id
    }
    /*清除之前导航的样式并提升层级*/
    var oIs = oPathList.getElementsByTagName('i');
    for(var i=0;i<oIs.length;i++){
        removeClass(oIs[i] , 'cur');//去除导航路径的灰色
        oIs[i].style.zIndex = parseInt(oIs[i].style.zIndex) + 1;//之前已经在页面上的导航标签层级都加1
    }
    /*生成当前导航*/
    var oI = document.createElement('i');
    var now = f.getById(nowId);//当前要显示的节点
    oI.pathId = nowId;//相当于加个id
    oI.innerHTML = now.name;
    oI.className = 'main-icon main cur';//给当前要显示的节点加灰色
    oI.style.zIndex = 1;//定义层级
    fnBindI(oI);//给导航中的i绑定事件
    context.appendChild(oI);
}


/*dom树展开时的函数*/
function fnUp(obj, children, data, nowId, isNotArrowIcon){//isNotArrowIcon代表点击的不是li中的小箭头图标
    obj.status = 'down';
    fnArrow(children, 'arrow_down', 'arrow_up');//小箭头换成展开图标
    if(isNotArrowIcon){//如果点击的不是li中的小箭头图标，就重新生成导航和更新文件夹区域页面
        oPathList.innerHTML = '';//清空原来的导航
        createPath(oPathList, nowId);//有或没有子文件或子文件夹，都重新生成导航
        /*显示缩略图还是显示列表
        // oBoxList.innerHTML = '';
        // for (var i=0; i<data.length; i++) {
        //     createContent(oBoxList, data[i]);//只重新更新文件夹区域页面
        // }
        */
        showListByMode(totalStatus);//后加
    }
    if(data.length){//如果有子文件或子文件夹
        if(obj.hasAppendChildren){//如果dom树的li中已经添加过子节点就不再生成ul了
            for (var i=0; i<children.length; i++) {//显示当前li下隐藏的子节点
                if (children[i].nodeType == 1 && children[i].tagName.toLowerCase() == 'ul') {
                    children[i].style.display='block';
                }
            }
        }else{//如果当前li下还没有添加过子节点，就向dom树的li中追加新节点
            var oUl = document.createElement('ul');
            for(var i=0;i<data.length;i++){
                createSideBar(oSideBarList, data[i], oUl);//只重新更新dom树区域
            }
            obj.appendChild(oUl);
            obj.hasAppendChildren = true;//当有子文件或子文件夹时，标识子节点已经添加到页面了  
        } 
    }else{//如果没有子文件或子文件夹
        oBoxList.innerHTML = emptyFilePage.innerHTML;//'暂无文件';
    }
}


/*dom树收缩时的函数*/
function fnDown(obj, children){
    obj.status = 'up';
    fnArrow(children, 'arrow_up', 'arrow_down');//小箭头换成收缩图标
    for (var i=0; i<children.length; i++) {
        if (children[i].nodeType == 1 && children[i].tagName.toLowerCase() == 'ul') {
            children[i].style.display='none';
        }
    }
}


/*小箭头收缩展开更换图标*/
function fnArrow(children, aClass, rClass){//aClass是要添加的类名，rClass是要删除的类名
    for (var i=0; i<children.length; i++) {//小箭头收缩
        if (children[i].tagName.toLowerCase() == 'span' && isContainClass(children[i],'arrow')){
            removeClass(children[i], rClass);
            addClass(children[i], aClass);
        }
    }
}


/*生成和计算当前生成的li中的图标样式值*/
function createLiContent(d, oLi){
    var parent = f.getById(d.pid);
    var parentDivPaddingLeft = 0;//用来存放父级li中的div的padding-left值
    var parentDivWidth = 0;//用来存放父级li中的div的width值
    var parentFolderLeft = 0;//用来存放父级li中的文件夹图标span的left值
    var parentArrowLeft = 0;//用来存放父级li中的小箭头图标span的left值
    if(parent){//如果存在父级
        var oParentLi = document.getElementById('d'+d.pid);//通过dom获取父级li
        var oPChildren = oParentLi.children;
        for (var i=0; i<oPChildren.length; i++) {
            if(oPChildren[i].nodeType == 1){
                if (oPChildren[i].tagName.toLowerCase() == 'div') {
                    parentDivPaddingLeft = parseInt(getStyle(oPChildren[i],'paddingLeft'));//获取父级li中的div的padding-left值
                    parentDivWidth = parseInt(getStyle(oPChildren[i],'width'));//获取父级li中的div的padding-left值
                }
                if(oPChildren[i].tagName.toLowerCase() == 'span' && isContainClass(oPChildren[i],'folder')){
                    parentFolderLeft = parseInt(getStyle(oPChildren[i],'left'));//获取父级li中的文件夹图标span的left值
                }
                if(oPChildren[i].tagName.toLowerCase() == 'span' && isContainClass(oPChildren[i],'arrow')){
                    parentArrowLeft = parseInt(getStyle(oPChildren[i],'left'));//获取父级li中的小箭头图标span的left值
                }
            }
        }
    }
    var divPaddingLeft = parentDivPaddingLeft + 10;//计算当前生成的li中的div的padding-left值
    var divWidth = parentDivWidth - 10;//计算当前生成的li中的div的width值
    var folderLeft = parentFolderLeft + 10;//计算当前生成的li中的文件夹图标span的left值
    var arrowLeft = parentArrowLeft + 10;//计算当前生成的li中的小箭头图标span的left值
    var html = '<span class="folder" style="left:'+folderLeft+'px;"></span><div title="' + d.name + '" style="width:'+divWidth+'px;padding-left:'+divPaddingLeft+'px;">' + d.name + '</div>';
    //有子级
    if ( f.isParent(d.id) && (f.isChildrenContainFolder(d.id)) ) {//有子级并且包含类型是folder的子级元素，就显示小箭头图标
        html = '<span class="arrow arrow_up" style="left:'+arrowLeft+'px;"></span>' + html;
    }
    oLi.innerHTML = html;
}


/*点击dom树中div加选中颜色*/
function fnDivActive(children){
    var oDivs = getByClass(oAllSideBarList, 'div', 'active');
    for (var i=0; i<oDivs.length; i++) {
        removeClass(oDivs[i], 'active');//先去掉所有div颜色
    }
    for (var i=0; i<children.length; i++) {
        if (children[i].nodeType == 1 && children[i].tagName.toLowerCase() == 'div') {
            addClass(children[i], 'active');//点击则div加选中颜色
        }
    }
}



/*取消文件夹图标中的文件名称的事件冒泡*/
function fnCancelBubble(obj){
    obj.onclick = function(ev) {//点击文件名称
        var ev = ev || event;
        if(isContainClass(this,'info_input')){//如果当前是可编辑状态
            ev.cancelBubble = true;//取消事件冒泡
        }
    }
    obj.onmousedown = function(ev) {//按下文件名称
        var ev = ev || event;
        if(isContainClass(this,'info_input')){//如果当前是可编辑状态
            ev.cancelBubble = true;//取消事件冒泡
        }
    }
    obj.onmousemove = function(ev) {//移动文件名称
        var ev = ev || event;
        if(isContainClass(this,'info_input')){//如果当前是可编辑状态
            ev.cancelBubble = true;//取消事件冒泡
        }
    }
    obj.onmouseup = function(ev) {//离开文件名称
        var ev = ev || event;
        if(isContainClass(this,'info_input')){//如果当前是可编辑状态
            ev.cancelBubble = true;//取消事件冒泡
        }
    }
}


/*给dom树中的li绑定事件*/
function fnBindLi(oLi, d){
    oLi.onclick = function(ev) {
        var e = ev || event;
        e.cancelBubble = true;
        var target = e.target || e.srcElement;
        var children = this.children;//被点击dom元素下的所有子节点
        var data = f.getChildren(d.id);
        if ( target.tagName.toLowerCase() == 'span' && isContainClass(target,'arrow')) {//如果点击的是小箭头，isContainClass判断事件源的className是否包含arrow
            //console.log(this.status);
            if (this.status == 'up') {//展开
                fnUp(this, children, data, d.id);//dom树展开时的函数
            }else{//收缩
                fnDown(this, children);//dom树收缩时的函数
            }
        }else if ((target.tagName.toLowerCase() == 'span' && target.className == 'folder') || target.tagName.toLowerCase() == 'div') {//如果点击的是文件夹图标或li中的文字
            fnUp(this, children, data, d.id, true);//dom树展开时的函数，true代表isNotArrowIcon为真，isNotArrowIcon代表点击的不是li中的小箭头图标
            fnDivActive(children);//点击dom树中div加选中颜色 
        }
    }
    oLi.onmouseover = function(ev) {
        var e = ev || event;
        e.cancelBubble = true;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() == 'div'){
            addClass(target, 'on');//滑过变色
        }
    }
    oLi.onmouseout = function(ev) {
        var e = ev || event;
        e.cancelBubble = true;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() == 'div'){
            removeClass(target, 'on');//滑过变色
        }
    }
}


/*给dom树最顶层的li绑定事件*/
function fnBindTopLi(){
    var oLi = document.getElementById('d0');//获取dom树最顶层的li
    oLi.status = 'down';//状态为down，下次点击li时就会收缩
    oLi.hasAppendChildren = true;//当有子文件或子文件夹时，标识子节点已经添加到页面了
    var d = f.getById(0);
    fnBindLi(oLi, d);
}


/*给文件夹区域中的div绑定事件*/
function fnBindDiv(oDiv, d){
    oDiv.onclick = function() {
        if(d.type != 'folder') return;//如果数据不是文件夹类型，就不执行
        oPathList.innerHTML = '';//清空原来的导航
        createPath(oPathList, d.id);//有或没有子文件或子文件夹，都重新生成导航
        var oLi = document.getElementById('d'+d.id);//获取div对应dom树的li
        var children = oLi.children;//被点击div对应dom树的li下的所有子节点
        fnDivActive(children);//被点击div对应dom树的li中div加选中颜色
        oLi.status = 'down';//状态为down，下次点击li时就会收缩
        fnArrow(children, 'arrow_down', 'arrow_up');//小箭头换成展开图标
        var data = f.getChildren(d.id);
        if(data.length){//如果有子文件或子文件夹
            if(oLi.hasAppendChildren){//如果当前li下已经添加过子节点了
                for (var i=0; i<children.length; i++) {//显示当前li下隐藏的子节点
                    if (children[i].nodeType == 1 && children[i].tagName == 'UL') {
                        children[i].style.display='block';
                    }
                }
                /*显示缩略图还是显示列表
                // oBoxList.innerHTML = '';
                // for (var i=0; i<data.length; i++) {
                //     createContent(oBoxList, data[i]);//只重新更新文件夹区域页面
                // }
                */
                showListByMode(totalStatus);//后加
            }else{//如果这li下还没有添加过子节点，就向dom树的li中追加新节点
                var oUl = document.createElement('ul');
                createView(data,oUl);//这句保留，还要更新上方导航和dom树
                showListByMode(totalStatus);//后加
                oLi.appendChild(oUl);
                oLi.hasAppendChildren = true;//当有子文件或子文件夹时，标识子节点已经添加到页面了
            }
        }else{//如果没有子文件或子文件夹
            oBoxList.innerHTML = emptyFilePage.innerHTML;//'暂无文件';
        }
    }
}


/*给导航中的i绑定事件*/
function fnBindI(oI){
    oI.onclick = function(){
        var oLi = document.getElementById('d'+this.pathId);//获取当前导航对应dom树的li
        var children = oLi.children;
        fnDivActive(children);//给当前导航对应dom树的li中div加选中颜色
        oPathList.innerHTML = '';
        createPath(oPathList, this.pathId);//重新生成导航
        oBoxList.innerHTML = '';
        var data = f.getChildren(this.pathId);
        if(data.length){//如果有子文件或子文件夹
            /*显示缩略图还是显示列表
            // for (var i=0; i<data.length; i++) {
            //     createContent(oBoxList, data[i]);//重新更新文件夹区域页面
            // }
            */
            showListByMode(totalStatus);//后加
        }else{//如果没有子文件或子文件夹
            oBoxList.innerHTML = emptyFilePage.innerHTML;//'暂无文件';
        }
    }
    oI.onmouseover = function(){
        addClass(this,'active');
    }
    oI.onmouseout = function(){
        removeClass(this,'active');
    }
}


/*左侧侧边栏切换*/
sideMenu();
function sideMenu(){
    var oUl = document.getElementById('sideMenu');
    var oLi = oUl.getElementsByTagName('li');
    var toolBar = document.getElementById('toolbar');
    var contentNav = document.getElementById('content-nav');
    var tBtnRecent = document.getElementById('tBtn-recent');
    var tBtnRecycle = document.getElementById('tBtn-recycle');
    var tBtnQQOutline = document.getElementById('tBtn-qqOutline');
    var tBtnMusic = document.getElementById('tBtn-music');
    var tBtnPicture = document.getElementById('tBtn-picture');
    var tBtnAvi = document.getElementById('tBtn-avi');
    var tBtnDocu = document.getElementById('tBtn-docu');
    var viewModeSort = document.getElementById('view-mode-sort');
    var tmpDiv = null;
    var children = null;
    var typeArr=['doc','xls','ppt','pdf'];
    var folderToolbar = document.getElementById('folder-toolbar');
    var viewDrop = document.getElementById('view-drop');
    var aShow = document.getElementById('showDom');
    for(var i=0;i<oLi.length;i++){
        oLi[i].onclick=function(){
            for(var j=0;j<oLi.length;j++){
                removeClass(oLi[j], 'cur');
            }
            addClass(this, 'cur');
            /*隐藏文档树*/
            var domBox = getId('dom-box');
            aShow.style.backgroundColor = '#FFF';
            aShow.children[0].style.opacity = '0.6';
            aShow.onOff = false;
            domBox.className = '';
            setContent();
            /*END 隐藏文档树*/
            var type = this.getAttribute('type');
            if(type == 'docu'){//文件类型
                var d = f.getChildrenByTypes(typeArr);//type是文件类型
            }else if(type == 'recent'){//最近文件列表
                if(!isClearrecentRecode){//如果没清除过最近列表纪录
                    var interval = 7*24*60*60*1000;//传入距离当前时间七天前的日期
                    var d = f.getChildrenByRecent(new Date() - interval);
                }else{//如果没清除了最近列表纪录
                    var d = f.getChildrenByRecent(new Date());
                }
            }else if(type == 'recycle'){//回收站列表
                var d = f.getFormRecycle();
            }else if(type == 'folder'){//目录列表
                var d = f.getChildren(getLast(oPathList).pathId);//点击目录列表，根据当前根节点显示列表
            }else{
                var d = f.getChildrenByType(type);//type是文件类型
            }
            if(type != 'folder'){
                contentNav.style.display = 'none';//让上方导航消失
            }else{
                contentNav.style.display = 'block';//让上方导航显示
            }
            if(type == 'recent' || type == 'recycle'){
                createList(d, true);//左侧侧边栏切换生成列表，true表示类型列表中不生成复选框
            }else if(type == 'folder'){
                showListByMode(totalStatus);
            }else if(type == 'qqOutline'){//QQ离线文件
                oBoxList.innerHTML = emptyFilePage.innerHTML;//'暂无文件';
            }else{
                createList(d);//左侧侧边栏切换生成列表
            }
            // else if(type == 'note'){//笔记
            //     oBoxList.innerHTML = emptyNotePage.innerHTML;//'暂无笔记';
            // }
            switch(type){//改变顶部按钮显示，显示当前工具栏
                case 'folder':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    folderToolbar.style.display = 'block';
                    viewDrop.style.display = 'block';
                    break;
                case 'recent':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    tBtnRecent.style.display = 'block';
                    tBtnRecent.onclick=function(){//清空记录按钮
                        fnClearRecent();
                    }
                    if(!isClearrecentRecode){//如果没清除过最近列表纪录
                        var oDiv = document.createElement('div');
                        oDiv.className = 'timeTips';
                        oDiv.innerHTML = '最近7天';
                        oBoxList.insertBefore(oDiv,getFirst(oBoxList)); 
                    }                    
                    break;
                case 'recycle':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    tBtnRecycle.style.display = 'block';
                    tBtnRecycle.onclick=function(){//删除按钮
                        fnClearRecycle();
                    }
                    break;
                case 'qqOutline':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    tBtnQQOutline.style.display = 'block';
                    break;
                case 'mp3':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    tBtnMusic.style.display = 'block';
                    tBtnMusic.onclick=function(){//删除按钮
                        fnDeleteFromList();
                    }
                    break;
                case 'jpg':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    tBtnPicture.style.display = 'block';
                    tBtnPicture.onclick=function(){//删除按钮
                        fnDeleteFromList();
                    }
                    break;
                case 'avi':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    tBtnAvi.style.display = 'block';
                    tBtnAvi.onclick=function(){//删除按钮
                        fnDeleteFromList();
                    }
                    break;
                case 'docu':
                    for(var i=0;i<toolBar.children.length;i++){
                        toolBar.children[i].style.display = 'none';
                    }
                    viewModeSort.style.display = 'block';
                    tBtnDocu.style.display = 'block';
                    var allBtn = getByClass(viewModeSort, 'span', 'all')[0];
                    var docBtn = getByClass(viewModeSort, 'span', 'doc')[0];
                    var xlsBtn = getByClass(viewModeSort, 'span', 'xls')[0];
                    var pptBtn = getByClass(viewModeSort, 'span', 'ppt')[0];
                    var pdfBtn = getByClass(viewModeSort, 'span', 'pdf')[0];
                    allBtn.onclick=function(){
                        for(var i=0;i<viewModeSort.children.length;i++){//去掉高亮
                            removeClass(viewModeSort.children[i], 'on');
                        }
                        addClass(this, 'on');//增加高亮
                        var d = f.getChildrenByTypes(typeArr);//type是文件类型
                        createList(d);//左侧侧边栏切换生成列表
                    }
                    docBtn.onclick=function(){
                        for(var i=0;i<viewModeSort.children.length;i++){//去掉高亮
                            removeClass(viewModeSort.children[i], 'on');
                        }
                        addClass(this, 'on');//增加高亮
                        var type = 'doc';
                        var d = f.getChildrenByType(type);//type是文件类型
                        createList(d);//左侧侧边栏切换生成列表
                    }
                    xlsBtn.onclick=function(){
                        for(var i=0;i<viewModeSort.children.length;i++){//去掉高亮
                            removeClass(viewModeSort.children[i], 'on');
                        }
                        addClass(this, 'on');//增加高亮
                        var type = 'xls';
                        var d = f.getChildrenByType(type);//type是文件类型
                        createList(d);//左侧侧边栏切换生成列表
                    }
                    pptBtn.onclick=function(){
                        for(var i=0;i<viewModeSort.children.length;i++){//去掉高亮
                            removeClass(viewModeSort.children[i], 'on');
                        }
                        addClass(this, 'on');//增加高亮
                        var type = 'ppt';
                        var d = f.getChildrenByType(type);//type是文件类型
                        createList(d);//左侧侧边栏切换生成列表
                    }
                    pdfBtn.onclick=function(){
                        for(var i=0;i<viewModeSort.children.length;i++){//去掉高亮
                            removeClass(viewModeSort.children[i], 'on');
                        }
                        addClass(this, 'on');//增加高亮
                        var type = 'pdf';
                        var d = f.getChildrenByType(type);//type是文件类型
                        createList(d);//左侧侧边栏切换生成列表
                    }
                    tBtnDocu.onclick=function(){//删除按钮
                        fnDeleteFromList();
                    }
                    break;
            }
        }
    }
}


/*左侧侧边栏切换生成列表*/
function createList(d, isNotCreateCheckBox){//isNotCreateCheckBox是否不生成复选框
    var oUl = document.createElement('ul');
    oUl.className = 'con-list';
    oBoxList.innerHTML = '';
    for (var i=0; i<d.length; i++) {
        createListLi(d[i], oUl, isNotCreateCheckBox);//左侧侧边栏切换生成列表的li，isNotCreateCheckBox是否不生成复选框
    }
}

/*左侧侧边栏切换生成列表的li*/
function createListLi(d, oUl, isNotCreateCheckBox , isCreateLiNewId, newPid){//isNotCreateCheckBox是否不生成复选框，isCreateLiNewId表示是点击“新建文件夹”按钮创建的，newPid表示“新建文件夹”时的父id
    var fIco = document.getElementById('f-ico');
    var tmpDiv = fIco.cloneNode(true);//true：克隆所有子孙节点
    var oLi = document.createElement('li');
    oLi.id=d.id;
    oLi.pid=d.pid;
    //fnBindDiv(oLi, d);//给文件夹列表区域中的li绑定事件
    fnBindListLi(oLi, d);//给文件夹列表区域中的li绑定事件
    var oLDiv = document.createElement('div');
    var oDivPic = document.createElement('div');
    var oDivName = document.createElement('div');
    var oInput = document.createElement('input');//用于重命名
    oInput.className = 'file-name-input';
	oInput.type = 'text';
	fnCancelBubble(oInput);//取消文件夹图标中的文件名称的事件冒泡
    var rDiv = document.createElement('div');
    var sizeDiv = document.createElement('div');
    var timeDiv = document.createElement('div');
    var twodDiv = document.createElement('div');
    oLi.className = 'li-item clear';
    oLDiv.className = 'l-div left';
    oDivPic.className = 'file-pic left';
    oDivName.className = 'file-name left';
    rDiv.className = 'right';
    sizeDiv.className = 'inner left';
    sizeDiv.innerHTML = d.size;
    timeDiv.className = 'date-data left';
    timeDiv.innerHTML = d.time;
    twodDiv.className = 'twod-btn';
    twodDiv.innerHTML = '<span class="twod-btn"></span>';
    addClass(oDivPic, d.type);//根据文件类型不同，更换文件图标
    oDivName.innerHTML = d.name;
    if(!isNotCreateCheckBox){//如果isNotCreateCheckBox为true，则列表中不生成复选框
        var oSpan = document.createElement('span');
        oSpan.className = 'checkbox-icon';
        var oLabel = document.createElement('label');
        oLabel.className = 'left check';
        oLabel.appendChild(oSpan);
        oLDiv.appendChild(oLabel);
        fnBindLabel(oLabel);//给文件类型列表的复选框绑定事件
    }
    oLDiv.appendChild(oDivPic);
    oLDiv.appendChild(oDivName);
    oLDiv.appendChild(oInput);
    rDiv.appendChild(tmpDiv);
    rDiv.appendChild(sizeDiv);
    rDiv.appendChild(timeDiv);
    rDiv.appendChild(twodDiv);
    oLi.appendChild(oLDiv);
    oLi.appendChild(rDiv);
    if(isCreateLiNewId && isCreateLiNewId == d.id){//isCreateLiNewId是点击“新建文件夹”按钮创建的Div的id，如果传了isCreateLiNewId，并且这个新创建div的id和当前对象相等，就把当前对象创建的oDivName和oInput加样式
        if(newPid && f.getChildren(newPid) && !f.getChildren(newPid).length){//如果新建文件夹时，父级中没有子节点，就清空父级的“暂无文件”内容
            oBoxList.innerHTML = '';
            var oUl = document.createElement('ul');
            oUl.className = 'con-list';
        }
        oUl.insertBefore(oLi, getFirst(oUl));//放到最前面
    }else{
        oUl.appendChild(oLi);
    }
    oBoxList.appendChild(oUl);
    selectAll();//全选
}


/*删除文件列表的列表项*/
function fnDeleteFromList(isFolder){//isFolder是true，表示删除的是文件夹列表
    if(!countCheck()){//如果一个文件也没选
        move(deleteTip,{opacity:100, top:0}, 600, 'linear',function(){
            setTimeout(function(){
                move(deleteTip,{opacity:0, top:-32}, 600, 'linear');
            },2000);
        });
       //alert("请选择文件"); 
    }else{
        /*删除确认弹窗*/
        enterBox.style.display=delBox.style.display='block';
        oDelSpan.onclick=oDelSpan2.onclick=function(){
            enterBox.style.display=delBox.style.display='none';
        }
        /*END 删除确认弹窗*/
        oDelSpan1.onclick=function(){
            var arrIds=[];
            var pid=0;
            var parentItem=null;
            var oItem = getByClass(oContent,'li','li-item');
            var oCheckIcon = getByClass(oContent,'span','checkbox-icon');
            for(var i=0; i<oCheckIcon.length; i++){ 
                if(oCheckIcon[i].checked){
                    arrIds.push(oItem[i].id);
                    pid = f.getPid(oItem[i].id);//被删除元素的父ID
                    oBoxList.children[0].removeChild(oItem[i]);//从页面中删除
                }
            }
            f.remove(arrIds);//从数据中删除
            if(!isFolder){//如果删除的不是文件夹列表，就不往下执行了，即不更新dom树显示了
                return;
            }
            /*更新dom树显示*/
            parentItem=document.getElementById('d'+pid);//被删除子节点的父节点
            if(parentItem){//先清空dom树中li下原来的ul
               for(var i=0;i<parentItem.children.length;i++){
                    if(parentItem.children[i].nodeType==1 && parentItem.children[i].tagName=='UL'){
                        parentItem.removeChild(parentItem.children[i]);
                    }
                } 
            }
            var oUl = document.createElement('ul');
            var d = f.getChildren(pid);
            if(d.length){//如果有子级
                parentItem ? createView(d, oUl) : createView(d);//重新生成页面
                parentItem.appendChild(oUl);//重新给li添加新的ul 
            }else{//如果没有子级
                oBoxList.innerHTML = emptyFilePage.innerHTML;//'暂无文件';
                if(parentItem.children[0].nodeType==1 && parentItem.children[0].tagName=='SPAN'){//如果删除后，没有子级了，就把span箭头图标删了
                    parentItem.removeChild(parentItem.children[0]);//parentItem.children[0]是span箭头图标
                    parentItem.status = 'up';//状态为down，下次点击li时就会展开
                    parentItem.hasAppendChildren = false;//当没有子文件或子文件夹时，标识子节点没有被添加到页面
                }
            }
            enterBox.style.display=delBox.style.display='none';
            move(deleteSuccessTip,{opacity:100, top:0}, 600, 'linear',function(){
                    setTimeout(function(){
                        move(deleteSuccessTip,{opacity:0, top:-32}, 600, 'linear');
                    },2000);
                });
        }
        /*END 更新dom树显示*/
    }
}

/*清空最近列表的列表项*/
function fnClearRecent(){
    var d = f.getChildrenByRecent(new Date());//传入当前日期，获取数据日期在当前日期之后的列表
    createList(d, true);//true表示不生成复选框
    isClearrecentRecode = true//表示清除过最近文件列表纪录
}

/*清空回收站列表的列表项*/
function fnClearRecycle(){
    f.clearRecycle();
    var d = f.getFormRecycle();//传入当前日期，获取数据日期在当前日期之后的列表
    createList(d, true);//true表示不生成复选框
}

/*目录显示方式切换*/
var sortByWordBtn = document.getElementById('sort-by-word');
var sortByTimeBtn = document.getElementById('sort-by-time');
var sortByNormalBtn = document.getElementById('sort-by-normal');
var viewBtn = document.getElementById('view-btn');
var dropBox = document.getElementById('drop-box');
/*目录显示方式切换-按首字母排序*/
sortByWordBtn.onclick=function(){
    totalStatus = 'word';
    var oI = viewBtn.children[0];
    oI.style.backgroundPosition = '2px -1031px';//更改图标
    removeClass(sortByTimeBtn, 'on');
    removeClass(sortByNormalBtn, 'on');
    addClass(this, 'on');//增加高亮
    showListByMode(totalStatus);//按何种方式显示列表
}

/*目录显示方式切换-按时间排序*/
sortByTimeBtn.onclick=function(){
    totalStatus = 'time';
    var oI = viewBtn.children[0];
    oI.style.backgroundPosition = '2px -1064px';//更改图标
    removeClass(sortByNormalBtn, 'on');
    removeClass(sortByWordBtn, 'on');
    addClass(this, 'on');//增加高亮
    showListByMode(totalStatus);//按何种方式显示列表
}

/*目录显示方式切换-按缩略图显示*/
sortByNormalBtn.onclick=function(){
    totalStatus = 'normal';
    var oI = viewBtn.children[0];
    oI.style.backgroundPosition = '0 -1000px';//更改图标
    removeClass(sortByTimeBtn, 'on');
    removeClass(sortByWordBtn, 'on');
    addClass(this, 'on');//增加高亮
    showListByMode(totalStatus);//按何种方式显示列表
}

/*按何种方式显示列表*/
function showListByMode(totalStatus){
    switch(totalStatus){//改变顶部按钮显示，显示当前工具栏
        case 'normal':
            var newPid = getLast(oPathList).pathId;//根据上方导航获取当前的根节点
            var d = f.getChildren(newPid);
            oBoxList.innerHTML = '';
            for (var i=0; i<d.length; i++) {
                createContent(oBoxList, d[i]);//只重新更新文件夹区域页面
            }
            break;
        case 'time':
            var newPid = getLast(oPathList).pathId;//根据上方导航获取当前的根节点
            var d = f.getChildrenByTimeSort(newPid);//数据按时间正序排序
            createList(d);
            break;
        case 'word':
            var newPid = getLast(oPathList).pathId;//根据上方导航获取当前的根节点
            var d = f.getChildrenByNameSort(newPid);//数据按名称正序排序
            createList(d);
            break;
    }
}


/*给文件类型列表的复选框绑定事件*/
function fnBindLabel(oLabel){
    oLabel.onclick=function(ev){//列表复选框
        var ev = ev || event;
        ev.cancelBubble = true;
        var oAllChk = document.getElementById('content-nav-checkbox');
        var children = this.children;
        for (var i=0; i<children.length; i++) {//点击label让i标签选中
            if (children[i].nodeType == 1 && children[i].tagName.toLowerCase() == 'span') {
                children[i].checked ? children[i].style.backgroundPosition='0 -270px' : children[i].style.backgroundPosition='0 -320px';
                children[i].checked = !children[i].checked;
                children[i].checked ? addClass(this.parentNode.parentNode,'active') : removeClass(this.parentNode.parentNode,'active')
            }
        }
        oAllChk.checked = isChecked();//是否全都选中了
        oAllChk.checked ? oAllChk.style.backgroundPosition='0 -320px' : oAllChk.style.backgroundPosition='0 -270px';
    }
    oLabel.onmousedown=function(ev){//取消复选框的事件冒泡，避免冒泡到oContent
        var e=ev||event;
        ev.cancelBubble = true;
    }
    oLabel.onmouseup=function(ev){//取消复选框的事件冒泡，避免冒泡到oContent
        var e=ev||event;
        ev.cancelBubble = true;
    }
}


/*给文件夹列表区域中的li绑定事件*/
function fnBindListLi(oListLi, d){
    oListLi.onclick = function(ev) {
        var ev = ev || event;
        ev.cancelBubble = true;
        if(d.type != 'folder') return;//如果数据不是文件夹类型，就不执行
        oPathList.innerHTML = '';//清空原来的导航
        createPath(oPathList, d.id);//有或没有子文件或子文件夹，都重新生成导航
        var oLi = document.getElementById('d'+d.id);//获取div对应dom树的li
        var children = oLi.children;//被点击div对应dom树的li下的所有子节点
        fnDivActive(children);//被点击div对应dom树的li中div加选中颜色
        oLi.status = 'down';//状态为down，下次点击li时就会收缩
        fnArrow(children, 'arrow_down', 'arrow_up');//小箭头换成展开图标
        var data = f.getChildren(d.id);
        if(data.length){//如果有子文件或子文件夹
            if(oLi.hasAppendChildren){//如果当前li下已经添加过子节点了
                for (var i=0; i<children.length; i++) {//显示当前li下隐藏的子节点
                    if (children[i].nodeType == 1 && children[i].tagName == 'UL') {
                        children[i].style.display='block';
                    }
                }
                /*显示缩略图还是显示列表
                // oBoxList.innerHTML = '';
                // for (var i=0; i<data.length; i++) {
                //     createContent(oBoxList, data[i]);//只重新更新文件夹区域页面
                // }
                */
                showListByMode(totalStatus);//后加
            }else{//如果这li下还没有添加过子节点，就向dom树的li中追加新节点
                var oUl = document.createElement('ul');
                createView(data,oUl);//这句保留，还要更新上方导航和dom树
                showListByMode(totalStatus);//后加
                oLi.appendChild(oUl);
                oLi.hasAppendChildren = true;//当有子文件或子文件夹时，标识子节点已经添加到页面了
            }
        }else{//如果没有子文件或子文件夹
            oBoxList.innerHTML = emptyFilePage.innerHTML;//'暂无文件';
        }
    }
    oListLi.onmousedown=function(ev){//取消事件冒泡，避免冒泡到oContent
        var e=ev||event;
        ev.cancelBubble = true;
        return false;//取消拖动列表li时的默认事件，防止拖动列表li变蓝
    }
    oListLi.onmouseup=function(ev){//取消事件冒泡，避免冒泡到oContent
        var e=ev||event;
        ev.cancelBubble = true;
    }
}