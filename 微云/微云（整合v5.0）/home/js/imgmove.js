// JavaScript Document
window.onload=function(){
var oBtn=document.getElementById('btn');
var aIcon=oBtn.getElementsByTagName('a');
var aLeft1=getByClass(document,'div','M1-left');
var aImgs=getByClass(document,'div','images');
var aRight2=getByClass(document,'div','M2-right');
/*aImgs为图片从下进入，aLeft1为左进入，aRight2为右进入*/
var that=null;
var start=null;
var timer=0;

window.onscroll = window.onresize = function(){
	wordCome();
	loadImage();
	}
function loadImage() {
	for (var i=0; i<aImgs.length; i++) {
		var j = aImgs[i].getBoundingClientRect();
		if (  j.top < document.documentElement.clientHeight ) {
				upside(aImgs[i],'top');		
		}
	}
}

function wordCome(){
 for (var i=0; i<aLeft1.length; i++) {
		var l = aLeft1[i].getBoundingClientRect();
		var r=aRight2[i].getBoundingClientRect();
		if (  l.top < document.documentElement.clientHeight ) {
			setTimeout(
				upside(aLeft1[i],'left'),300);	
		}
		if (  r.top < document.documentElement.clientHeight ) {
			setTimeout(
				upside(aRight2[i],'left'),300);
		}
	}
}
function upside(obj,attr){
			obj.style[attr]=0+'px';
			obj.style.transition=0.5+'s';
			
}    



for(var i=0;i<aIcon.length;i++){
		start=getStyle(aIcon[0],'top');
		aIcon[i].onmouseover=function(){
		    up(this,'top');	
		}	
		
		aIcon[i].onmouseout=function(){
			clearInterval(timer);
			down(this,'top');
			this.up=false;
		}
		
		
}

function up(obj,attr){
	if(obj.up)return;
	obj.up=true;
	timer=setInterval(function(){
			obj.style[attr]=start-10+'px';
			obj.style.transition=0.5+'s';
	},50);
	
}

function down(obj,attr){
			obj.style[attr]=start+'px';
}

function getStyle(obj, attr) {
	return obj.currentStyle? parseInt(obj.currentStyle[attr]) : parseInt(getComputedStyle(obj)[attr]);
}

function getByClass(context, tagname, classname) {
    var aElements = context.getElementsByTagName(tagname);
    var result = [];
    var s = '(^|\\s)'+ classname +'(\\s|$)';
    var re = new RegExp(s);

    for (var i=0; i<aElements.length; i++) {
        if (re.test(aElements[i].className)) {
            result.push(aElements[i]);
        }
    }
    return result;
}
};