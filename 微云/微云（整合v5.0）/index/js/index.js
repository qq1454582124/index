var totalStatus = 'normal';//设置全局变量，表示当前显示方式(按时间，按名称，按缩略图)
var  moveSuccessTip = getId('move-success-tips');
var  deleteTip = getId('delete-tips');
var  renameTip = getId('rename-tips');
var  deleteSuccessTip = getId('delete-success-tips');
var emptyFilePage = getId('empty-file-page');
var emptyNotePage = getId('empty-note-page');
var oDelSpan = getId('del_span');
var oDelSpan1 = getId('del_span1');
var oDelSpan2 = getId('del_span2');
var oBtnbuilt = getId('newbulitnote');
var oNoteBtn = getId('note-btn');
var contentNav = getId('content-nav');
var  oHeader = getId('header'),
oWrap = getId('wrap'),
oBox = getId('box'),
oToolbar = getId('toolbar'),
oContentNav = getId('content-nav'),
oContent = getId('content'),
oAllLabelChk = getId('checkbox-box'),
oAllChk = getId('content-nav-checkbox'),
oItem = getByClass(oContent,'div','item'),
oInfo = getByClass(oContent,'span','info'),
oCheckIcon = getByClass(oContent,'span','checkbox-icon'),
aShow = getId('showDom'),
domBox = getId('dom-box'),
oContentBox = getId('content-box'),
oUpload = getId('upload'),
oBtnupload = getTag(oUpload, 'a')[0],
oDropMenu = getId('drop-menu');

fnHover(oBtnupload, oDropMenu);

var viewBtn = getId('view-btn'),
dropBox = getId('drop-box'),
timer = null;

setWrap();	//设置内容区域宽高

window.onresize = function(){
    setWrap();	//设置内容区域宽高
	setScroll();	//设置滚动条
	fnScroll();
}

function setWrap(){
	oWrap.style.height = view().h - oHeader.offsetHeight + 'px';
	oBox.style.width = view().w - 160 + 'px';
	setContent();
}

function setContent(){
	oContentBox.style.width = oBox.offsetWidth - 24 - domBox.offsetWidth + 'px';//24是oMainBox的padding，184是目录树的宽度
	oContent.style.height = oBox.offsetHeight - oToolbar.offsetHeight - oContentNav.offsetHeight + 'px';
}


viewBtn.onmouseover = function(){
	clearTimeout(timer);
	addClass(viewBtn,'on');
	dropBox.style.display = 'block';
}
viewBtn.onmouseout = dropBox.onmouseout = function(){
	timer = setTimeout(function(){
		dropBox.style.display = 'none';
		removeClass(viewBtn,'on');
	},200);
}
dropBox.onmouseover = function(){
	clearTimeout(timer);
}


//显示文档树
aShow.onclick = function(){
	if(this.onOff){
		domBox.className = ''
		this.style.backgroundColor = '#FFF';
		this.children[0].style.opacity = '0.6';
	}else{
		domBox.className='on';
		this.style.backgroundColor = '#e0e4ed';
		this.children[0].style.opacity = '1';
	}
	this.onOff = !this.onOff;
	setContent();
}

//限制文件名过长撑开
function fnInfo(){
    var oInfo = getByClass(oContent,'span','info')
    for(var i=0;i<oInfo.length;i++){
        if(oInfo[i].scrollHeight>=34){//文件名称高度大于等于34时
            oInfo[i].style.height='34px';
            oItem[i].style.height='116px';
            oItem[i].style.marginBottom='4px';
        }
    }
}

//全选
function selectAll(){
    var oAllLabelChk = getId('checkbox-box');
    var oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    var oDivItem = getByClass(oContent,'div','item');
    var oLiItem = getByClass(oContent,'li','li-item');
    oAllLabelChk.onclick=function(){
        var children = this.children;
        for (var i=0; i<children.length; i++) {//点击label让i标签选中
            if (children[i].nodeType == 1 && children[i].tagName.toLowerCase() == 'i') {
                children[i].checked ? children[i].style.backgroundPosition='0 -270px' : children[i].style.backgroundPosition='0 -320px';
                children[i].checked = !children[i].checked;
                for(var j=0;j<oCheckIcon.length;j++){
                    oCheckIcon[j].checked=children[i].checked;
                    if(totalStatus == 'time' || totalStatus == 'word'){//如果传了totalStatus参数，totalStatus等于time或word，说明是列表
                        oCheckIcon[j].style.backgroundPosition = children[i].checked ? '0 -320px' : '0 -270px';
                        oItem = oLiItem;
                    }else{
                        oCheckIcon[j].style.backgroundPosition = children[i].checked ? '0 -421px' : '0 -370px';
                        oItem = oDivItem;
                    }
                    children[i].checked ? addClass(oItem[j],'active') : removeClass(oItem[j],'active');
                }
            }
        }
    }
}


//鼠标悬浮
function hover(){
    oItem = getByClass(oContent,'div','item');
    oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    for(var i=0;i<oItem.length;i++){
        oItem[i].onmouseover=function(ev){
            var ev=ev||event;
            addClass(this,'active');
            ev.cancelBubble = true;//取消事件冒泡
        }
        oItem[i].onmouseout=function(ev){
            var ev=ev||event;
            var children = this.children;
            for (var i=0; i<children.length; i++) {
                if (children[i].nodeType == 1 && children[i].tagName.toLowerCase() == 'span' && isContainClass(children[i],'checkbox-icon')) {
                    children[i].checked ? '' : removeClass(this,'active');
                }
            }
            ev.cancelBubble = true;//取消事件冒泡
        };
        oCheckIcon[i].onclick=function(ev){
            var ev=ev||event;
            this.style.backgroundPosition = this.checked ? '0 -370px' : '0 -421px';
            this.checked = !this.checked;
            oAllChk.checked = isChecked();
            oAllChk.checked ? oAllChk.style.backgroundPosition='0 -320px' : oAllChk.style.backgroundPosition='0 -270px';
            ev.cancelBubble = true;//取消事件冒泡
        }
    }
}

//是否全部都已选中
function isChecked(){
    oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    for(var i=0; i<oCheckIcon.length; i++){ 
        if( !oCheckIcon[i].checked )return false;   
    }
    return true;
}

//拖拽产生图标
function drag(){
    oItem = getByClass(oContent,'div','item');
    oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    for(var i=0;i<oItem.length;i++){
        oItem[i].onmousedown=function(ev){
            var ev=ev||event;
            ev.cancelBubble = true;//取消事件冒泡
            var targetElement = ev.target || ev.srcElement;//通过事件源阻止鼠标移动事件，保持鼠标点击事件有效
            if ( targetElement.tagName.toLowerCase() == 'span' && targetElement.className == 'checkbox-icon' ) {
                return false;
            }
            var disX=ev.clientX;
            var disY=ev.clientY;
            var that=this;
            var arr=[];
            var num=0;
            var numX=20;
            var numY=20;

            num=countCheck();//有多少复选框被选中
            //document.title=num;

            var tmpDivP = document.createElement('div');//创建拖拽小图标
            var tmpSpan = document.createElement('span');
            tmpDivP.className = 'tmp-icon';
            tmpSpan.className = 'tmp-num';
            tmpSpan.innerHTML=num;
            var tmpDiv3 = document.createElement('div');
            var tmpDiv2 = document.createElement('div');
            var tmpDiv = document.createElement('div');
            tmpDiv3.className = tmpDiv2.className = tmpDiv.className = 'tmp-icon';
            if(num==0 || num==1){//只选中一个
                tmpSpan.innerHTML='1';
                tmpDivP.appendChild(tmpSpan);
            }else if(num==2){//选中2个
                numX=numX+4*num;
                numY=numY+4*(num-1);
                tmpDiv3.appendChild(tmpSpan);
                tmpDivP.appendChild(tmpDiv3);
            }else if(num==3){//选中3个
                numX=numX+5*num;
                numY=numY+4*(num-1);
                tmpDivP.appendChild(tmpDiv3);
                tmpDiv2.appendChild(tmpSpan);
                tmpDivP.appendChild(tmpDiv2);
            }else if(num>=4){//选中4个或以上
                numX=numX+25;
                numY=numY+12;
                tmpDivP.appendChild(tmpDiv3);
                tmpDivP.appendChild(tmpDiv2)
                tmpDiv.appendChild(tmpSpan);
                tmpDivP.appendChild(tmpDiv);
            }
            if(tmpDiv){
                tmpDiv.style.left = -27 + 'px';//子级小图标定位
                tmpDiv.style.top = -9 + 'px';
            }
            if(tmpDiv2){
                tmpDiv2.style.left = -18 + 'px';//子级小图标定位
                tmpDiv2.style.top = -6 + 'px';
            }
            if(tmpDiv3){
                tmpDiv3.style.left = -9 + 'px';//子级小图标定位
                tmpDiv3.style.top = -3 + 'px';
            }
            document.body.appendChild(tmpDivP);
            //return false;
            document.onmousemove=function(ev){
                var ev=ev||event;
                var iX = Math.abs(ev.clientX-disX);
                var iY = Math.abs(ev.clientY-disY);
                if( iX < 5 && iY < 5 ){
                    return false;
                }
                tmpDivP.style.left = ev.clientX + numX + 'px';//拖拽小图标定位，父级小图标定位
                tmpDivP.style.top = ev.clientY + numY + 'px';

                addClass(that,'active');//当前拖拽元素被选中
                var children = that.children;
                for (var i=0; i<children.length; i++) {
                    if (children[i].nodeType == 1 && children[i].tagName.toLowerCase() == 'span' && isContainClass(children[i],'checkbox-icon')) {
                        children[i].checked=true;
                        children[i].style.backgroundPosition = '0 -421px';
                    }
                }
                arr=hit(that,ev);//碰撞检测
            }
            document.onmouseup=function(){
                document.onmousemove=document.onmouseup=null;
                /*是否取消选中待定
                if(arr.length==0){//如果没有碰撞上的元素
                    removeClass(that,'active');
                    oCheckIcon[that.index].checked=false;
                    oCheckIcon[that.index].style.backgroundPosition = '0 -370px';
                }
                */
                if(arr.length>0){//如果碰撞上了
                    hideItem(arr);//复选框被选中的元素消失
                }
                document.body.removeChild(tmpDivP);
            }
            return false;
        }
    } 
}
    

//拖拽碰撞检测
function hit(obj,ev){
    var x = ev.clientX;
    var y = ev.clientY;
    var result = [];
    oItem = getByClass(oContent,'div','item');
    for (var i=0; i<oItem.length; i++) {
        if (obj != oItem[i]) {
            var L2 = oItem[i].getBoundingClientRect().left;
            var T2 = oItem[i].getBoundingClientRect().top;
            var R2 = oItem[i].getBoundingClientRect().right;
            var B2 = oItem[i].getBoundingClientRect().bottom;
            var fileType = (f.getTypeById(oItem[i].id));//文件类型
            if ((!(x < L2 || y < T2 || x > R2 || y > B2))  && fileType == 'folder') {//碰上了，并且碰上的是文件夹
                addClass(oItem[i],'active-hit');//碰上了
                result.push(oItem[i]);
            }else{
                removeClass(oItem[i],'active-hit');//没碰上
            }
        }
    }
    return result;
}


//选框碰撞检测
function hitBox(obj){
    var L1 = obj.getBoundingClientRect().left;
    var T1 = obj.getBoundingClientRect().top;
    var R1 = obj.getBoundingClientRect().right;
    var B1 = obj.getBoundingClientRect().bottom;
    var result = [];
    var oItem = null;
    var oDivItem = getByClass(oContent,'div','item');
    var oLiItem = getByClass(oContent,'li','li-item');
    if(totalStatus == 'time' || totalStatus == 'word'){//如果传了totalStatus参数，totalStatus等于time或word，说明是列表
        oItem = oLiItem;
    }else{
        oItem = oDivItem;
    }
    var oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    for (var i=0; i<oItem.length; i++) {
        if (obj != oItem[i]) {
            var L2 = oItem[i].getBoundingClientRect().left;
            var T2 = oItem[i].getBoundingClientRect().top;
            var R2 = oItem[i].getBoundingClientRect().right;
            var B2 = oItem[i].getBoundingClientRect().bottom;
            if (!(R1 < L2 || B1 < T2 || L1 > R2 || T1 > B2)) {
                oCheckIcon[i].checked = true;
                addClass(oItem[i],'active');//碰上了
                result.push(oItem[i]);
            }else{
                oCheckIcon[i].checked = false;
                removeClass(oItem[i],'active');//没碰上
            }
            if(totalStatus == 'time' || totalStatus == 'word'){//如果传了totalStatus参数，totalStatus等于time或word，说明是列表
                oCheckIcon[i].style.backgroundPosition = oCheckIcon[i].checked ? '0 -320px' : '0 -270px';
            }else{
                oCheckIcon[i].style.backgroundPosition = oCheckIcon[i].checked ? '0 -421px' : '0 -370px';
            }
        }
    }
    oAllChk.checked = isChecked();
    oAllChk.checked ? oAllChk.style.backgroundPosition='0 -320px' : oAllChk.style.backgroundPosition='0 -270px';
    return result;
}


//判断有多少复选框被选中
function countCheck(){
    oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    var num=0;
    for(var i=0; i<oCheckIcon.length; i++){ 
        if(oCheckIcon[i].checked){
            num++;
        }   
    }
    return num;
}


//复选框被选中的元素消失，拖拽后产生新的子节点，改pid做数据关联，并做dom操作，更新页面展现
function hideItem(arr){
    var arrChildIds=[];//用于传给File.js删除dataList中的数据
    var pid = 0;
    oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    for(var i=0; i<oCheckIcon.length; i++){ 
        if(oCheckIcon[i].checked){
            arrChildIds.push(oItem[i].id);
            oContent.removeChild(oItem[i]);//从文件夹区域删除子节点
            pid = f.getPid(oItem[i].id);//被删除元素的父ID
        }   
    }
    f.setPid(arr[0].id, arrChildIds);//拖拽后产生新的子节点，arr[0].id是被碰撞的元素，也就是新的父级元素
    /*同时删除dom树中的这个节点*/
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
    parentItem ? createView(d, oUl) : createView(d);//重新生成页面
    parentItem.appendChild(oUl);//重新给li添加新的ul

    /*移动文件夹成功后显示提示信息*/
    move(moveSuccessTip,{opacity:100, top:0}, 600, 'linear',function(){
        setTimeout(function(){
            move(moveSuccessTip,{opacity:0, top:-32}, 600, 'linear');
        },2000);
    });
}


//鼠标拖拽选框
oContent.onmousedown=function(ev){
    var e=ev||event;
    var disX=e.clientX;
    var disY=e.clientY;
	
	var oDiv=document.createElement('div');//鼠标选框
	oDiv.className='mouse-box';
	document.body.appendChild(oDiv);
    
    document.onmousemove=function(ev){
		
        var e=ev||event;
        var x=e.clientX-disX;
        var y=e.clientY-disY;
        var iWidth=Math.abs(x);
        var iHeight=Math.abs(y);
        oDiv.style.left = x>0 ? disX+'px' : e.clientX + 'px';
        oDiv.style.top= y>0 ? disY+'px' : e.clientY + 'px';
        oDiv.style.width=iWidth+'px';
        oDiv.style.height=iHeight+'px';
        hitBox(oDiv);//鼠标选框碰撞检测
    }
	document.onmouseup=function(){
		document.onmousemove=document.onmouseup=null;
		setTimeout(function(){
			document.body.removeChild(oDiv);
		},50);
	}

	/*缩略图input*/
    var oInput= getByClass(oContent,'input','info_input');
    for(var i=0;i<oInput.length;i++){
        oInput[i].blur();//手动设置失去焦点，在这之后会立即触发onblur事件。一点击鼠标，就让所有文件夹名称的input失去焦点，解决重命名和新建文件夹时，文件夹名称的input无法失去焦点的问题
    }

    /*列表input*/
    var oLiInput= getByClass(oContent,'input','file-name-input');
    for(var i=0;i<oLiInput.length;i++){
        oLiInput[i].blur();//手动设置失去焦点，在这之后会立即触发onblur事件。一点击鼠标，就让所有文件夹名称的input失去焦点，解决重命名和新建文件夹时，文件夹名称的input无法失去焦点的问题
    }
    return false;
    
}


//上方导航点击删除
var oDelete = getId('delete');
var delBox=document.getElementById('enter_del');
oDelete.onclick=function(){
    fnDeleteByMode(totalStatus);//点击删除按钮根据不同列表删除
}


//上方导航点击新建文件夹
var oNew = getId('new');
oNew.onclick=function(){
    fnNewByMode(totalStatus);//点击新建按钮根据不同列表新建
}


//上方导航点击重命名
var oRename = getId('rename');
oRename.onclick=function(){
	fnRenameByMode(totalStatus);//点击重命名按钮根据不同列表重命名
}


/*点击删除按钮根据不同列表删除*/
function fnDeleteByMode(totalStatus){
    switch(totalStatus){
        case 'normal'://缩略图删除
            if(!countCheck()){//如果一个文件也没选
                /*如果一个文件也没选时显示的提示信息*/
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
                    var oCheckIcon = getByClass(oContent,'span','checkbox-icon');
                    for(var i=0; i<oCheckIcon.length; i++){ 
                        if(oCheckIcon[i].checked){
                            arrIds.push(oItem[i].id);
                            pid = f.getPid(oItem[i].id);//被删除元素的父ID
                        }
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
                    f.remove(arrIds);
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
            break;
        case 'time':
            fnDeleteFromList(true);//列表删除，如果删除的是文件夹列表，就更新dom树显示。isFolder是true，表示删除的是文件夹列表
            break;
        case 'word':
            fnDeleteFromList(true);//列表删除，如果删除的是文件夹列表，就更新dom树显示。isFolder是true，表示删除的是文件夹列表
            break;
    }
}


function fnRenameByMode(totalStatus){//点击重命名按钮根据不同列表重命名
	switch(totalStatus){
        case 'normal'://缩略图重命名
		    if(!countCheck()){//如果一个文件也没选
                /*如果一个文件也没选时显示的提示信息*/
                move(deleteTip,{opacity:100, top:0}, 600, 'linear',function(){
                    setTimeout(function(){
                        move(deleteTip,{opacity:0, top:-32}, 600, 'linear');
                    },2000);
                });
		        //alert("请选择文件");
		    }else if(countCheck()>1){//被选中的复选框大于一个
                move(renameTip,{opacity:100, top:0}, 600, 'linear',function(){
                    setTimeout(function(){
                        move(renameTip,{opacity:0, top:-32}, 600, 'linear');
                    },2000);
                });
		        //alert("只能选择一个文件");
		    }else{
		        var oInfo = getByClass(oContent,'span','info');
		        var oInput= getByClass(oContent,'input','info_input');
		        for(var i=0; i<oCheckIcon.length; i++){ 
		            if(oCheckIcon[i].checked){
		                var tempIndex = i;//把i值存下来，在定时器中用
		                oInput[tempIndex].value = oInfo[tempIndex].innerHTML;
		                addClass(oInfo[i], 'hide');//设置文本框编辑样式
		                addClass(oInput[i], 'active');//设置文本框编辑样式
		                //oInfo[i].contentEditable = true;//设置文本框可编辑
		                setTimeout(function(){
		                    oInput[tempIndex].select();
		                },10);
		                oInput[i].onblur = function(){
		                    removeClass(oInfo[tempIndex], 'hide');
		                    removeClass(oInput[tempIndex], 'active');
		                    if(oInput[tempIndex].value == '') return;//如果重命名为空则退出
		                    oInfo[tempIndex].innerHTML = oInput[tempIndex].value;
		                    fnInfo();//限制文件名过长撑开
		                    f.rename(oItem[tempIndex].id, oInput[tempIndex].value);//把要重命名的数据id和新的名称传给File.js的rename函数
		                    var oLi=document.getElementById('d'+oItem[tempIndex].id);
		                    if(oLi){//给对应的li中的div标签的内容改成新的名称
		                       for(var i=0;i<oLi.children.length;i++){
		                            if(oLi.children[i].nodeType==1 && oLi.children[i].tagName=='DIV'){
		                                oLi.children[i].innerHTML = oInput[tempIndex].value;
		                            }
		                        } 
		                    }
		                }
		            }
		        }
		    }
		    break;
        case 'time':
            fnRenameFromList(true);//列表重命名，如果重命名的是文件夹列表，就更新dom树显示。isFolder是true，表示重命名的是文件夹列表
            break;
        case 'word':
            fnRenameFromList(true);//列表重命名，如果重命名的是文件夹列表，就更新dom树显示。isFolder是true，表示重命名的是文件夹列表
            break;
	}
}


/*重命名文件列表的列表项*/
function fnRenameFromList(isFolder){
	if(!countCheck()){//如果一个文件也没选
        move(deleteTip,{opacity:100, top:0}, 600, 'linear',function(){
            setTimeout(function(){
                move(deleteTip,{opacity:0, top:-32}, 600, 'linear');
            },2000);
        });
       //alert("请选择文件");
    }else if(countCheck()>1){//被选中的复选框大于一个
        alert("只能选择一个文件");
    }else{
    	var oLiItem = getByClass(oContent,'li','li-item');
        var oDivName = getByClass(oContent,'div','file-name');
        var oInput= getByClass(oContent,'input','file-name-input');
        var oCheckIcon = getByClass(oContent,'span','checkbox-icon');
	    for(var i=0; i<oCheckIcon.length; i++){ 
            if(oCheckIcon[i].checked){
                var tempIndex = i;//把i值存下来，在定时器中用
                oInput[tempIndex].value = oDivName[tempIndex].innerHTML;
                addClass(oDivName[i], 'hide');//设置文本框编辑样式
                addClass(oInput[i], 'active');//设置文本框编辑样式
                //oInfo[i].contentEditable = true;//设置文本框可编辑
                setTimeout(function(){
                    oInput[tempIndex].select();
                },10);
                oInput[i].onblur = function(){
                    removeClass(oDivName[tempIndex], 'hide');
                    removeClass(oInput[tempIndex], 'active');
                    if(oInput[tempIndex].value == '') return;//如果重命名为空则退出
                    oDivName[tempIndex].innerHTML = oInput[tempIndex].value;
                    f.rename(oLiItem[tempIndex].id, oInput[tempIndex].value);//把要重命名的数据id和新的名称传给File.js的rename函数
                    var oLi=document.getElementById('d'+oLiItem[tempIndex].id);
                    if(oLi){//给对应的li中的div标签的内容改成新的名称
                       for(var i=0;i<oLi.children.length;i++){
                            if(oLi.children[i].nodeType==1 && oLi.children[i].tagName=='DIV'){
                                oLi.children[i].innerHTML = oInput[tempIndex].value;
                            }
                        } 
                    }
                }
            }
        }
    }
}


/*点击新建按钮根据不同列表新建*/
function fnNewByMode(totalStatus){
	switch(totalStatus){
        case 'normal'://缩略图新建
        	var newId = f.getMaxId()+1;//当前生成div的id比this.dataList所有id的最大值多1
		    var newPid = getLast(oPathList).pathId;//获取当前的根节点
		    var d = {
		        id : newId,
		        pid : newPid,
		        name : '',//初始文件夹名称为空
		        type : 'folder',
                time : fnGetTime(),//获取当前日期字符串
                size : '27.3k'
		    };
		    createContent(oBoxList, d, newId, newPid);//创建一个新的文件夹图标
		    var oItem = getByClass(oContent,'div','item');
		    var oInfos = getByClass(oContent,'span','info');
		    var oInputs= getByClass(oContent,'input','info_input');
		    var tempIndex = 0;
		    for(var i=0;i<oItem.length;i++){
		        if(oItem[i].id == newId){
		            tempIndex = i;//把i值存下来
		        }
		    }
		    var oInfo = oInfos[tempIndex];
		    var oInput = oInputs[tempIndex];
		    addClass(oInfo, 'hide');//设置文本框编辑样式
		    addClass(oInput, 'active');//设置文本框编辑样式
		    setTimeout(function(){
		        oInput.focus();//把这个input设置焦点
		    },10);
		    oInput.onblur = function(){//给新建的div下的input绑定onblur事件
		        removeClass(oInfo, 'hide');
		        removeClass(oInput, 'active');
		        if(oInput.value == ''){
		            var parentContent=oInput.parentNode.parentNode;//父dom节点
		            if(parentContent){
		                parentContent.removeChild(oItem[tempIndex]);
		            }
		            return;//如果新建文件夹名称为空则退出
		        }
		        parentItem=document.getElementById('d'+newPid);
		        if(parentItem){//先清空dom树中li下原来的ul
		           for(var i=0;i<parentItem.children.length;i++){
		                if(parentItem.children[i].nodeType==1 && parentItem.children[i].tagName=='UL'){
		                    parentItem.removeChild(parentItem.children[i]);
		                }
		            } 
		        }
		        var oUl = document.createElement('ul');
		        d.name = oInput.value;
		        f.save(d);//保存新建div
		        var newD = f.getChildren(newPid);
		        parentItem ? createView(newD, oUl, newId) : createView(newD, null, newId);//重新生成页面，true表示是点击“新建文件夹”按钮创建的
		        parentItem.appendChild(oUl);//重新给li添加新的ul
		        /*父级li新添加子级了之后，添加小箭头图标*/
		        if(isContainClass(getFirst(parentItem), 'folder')){//如果li的第一个子节点的类名中包含folder，folder代表是文件夹图标，则在文件夹图标前添加小箭头图标;否则就不添加小箭头图标
		            var oSpan = document.createElement('span');
		            parentItem.status = 'down';//状态为down，下次点击li时就会收缩
		            parentItem.hasAppendChildren = true;//当有子文件或子文件夹时，标识子节点已经添加到页面了
		            oSpan.className = 'arrow arrow_down';
		            oSpan.style.left = parseInt(getStyle(getFirst(parentItem), 'left')) - 13 + 'px';//getFirst(parentItem)是li中的文件夹图标，小箭头图标的位置比文件夹图标的位置，left值少13px
		            parentItem.insertBefore(oSpan, getFirst(parentItem));
		        }
		        /*END 父级li新添加子级了之后，添加小箭头图标*/
		    }
        	break;
        case 'time':
            fnNewFromList(true);//列表新建，如果新建的是文件夹列表，就更新dom树显示。isFolder是true，表示新建的是文件夹列表
            break;
        case 'word':
            fnNewFromList(true);//列表新建，如果新建的是文件夹列表，就更新dom树显示。isFolder是true，表示新建的是文件夹列表
            break;
    }
}


/*新建文件列表的列表项*/
function fnNewFromList(isFolder){
	var newId = f.getMaxId()+1;//当前生成div的id比this.dataList所有id的最大值多1
    var newPid = getLast(oPathList).pathId;//获取当前的根节点
    var d = {
        id : newId,
        pid : newPid,
        name : '',//初始文件夹名称为空
        type : 'folder',
        time : fnGetTime(),//获取当前日期字符串
        size : '27.3k'
    };
    var oUl = getByClass(oContent, 'ul', 'con-list')[0];
    createListLi(d, oUl, null, newId, newPid);//左侧侧边栏切换生成列表的li，isNotCreateCheckBox是否不生成复选框
    //createContent(oBoxList, d, newId, newPid);//创建一个新的文件夹图标
    var oLiItem = getByClass(oContent,'li','li-item');
    var oDivName = getByClass(oContent,'div','file-name');
    var oInput= getByClass(oContent,'input','file-name-input');
    var oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    var tempIndex = 0;
    for(var i=0;i<oLiItem.length;i++){
        if(oLiItem[i].id == newId){
            tempIndex = i;//把i值存下来
        }
    }
    var oDivName = oDivName[tempIndex];
    var oInput = oInput[tempIndex];
    addClass(oDivName, 'hide');//设置文本框编辑样式
    addClass(oInput, 'active');//设置文本框编辑样式
    setTimeout(function(){
        oInput.focus();//把这个input设置焦点
    },10);
    oInput.onblur = function(){//给新建的div下的input绑定onblur事件
        removeClass(oDivName, 'hide');
        removeClass(oInput, 'active');
        if(oInput.value == ''){
            var parentContent=oInput.parentNode.parentNode.parentNode;//父dom节点
            if(parentContent){
                parentContent.removeChild(oLiItem[tempIndex]);
            }
            return;//如果新建文件夹名称为空则退出
        }
        parentItem=document.getElementById('d'+newPid);
        if(parentItem){//先清空dom树中li下原来的ul
           for(var i=0;i<parentItem.children.length;i++){
                if(parentItem.children[i].nodeType==1 && parentItem.children[i].tagName=='UL'){
                    parentItem.removeChild(parentItem.children[i]);
                }
            } 
        }
        var oUl = document.createElement('ul');
        d.name = oInput.value;
        f.save(d);//保存新建div
        var newD = f.getChildren(newPid);
        parentItem ? createView(newD, oUl, newId) : createView(newD, null, newId);//重新生成页面，newId表示是点击“新建文件夹”按钮创建的
        parentItem.appendChild(oUl);//重新给li添加新的ul
        /*父级li新添加子级了之后，添加小箭头图标*/
        if(isContainClass(getFirst(parentItem), 'folder')){//如果li的第一个子节点的类名中包含folder，folder代表是文件夹图标，则在文件夹图标前添加小箭头图标;否则就不添加小箭头图标
            var oSpan = document.createElement('span');
            parentItem.status = 'down';//状态为down，下次点击li时就会收缩
            parentItem.hasAppendChildren = true;//当有子文件或子文件夹时，标识子节点已经添加到页面了
            oSpan.className = 'arrow arrow_down';
            oSpan.style.left = parseInt(getStyle(getFirst(parentItem), 'left')) - 13 + 'px';//getFirst(parentItem)是li中的文件夹图标，小箭头图标的位置比文件夹图标的位置，left值少13px
            parentItem.insertBefore(oSpan, getFirst(parentItem));
        }
    }
    /*END 父级li新添加子级了之后，添加小箭头图标*/
}


/*点击内容区域取消复选框选中*/
oContent.onclick=function(){
    var oCheckIcon = getByClass(oContent,'span','checkbox-icon');
    oAllChk.checked = false;//全选按钮不选中
    oAllChk.style.backgroundPosition = '0 -270px';//全选按钮不选中
    var oItem = null;
    var oDivItem = getByClass(oContent,'div','item');
    var oLiItem = getByClass(oContent,'li','li-item');
    if(totalStatus == 'time' || totalStatus == 'word'){//如果传了totalStatus参数，totalStatus等于time或word，说明是列表
        oItem = oLiItem;
    }else{
        oItem = oDivItem;
    }
    for(var i=0;i<oCheckIcon.length;i++){
        oCheckIcon[i].checked = false;
        removeClass(oItem[i],'active');//没碰上
        if(totalStatus == 'time' || totalStatus == 'word'){//如果传了totalStatus参数，totalStatus等于time或word，说明是列表
            oCheckIcon[i].style.backgroundPosition = '0 -270px';
        }else{//缩略图
            oCheckIcon[i].style.backgroundPosition = '0 -370px';
        }
    }
}



//上方导航点击分享
var oShare=getId('share'),
oShareBox=getId('share_box'),
oShareSpan=getId('share_spanhead'),
oShareLi1=getId('share_li1'),
oShareLi2=getId('share_li2'),
oShareA1=getId('share_a1')
oShareA2=getId('share_a2')
oChangeBox=getId('change_box'),
oChangeBox2=getId('change_box2');
oShare.onclick=function(){
    if(!countCheck()){//如果一个文件也没选
        move(deleteTip,{opacity:100, top:0}, 600, 'linear',function(){
            setTimeout(function(){
                move(deleteTip,{opacity:0, top:-32}, 600, 'linear');
            },2000);
        });
       //alert("请选择文件"); 
    }else{
        enterBox.style.display=oShareBox.style.display='block';
    };   

    oShareSpan.onclick=function(){         
        enterBox.style.display=oShareBox.style.display='none';
    }
    
    oShareLi1.onclick=function(){
        oShareA1.className='share_active';
        oShareA2.className='';
        oChangeBox.style.display='block';
        oChangeBox2.style.display='none';   
    }
    
    oShareLi2.onclick=function(){
        oShareA1.className='';
        oShareA2.className='share_active';
        oChangeBox.style.display='none';
        oChangeBox2.style.display='block';  
    }
}