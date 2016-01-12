var enterBox=getId('enter_box'),
btnClose=getId('enter_span'),
enterMiddle=getByClass(document,'*','enter_middle')[0],
enterHead=getByClass(document,'*','enter_head')[0],
enterP=getByClass(enterHead,'p','enter_p')[0],
scrollP=getByClass(scrollCont,'p','mobile')[0],
scrollA=getTag(scrollP,'a');

scrollA[0].onclick=function(){
	var enterCon2=document.getElementById('enterCon2');
	enterP.innerHTML='微云Android版';
	popbox(enterCon2.innerHTML);	
}
scrollA[1].onclick=function(){
	var enterCon1=document.getElementById('enterCon1');
	enterP.innerHTML='微云iPhone版';
	popbox(enterCon1.innerHTML);
		
}

scrollA[2].onclick=function(){
	var enterCon3=document.getElementById('enterCon3');
	enterP.innerHTML='微云iPad版';
	popbox(enterCon3.innerHTML);	
}

oIos.onclick=oTios.onclick=function(){
	var enterCon1=document.getElementById('enterCon1');
	enterP.innerHTML='微云iPhone版';
	popbox(enterCon1.innerHTML);
}
oAndroid.onclick=oTandroid.onclick=function(){
	var enterCon2=document.getElementById('enterCon2');
	enterP.innerHTML='微云Android版';
	popbox(enterCon2.innerHTML);
		
}

outMove(enterHead,enterMiddle);

//点击弹出遮罩层
function popbox(content){
	
	var enter_middle = document.getElementById('enter_middle');
	var enter_con = getByClass(enter_middle, 'div', 'enter_con')[0];
	
	enter_middle.style.display = enterBox.style.display = 'block';
	enter_middle.style.left=enter_middle.style.top='50%';
	enter_middle.style.marginTop='-183px';
	enter_middle.style.marginLeft='-294px';
	enter_con.innerHTML = content;
	
	btnClose.onclick=function(){
		enter_middle.style.display = enterBox.style.display = 'none';
	}
}

//拖拽函数
function outMove(obj1,obj2){
	obj1.onmousedown=function( ev ){

		var ev=ev||event;
		var disX = ev.clientX - obj2.offsetLeft;
		var disY = ev.clientY - obj2.offsetTop;
		var targetElement = ev.target || ev.srcElement;
		if(targetElement.tagName.toLowerCase()=='span')return false;
		document.onmousemove=function( ev ){
			var ev=ev||event;	
			var l=ev.clientX-disX;
			var t=ev.clientY-disY;
			if(l<0)l=0;
			if(l>=view().w-obj2.offsetWidth)l=view().w-obj2.offsetWidth;
			if(t<0)t=0;
			if(t>=view().h-obj2.offsetHeight)t=view().h-obj2.offsetHeight;
			obj2.style.margin=0;
			obj2.style.left=l+'px';
			obj2.style.top=t+'px';
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
		}
		return false;
	}
}

function view(){
	return {
		w : document.documentElement.clientWidth,
		h : document.documentElement.clientHeight
	};
}