// JavaScript Document
window.onload=function(){
	
	var oDiv=document.getElementById('focus');
	var oUl=document.getElementById('focusBtn');
	var aLi=oUl.getElementsByTagName('li');
	var arr=getByClass(oDiv,'div','con_img')
	var num=0;
	var timer=0;
		
		for(var i=0;i<aLi.length;i++){
			
			aLi[i].index=i;
			aLi[i].onclick=function(){
				clear();
				num=this.index;
				auto();
			}
			
			arr[i].onmouseover=function(){
				
				clearInterval(timer);	
			}
			
			arr[i].onmouseout=timeAuto;
		
		}
		
	timeAuto();
	
	function timeAuto(){
		timer=setInterval(function(){
			 
				clear();
				auto();
				num++;
				num%=aLi.length;
			},2500);
	}
	
	function clear(){
		
		for(var i=0;i<aLi.length;i++){
				
				aLi[i].className='';
				arr[i].className='con_img';	
		}
		
	}
	
	function auto(){
		
		aLi[num].className='active';
		arr[num].className='banner';	
	}
	
	function getByClass(context, tagname, classname) {

		var aElements = context.getElementsByTagName(tagname);

		var result = [];

		for (var i=0; i<aElements.length; i++) {
			var sClassname = aElements[i].className;
			var aClassname = sClassname.split(' ');
			for (var j=0; j<aClassname.length; j++) {
				if (aClassname[j] == classname) {
					result.push(aElements[i]);
					break;
				}
			}
		}

            return result;

    }	
	
	
	
}