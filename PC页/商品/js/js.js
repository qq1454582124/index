// JavaScript Document
function show2(){
	var oDiv_a=document.getElementById('nav_list');
	var aLi_a=oDiv_a.getElementsByTagName('li');
	for(var i=0;i<aLi_a.length;i++){
		aLi_a[i].onclick=function (){
			for(var i=0;i<aLi_a.length;i++){
				aLi_a[i].className='nav_two';
				}
			this.className='nav_one';
			}
		}
	}





















