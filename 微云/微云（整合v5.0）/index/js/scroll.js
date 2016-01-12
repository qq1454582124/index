var scrollBox = getId('scrollBox'),
scrollCont = getId('scrollCont'),
oScroll = getId('scroll'),
oBar = getId('scrollBar'),
minTop = 0,
maxTop = 0,
iT = 0,
iTime = null;

setScroll();
fnScroll();

document.body.onmousewheel = function(){
	return false;
}

oBar.onmousedown = function(ev){
	var e = ev || event,
	disY = e.clientY - this.offsetTop;
	document.onmousemove = function(ev){
		var e = ev || event,
		scale = 0;
		
		iT = e.clientY - disY;
		fnScroll();
	}
	document.onmouseup = function(){
		document.onmouseup = document.onmousemove = null;
	}
	return false;
}

if(scrollBox.addEventListener){
	scrollBox.addEventListener('DOMMouseScroll',mouseScroll);
	scrollBox.addEventListener('DOMMouseScroll',mouseScroll);
}

scrollBox.onmouseover = function(){
	clearTimeout(iTime);
	scrollBox.onmousewheel = oScroll.onmousewheel = mouseScroll;
	if(view().h - oWrap.offsetHeight - oUpload.offsetHeight < 590) oScroll.style.zIndex = 1;
	setScroll();
	fnScroll();
}
scrollBox.onmouseout = function(){
	iTime = setTimeout(function(){
		oScroll.style.zIndex = -1;	
	},200);
	scrollBox.onmousewheel = oScroll.onmousewheel = null;
}

oBar.onmouseover = function(){
	this.className = 'bar-hover';
}
oBar.onmouseout = function(){
	this.className = '';
}

function setScroll(){
	var minHeight = oWrap.offsetHeight - oUpload.offsetHeight;

	//alert(minHeight / scrollBox.offsetHeight * minHeight)

	if(minHeight > 590){
		scrollBox.style.height = minHeight + 'px';
		oScroll.style.zIndex = -1;
		scrollBox.onmousewheel = oScroll.onmousewheel = null;
	}else{
		scrollBox.style.height = '590px';
		oScroll.style.height = minHeight +'px';
	}
	oBar.style.height = minHeight / scrollBox.offsetHeight * minHeight + 'px';
	maxTop = oScroll.clientHeight - oBar.offsetHeight;
	minTop = minHeight - scrollBox.offsetHeight;
}

function fnScroll(){
	if( iT <= 0 ) iT = 0;
	if( iT >= maxTop ) iT = maxTop;
	//alert(maxTop);
	scale = iT / maxTop;
	scrollCont.style.top = minTop * scale + 'px';
	oBar.style.top = iT + 'px';
}

function mouseScroll(ev){
	var e = ev || event,
	b = true;
	
	if( e.detail ){
		b = e.detail < 0 ? false : true;
	}else{
		b = e.wheelDelta < 0 ? true : false;
	}
	b ? iT += 10 : iT -= 10;
	fnScroll();
	
	if(e.preventDefault) e.preventDefault();
	// e.cancleBubble = true;
}