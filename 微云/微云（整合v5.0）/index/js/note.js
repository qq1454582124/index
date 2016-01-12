var n = new NoteFile(noteData);//新建笔记对象

/*点击笔记*/
oBtnbuilt.onclick=oNoteBtn.onclick=function(){
    var oUl = document.getElementById('sideMenu');
    var oLi = oUl.getElementsByTagName('li');
    for(var j=0;j<oLi.length;j++){
        removeClass(oLi[j], 'cur');
    }
    addClass(oNoteBtn, 'cur');
    contentNav.style.display = 'none';//让上方导航消失
    /*隐藏文档树*/
    var domBox = getId('dom-box');
    aShow.style.backgroundColor = '#FFF';
    aShow.children[0].style.opacity = '0.6';
    aShow.onOff = false;
    domBox.className = '';
    setContent();
    /*END 隐藏文档树*/
    /*改变顶部按钮显示，显示当前工具栏*/
    var toolBar = getId('toolbar');
    var tBtnNote = getId('tBtn-note');
    for(var i=0;i<toolBar.children.length;i++){
        toolBar.children[i].style.display = 'none';
    }
    // tBtnNote.style.display = 'block';
    /*END 改变顶部按钮显示，显示当前工具栏*/
    var oFull=document.getElementById('fullBox');
    oBoxList.innerHTML = oFull.innerHTML;//显示编辑笔记页面
    var rNote = getByClass(oBoxList, 'div', 'r-note')[0];
    var memory = getByClass(oBoxList, 'div', 'memory')[0];
    rNote.style.width = oContent.offsetWidth - 4 - memory.offsetWidth + 'px';//动态计算编辑笔记文档框的宽度
    fnNoteList();//显示笔记列表
    fnCancelBubbleEditNote();//取消笔记工具栏和编辑笔记区域的事件冒泡
    fnNote();//笔记功能

    /*刷新笔记*/
    // var tBtnRefreshNote = getId('tBtn-refreshNote');
    // tBtnRefreshNote.onclick = function(){
    // 	var oDiv = getByClass(oBoxList, 'div', 'note-word')[0];//编辑笔记区域
    // 	oDiv.innerHTML = '';
    // }
    /*END 刷新笔记*/

    var saveNoteBtn = getByClass(oBoxList, 'div', 'savebtn')[0];//笔记保存按钮
    /*保存笔记*/
	saveNoteBtn.onclick = function(){
		var oDiv = getByClass(oBoxList, 'div', 'note-word')[0];//编辑笔记区域
		var newId = n.getMaxId()+1;//当前生成div的id比this.dataList所有id的最大值多1
		var str = oDiv.innerHTML;
		var d = {
	        id : newId,
	        name : str.substring(0,10),//笔记名称取笔记内容的前十位
	        content : str,//笔记内容
	        time : fnGetTime(),//获取当前日期字符串
		};
		n.save(d);//保存新建div
		fnNoteList();//显示笔记列表
	}
	/*END 保存笔记*/
}


/*取消笔记工具栏和编辑笔记区域的事件冒泡*/
function fnCancelBubbleEditNote(){
    var note = getByClass(oBoxList, 'div', 'r-note')[0];
    note.onclick = function(ev) {//点击文件名称
        var ev = ev || event;
        ev.cancelBubble = true;//取消事件冒泡
    }
    note.onmousedown = function(ev) {//按下文件名称
        var ev = ev || event;
        ev.cancelBubble = true;//取消事件冒泡
    }
}

/*显示笔记列表*/
function fnNoteList(){
	var memoryDl = getByClass(oBoxList, 'dl', 'memory-dl')[0];
	memoryDl.innerHTML = '';
    var d = n.getNoteList();
    for (var i=0; i<d.length; i++) {
	    var newDd = document.createElement('dd');
	    var newDiv = document.createElement('div');
	    var newPName = document.createElement('p');
	    var newBr = document.createElement('br');
	    var newPTime = document.createElement('p');
	    newPName.innerHTML = d[i].name;
	    newPTime.innerHTML = d[i].time;
	    newDiv.appendChild(newPName);
	    newDiv.appendChild(newBr);
	    newDiv.appendChild(newPTime);
	    newDd.appendChild(newDiv);
	    memoryDl.appendChild(newDd);
	}
}


/*笔记功能*/
function fnNote(){
	var oDiv = getByClass(oBoxList, 'div', 'note-word')[0];//编辑笔记区域
	/*修改类名*/
	var aEda= getByClass(document, 'li', 'bold')[0];
	var aEdb= getByClass(document, 'li', 'italic')[0];
	var aEdc= getByClass(document, 'li', 'underline')[0];
	var aEdd= getByClass(document, 'li', 'family')[0];
	var aEde= getByClass(document, 'li', 'fnsize')[0];
	var aEdf= getByClass(document, 'li', 'fncolor')[0];
	var aEdg= getByClass(document, 'li', 'outorder')[0];
	var aEdh= getByClass(document, 'li', 'order')[0];
	var aEdi= getByClass(document, 'li', 'align')[0];
	var aEdj= getByClass(document, 'li', 'increase-texti')[0];
	var aEdk= getByClass(document, 'li', 'decrease-texti')[0];
	var aEdl= getByClass(document, 'li', 'checkbox')[0];
	var aEdm= getByClass(document, 'li', 'uploadf')[0];
	var timer = null;//定时器

	/*字体*/
	var arrFont=['song','microsoft','black','kai','you','arial','arial-black','comic','tahoma'];

	/*字体大小*/
	var arrSize=['x-small','small','medium','large','x-large','xx-large'];

	/*颜色盘*/
	var arrColor = ['00','80','d0','ff'];

	/*a*/
	aEda.onclick=function(){
		if( hasClass( oDiv,'a')){
			removeClass( oDiv, 'a');
		}else{
			addClass( oDiv,'a');
		}
   	}
	/*b*/
	aEdb.onclick=function(){
		if( hasClass( oDiv,'b')){
			removeClass( oDiv, 'b');
		}else{
			addClass( oDiv,'b');
		}
	}
	/*c*/
	aEdc.onclick=function(){
		if( hasClass( oDiv,'c')){
			removeClass( oDiv, 'c');
		}else{
			addClass( oDiv,'c');
		}
	}
	/*d字体样式*/
	var fontList=getByClass(oBoxList, 'div', 'fontlist')[0];
	var oStlyL=getByClass(oBoxList, 'ul', 'fontStyles')[0];
	var aLil=oStlyL.getElementsByTagName('li');
	aEdd.onclick=function(){
		fontList.style.left = getPos( this ).l + 'px';
		fontList.style.top = getPos( this ).t + this.offsetHeight +9+ 'px';
		fontList.style.display='block';
    }
    for(var i=0;i<aLil.length;i++){
	    aLil[i].onclick=function(){
	    	for(var j=0;j<aLil.length;j++){
	    		removeClass( aLil[j], 'active');
	    	}
	    	addClass( this, 'active' );
	    	for(var k=0;k<arrFont.length;k++){
	    		removeClass( oDiv, arrFont[k] );
	    	}
	    	addClass( oDiv,this.getAttribute('type') );
			fontList.style.display='none';  
		}
	}
	/*延迟消失*/
	fontList.onmouseout=aEdd.onmouseout=function(){
		timer = setTimeout(function() {
			fontList.style.display = 'none';
		}, 200);
	}
	fontList.onmouseover = function () {
		clearTimeout(timer);
		fontList.style.display = 'block';
	};

	/*e 字体大小*/
	var fontslist=getByClass(oBoxList, 'div', 'fontslist')[0];
	var oSizeL=getByClass(oBoxList, 'ul', 'fontSize')[0];
	var aSizeLil=oSizeL.getElementsByTagName('li');
	aEde.onclick=function(){
		fontslist.style.left = getPos( this ).l + 'px';
		fontslist.style.top = getPos( this ).t + this.offsetHeight +9+ 'px';
		fontslist.style.display='block';
	}
	for(var i=0;i<aSizeLil.length;i++){
	    aSizeLil[i].onclick=function(){
	    	for(var j=0;j<aSizeLil.length;j++){
	    		removeClass( aSizeLil[j], 'active');
	    	}
	    	addClass( this, 'active' );
	    	for(var k=0;k<arrFont.length;k++){
	    		removeClass( oDiv, arrSize[k] );
	    	}
	    	addClass( oDiv,this.getAttribute('type') );
			fontslist.style.display='none';  
		}
	}
	/*延迟消失*/
	fontslist.onmouseout=aEde.onmouseout=function(){
		timer = setTimeout(function() {
			fontslist.style.display = 'none';
		}, 200);
	}
	fontslist.onmouseover = function () {
		clearTimeout(timer);
		fontslist.style.display = 'block';
	};
	/*f 字体颜色*/
	var fontColor=getByClass(oBoxList, 'div', 'fontColor')[0];
	aEdf.onclick=function(){	
		fontColor.style.display='block';
		fontColor.style.left = getPos( this ).l - fontColor.offsetWidth/2 + 20 + 'px';
		fontColor.style.top = getPos( this ).t + this.offsetHeight +9+ 'px';
		/*生成颜色盘*/
		var frag = document.createElement('div');
		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				for(var k=0; k<4; k++){
					var oNewDiv = document.createElement('div');
					oNewDiv.className='color-div left';
					oNewDiv.style.background = '#'+arrColor[k]+arrColor[j]+arrColor[i];
					frag.appendChild(oNewDiv);
				}
			}
		}
		if(fontColor.children.length == 0){
			fontColor.appendChild(frag);
		}
		var oColorDiv = getByClass(fontColor,'div','color-div');
		for(var i=0;i<oColorDiv.length;i++){
		    oColorDiv[i].onclick=function(){
		    	oDiv.style.color = this.style.backgroundColor;
		    	fontColor.style.display = 'none';
		    }
		}
		/*延迟消失*/
		fontColor.onmouseout=aEdf.onmouseout=function(){
			timer = setTimeout(function() {
				fontList.style.display = 'none';
			}, 200);
		}
		fontColor.onmouseover = function () {
			clearTimeout(timer);
			fontColor.style.display = 'block';
		};
	}
	/*g无序*/
	aEdg.onclick=function(){
		var oUlg = document.createElement('ul');
		var str = '';
		if(!this.onOff){
			var oLis = oDiv.getElementsByTagName('li');
			if(oLis.length == 0){
				str = oDiv.innerHTML;
			}else{
				for(var i=0;i<oLis.length;i++){
					str+=oLis[i].innerHTML;
				}
			}
			oDiv.innerHTML = '';
			oUlg.innerHTML = '<li style="list-style:disc;">'+str+'</li>';
			oUlg.style.paddingLeft = '10px';
			oUlg.style.marginLeft = '10px';
		}else{
			var oLis = oDiv.getElementsByTagName('li');
			var oUlg = oDiv.getElementsByTagName('ul')[0];
			for(var i=0;i<oLis.length;i++){
				oLis[i].style.listStyle='none';
			}
			if(oUlg){
				oUlg.style.paddingLeft = '0';
				oUlg.style.marginLeft = '0';
			}
		}
		if(oDiv.children.length == 0){
			oDiv.appendChild(oUlg);
		}
		this.onOff = !this.onOff;
	}
	/*h有序*/
	aEdh.onclick=function(){
		var oOlh = document.createElement('ol');
		var str = '';
		if(!this.onOff){
			var oLis = oDiv.getElementsByTagName('li');
			if(oLis.length == 0){
				str = oDiv.innerHTML;
			}else{
				for(var i=0;i<oLis.length;i++){
					str+=oLis[i].innerHTML;
				}
			}
			oDiv.innerHTML = '';
			oOlh.innerHTML = '<li style="list-style:decimal;">'+str+'</li>';
			oOlh.style.paddingLeft = '10px';
			oOlh.style.marginLeft = '10px';
		}else{
			var oLis = oDiv.getElementsByTagName('li');
			var oOlh = oDiv.getElementsByTagName('ol')[0];
			for(var i=0;i<oLis.length;i++){
				oLis[i].style.listStyle='none';
			}
			if(oOlh){
				oOlh.style.paddingLeft = '0';
				oOlh.style.marginLeft = '0';
			}
		}
		if(oDiv.children.length == 0){
			oDiv.appendChild(oOlh);
		}
		this.onOff = !this.onOff;
	}
	/*i 对齐*/
	/*aEdi.onclick=function(){
		if( hasClass( oDiv,'e')){
			removeClass( oDiv, 'e');
		}else{
			addClass( oDiv,'e');
		}
	}*/

	/*j*/
	aEdj.onclick=function(){
		if( hasClass( oDiv,'j')){
			removeClass( oDiv, 'j');
		}else{
			addClass( oDiv,'j');
		}
	}
	/*k*/
	aEdk.onclick=function(){
		if( hasClass( oDiv,'k')){
			removeClass( oDiv, 'k');
		}else{
			addClass( oDiv,'k');
		}
	}

	/*l*/
	/*aEdl.onclick=function(){
		oDiv.innerHTML+='<div style="width:14px;height:14px;background:url(img/ico.png) no-repeat 0 -270px;float:left;margin-right:3px;">';
	}*/

	/*m*/
	/*aEdm.onclick=function(){
		oDiv.innerHTML+='<input type="file" method="post" enctype="multipart/form-data"/>';
	}*/
}



// /*浮动提示层*/
// var oUllist=document.getElementById('right-n');
// var aLis=oUllist.getElementsByTagName('li');
// var oMini=document.getElementById('hovermini');
// var timer=null;

// for(var i=0;i<aLis.length;i++){
// 	aLis[i].onmouseover=function(){
// 		oMini.innerHTML=this.getAttribute('n');
// 		oMini.style.left = getPos( this ).l + 'px';
// 		oMini.style.top = getPos( this ).t + this.offsetHeight + 5 + 'px';
// 		timer=setTimeout(function(){
// 				oMini.style.display='block';
// 		},300);
// 	}
// 	aLis[i].onmouseout=function(){
// 		clearTimeout( timer );
// 		oMini.style.display='none';
// 	}
// }

/*刷新*/
// var oFresh=document.getElementById('refreshnote');
// oFresh.onclick=function(){
// 	oDiv.innerHTML='';
// }

// function getPos( obj ){
// 	var aPos = {l: 0, t: 0};
// 	while( obj ){
// 		aPos.l += obj.offsetLeft;
// 		aPos.t += obj.offsetTop;
// 		obj = obj.offsetParent;
// 	}
// 	return aPos;
// }