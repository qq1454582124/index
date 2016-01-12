// JavaScript Document
function $Id(Id){//获取Id
	return document.getElementById(Id);//获取到的Id返回出去
}
function $Tag(oParent,Tag){//获取父级，标签名，
	return oParent.getElementsByTagName(Tag);
}

//获取行间样式
 function getstyle(obj, attr) {
            return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
 }
 //获取class
 function getByClass(parentObj, tagname, classname) {//从父级的下面获取元素    元素的标签名    class名            //获取指定范围内的所有指定元素
            var eles = parentObj.getElementsByTagName(tagname);
            //一个用来保存结果的数组
            var result = [];
            //循环遍历选中的元素eles
            for (var i=0; i<eles.length; i++) {
                //把当前循环过程中某个元素的class取出来，并分割成数组（元素可能会有多个class）
                var classes = eles[i].className.split(' ');
                //判断当前这个元素的class中是否有我们要找的class
                if (inArray(classes, classname)) {
                    //如果当前元素中有我们要找的class，则把当前元素保存到结果数组中
                    result.push(eles[i]);
                }

            }

            //返回结果数组
            return result;
}
function inArray(arr, v) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i] == v) {
            return true;
        }
    }
    return false;
}
////////////////////

// function getByClass(obj, tagname, classname) {
//             var elements = obj.getElementsByTagName(tagname);
//             var result = [];

//             var re = new RegExp('(^|\\s)'+classname+'(\\s|$)');

//             for (var i=0; i<elements.length; i++) {
//                 if (re.test(elements[i].className)) {
//                     result.push(elements[i]);
//                 }
//             }

//             return result;
// }


//shakeObj（要晃动的元素，晃动的中心的X轴，晃动的中心的Y轴）
function shakeObj(obj,x,y)
{
	obj.style.transformOrigin = x+" "+y;
	var arr = [];
	var num = 0;
	var iTimer = 0;
	var onOff = true;
	for(var i = 10;i>=0;i--)
	{
		arr.push(i,-i);
	}
	
	obj.onmouseover = function()
	{
		if(onOff)
		{
			 
//			obj.className = "show";
			onOff = !onOff;
			clearInterval(iTimer)
			iTimer = setInterval(function()
			{
				obj.style.transform = "rotate("+arr[num]+"deg)";
				num++;
				if(num>arr.length)
				{
					clearInterval(iTimer);
					num = 0;
					onOff = !onOff;
				}
			},20)
		}
	}
}	

//运动封装
 function startMove(obj, json, duration, fx, callback) {
                clearInterval(obj.iTimer);
                var j = {};
                /*
                * j = {
                *     width : {
                *       b : 100,
                *       c : 100
                *     },
                *     height : {
                *       b : 150,
                *       c : 150
                *     }
                * }
                * */
                var b;

                for (var attr in json) {
                    j[attr] = {};
                    if (attr == 'opacity') {
                        j[attr].b = Math.round( css(obj, attr) * 100 );
                    } else {
                        j[attr].b = parseInt(css(obj, attr));
                    }
                    j[attr].c = json[attr] - j[attr].b;
                }
                //console.log(j);
                //return;

                var d = duration || 1000;
                var fx = fx || 'linear';
                var t2 = +new Date();
                obj.iTimer = setInterval(function() {
                    var t = +new Date() - t2;
                    if (t > d) {
                        t = d;
                    }

                    for (var attr in json) {
                        var value = Tween[fx](t, j[attr].b, j[attr].c, d);
                        if (attr == 'opacity') {
                            obj.style.opacity = value / 100;
                            obj.style.filter = 'alpha(opacity='+value+')';
                        } else {
                            obj.style[attr] = value + 'px';
                        }
                    }

                    if (t == d) {
                        clearInterval(obj.iTimer);
                        callback && callback.call(obj);
                    }


                }, 16);
            }

            function css(obj, attr) {
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
            }



//弹窗 
/**/

//主题设置
var oMainMenuIcon=$Id('mainMenuIcon');
var oWeb_box_content=$Id('web_box_content');
var oSkin_img=$Id('skin_img');
var oImg=$Tag(oWeb_box_content,'img');
var oDisB=$Id('disB');
var oPageBg=$Id('pageBg');
var arr=['img/page_bg/bg3.jpg','img/page_bg/bg4.jpg','img/page_bg/bg6.jpg','img/page_bg/blue.jpg','img/page_bg/blue_glow.jpg','img/page_bg/pinky_night.jpg']

oMainMenuIcon.onclick=function(){
	oWeb_box_content.style.display="block";
	startMove(oWeb_box_content, {'left':300}, 200, "bounceBoth")
	for (var i=0;i<oImg.length;i++) {
		oImg[i].index=i;
		oImg[i].onclick=function(){
			oPageBg.src=arr[this.index];
			startMove(oWeb_box_content, {'left':2000}, 200, "bounceBoth",function(){
				startMove(oWeb_box_content, {'bottom':-800}, 200, "bounceBoth",function(){
					startMove(oWeb_box_content, {'left':-800}, 200, "bounceBoth",function(){
						startMove(oWeb_box_content, {'bottom':100}, 200, "bounceBoth")
					})
				})
			})
		}
	}
}
oDisB.onclick=function(){
	//startMove(oWeb_box_content, {'left':2000}, 200, "linear")
	startMove(oWeb_box_content, {'left':2000}, 200, "bounceBoth",function(){
				startMove(oWeb_box_content, {'bottom':-800}, 200, "bounceBoth",function(){
					startMove(oWeb_box_content, {'left':-800}, 200, "bounceBoth",function(){
						startMove(oWeb_box_content, {'bottom':100}, 200, "bounceBoth")
					})
				})
			})
}

//桌面主体
var oMainNav=$Id('mainNav');
var aLi=$Tag(oMainNav,'li');
var oDesktopWrapper=$Id('desktopWrapper');
var oDesktopContents=$Id('desktopContents');
var aDesktopContent=getByClass(oDesktopContents, 'li', 'desktopContent')
startMove(aDesktopContent[0], {left:800},1000,"elasticOut",function(){
	startMove(aDesktopContent[0], {top:180},500,"elasticOut",function(){
			startMove(aDesktopContent[0], {top:0,left:0},1000,"elasticOut")
	})
})
//console.log(aDesktopContent.length)
var aAppPic=getByClass(oDesktopContents, 'div', 'appPic')
var oWindow=$Id('window');
var aA=$Tag(oWindow,'a');
var oList=$Id('list');
var v = 0;

	for (var i=0;i<aLi.length;i++) {
			aLi[i].index=i;
			aLi[i].onclick=function(){
			for (var i=0;i<aLi.length;i++) {
				aLi[i].className="";
				//aDesktopContent[i].style.left=1293+"px";
				startMove(aDesktopContent[i], {left:1293}, 300, "elasticOut")
			}
			this.className="active";
			//aDesktopContent[this.index].style.left=0;
			startMove(aDesktopContent[this.index], {left:0},3000,"elasticOut")
			
			
			//aDesktopContent[this.index].children[0].children[0].className="show";
		}
	}

//滚轮滚动
	document.onmousewheel = fn;
	oWindow.addEventListener('DOMMouseScroll', fn, false);
	if (oWindow.addEventListener) {
	    oWindow.addEventListener('DOMMouseScroll', fn, false);
	}
			function fn(ev) {
                var e = ev || event;
                //var v=0 v在这里因为是有作用域问题  所以v一直加加出来这里还是把他给至零了，在加还是一;
                //console.log(e.wheelDelta);
                //console.log(e.detail);
                var detail;

                if (e.wheelDelta) {
                    detail = e.wheelDelta > 0 ? true : false;
                } else {
                    detail = e.detail < 0 ? true : false;
                }
                console.log(detail);

                if (detail) {
                	v++
                	v=v%aLi.length;
                    for (var i=0;i<aLi.length;i++) {
						aLi[i].className="";
						//aDesktopContent[i].style.left=1293+"px";
						startMove(aDesktopContent[i], {left:1293}, 300, "linear")
					}
					aLi[v].className="active";
					//aDesktopContent[this.index].style.left=0;
					startMove(aDesktopContent[v], {left:0}, 500, "elasticOut")
					aDesktopContent[v].children[0].children[0].className="show";
                } else {
                	for (var i=0;i<aLi.length;i++) {
						aLi[i].className="";
						//aDesktopContent[i].style.left=1293+"px";
						startMove(aDesktopContent[i], {left:1293}, 300, "linear")
					}
					aLi[v].className="active";
					//aDesktopContent[this.index].style.left=0;
					startMove(aDesktopContent[v], {left:0}, 500, "elasticOut")
					aDesktopContent[v].children[0].children[0].className="show";
					v--
                	v=(v+aLi.length)%aLi.length;
                }

                if (e.preventDefault) {
                    e.preventDefault();
                }

                return false;
            }
//滚轮滚动结束

	/*setTimeout(function(){
		alert(1)
			shakeObj(aDesktopContent[0],36,36)
		
	},3000)*/

for (var i=0;i<aAppPic.length;i++) {
	aAppPic[i].index=i;
	
	aAppPic[i].parentNode.onmousemove=function(){
		shakeObj(this,36,36)
	}

		

	aAppPic[i].ondblclick=function(){
		for (var i=0;i<aAppPic.length;i++) {
			aAppPic[i].parentNode.className="";
			aAppPic[this.index].parentNode.nextSibling.className="";
		}
				aAppPic[this.index].parentNode.className="show";
				aAppPic[this.index+1].parentNode.className="hide";
				oWindow.style.display="block";
				/*oWindow.style.width=912+"px";
				oWindow.style.height=455+"px";*/
				startMove(oWindow, {left:200,top:100,width:912,height:455}, 500, "linear")
				/*oWindow.style.left=100+"px";
				oWindow.style.top=20+"px";*/
				var oLi=document.createElement('li');
				oLi.className="lis";
				oLi.innerHTML=this.parentNode.innerHTML;
				oList.appendChild(oLi);
		}
}
//双击头部宽度和高度100%
oWindow.children[0].children[0].children[0].ondblclick=function(){
	startMove(oWindow,{left:0,top:0,width:1349,height:650}, 500, "linear")
	return false;

}
//弹窗的操作功能
for (var i=0;i<aAppPic.length;i++) {
	aAppPic[i].index=i;
	aA[1].onclick=function(){
		startMove(oWindow,{left:0,top:0,width:1349,height:650}, 500, "linear")
	}
		aA[2].onclick=function(){
			startMove(oWindow, {left:200,top:100,width:912,height:455}, 500, "linear")
		}
			aA[0].onclick=function(){
				
				startMove(oWindow, {left:800,top:200,width:0,height:0}, 500, "linear",function(){
					oWindow.style.display="none";
				})
			}

		var oWindowReduction=$Id('WindowReduction');
		aA[3].onclick=function(){
			startMove(oWindow, {left:800,top:200,width:0,height:0}, 500, "linear",function(){
					oWindow.style.display="none";
			})
			var oLi=document.createElement('li');
			oLi.innerHTML="应用市场";
			oWindowReduction.appendChild(oLi)
			oLi.onclick=function(){
				oLi.style.display="none";
				oWindow.style.display="block";
				startMove(oWindow, {left:200,top:100,width:912,height:455}, 500, "linear")
			}
		}
}


	//拖拽
	var aPos=[];
	var iMinZindex=2;
	var i=0;
	var parentLi=aAppPic[i].parentNode;
	var aAPPList=getByClass(oDesktopContents, 'ul', 'appList');
	//alert(aAPPList.length)
	for(var j=0;j<aAPPList.length;j++){
		aAPPList[j].index=j
		var $Li=$Tag(aAPPList[j],'li');
			//console.log($Li)
			tab($Li);
		
	}
function tab(Id) {
	for(i=0;i<Id.length;i++)
	{
		aPos[i]={left: Id[i].offsetLeft, top: Id[i].offsetTop};
	}
	
	for(i=0;i<Id.length;i++)
	{
		Id[i].style.left=aPos[i].left+'px';
		Id[i].style.top=aPos[i].top+'px';
		
		Id[i].style.position='absolute';
		Id[i].style.margin='0';
		
		Id[i].index=i;
	}
	
	//拖拽
	for(k=0;k<Id.length;k++)
	{
		setDrag(Id[k]);
	}
	
	function setDrag(obj)
	{
		obj.onmousedown=function (ev)
		{
			var oEvent=ev||event;
			
			obj.style.zIndex=iMinZindex++;
			
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;
			
			document.onmousemove=function (ev)
			{
				var oEvent=ev||event;
				
				obj.style.left=oEvent.clientX-disX+'px';
				obj.style.top=oEvent.clientY-disY+'px';
				
				for(i=0;i<Id.length;i++)
				{
					Id[i].className='';
				}
				
				var oNear=findNearest(obj);
				
				if(oNear)
				{
					oNear.className='show';
				}
				
			};
			
			document.onmouseup=function ()
			{
				document.onmousemove=null;
				document.onmouseup=null;
				
				var oNear=findNearest(obj);
				
				if(oNear)
				{
					oNear.className='';
					
					oNear.style.zIndex=iMinZindex++;
					obj.style.zIndex=iMinZindex++;
					
					startMove(oNear, aPos[obj.index],1000,'elasticOut');
					startMove(obj, aPos[oNear.index],1000,'elasticOut');
					
					var tmp=0;
					
					tmp=obj.index;
					obj.index=oNear.index;
					oNear.index=tmp;
				}
				else
				{
					startMove(obj,aPos[obj.index],1000,'elasticOut');
				}
			};
			
			clearInterval(obj.timer);
			
			return false;
		};
	}
	
	//碰撞检测
	function cdTest(obj1, obj2)
	{
		var l1=obj1.offsetLeft;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var t1=obj1.offsetTop;
		var b1=obj1.offsetTop+obj1.offsetHeight;
		
		var l2=obj2.offsetLeft;
		var r2=obj2.offsetLeft+obj2.offsetWidth;
		var t2=obj2.offsetTop;
		var b2=obj2.offsetTop+obj2.offsetHeight;
		
		if(r1<l2 || l1>r2 || b1<t2 || t1>b2)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	
	function getDis(obj1, obj2)
	{
		var a=obj1.offsetLeft-obj2.offsetLeft;
		var b=obj1.offsetTop-obj2.offsetTop;
		
		return Math.sqrt(a*a+b*b);
	}
	
	function findNearest(obj)	//找到碰上的，并且最近的
	{
		var iMin=999999999;
		var iMinIndex=-1;
		
		for(i=0;i<Id.length;i++)
		{
			if(obj==Id[i])continue;
			
			if(cdTest(obj, Id[i]))
			{
				var dis=getDis(obj, Id[i]);
				
				if(iMin>dis)
				{
					iMin=dis;
					iMinIndex=i;
				}
			}
		}
		
		if(iMinIndex==-1)
		{
			return null;
		}
		else
		{
			return Id[iMinIndex];
		}
	}
}


//右键菜单
var oContextMenu=$Id('contextMenu');
//var oRowsshow=getByClass(oContextMenu, 'li', 'rows show')
//console.log(oContextMenu.children[2])
var oContextMenu1=getByClass(oContextMenu, 'ul', 'contextMenu');
var oTime=null;
document.oncontextmenu=function(ev){
	var ev=ev||event;
	oContextMenu.style.display="block";
	oContextMenu.style.left=ev.clientX+"px";
	oContextMenu.style.top=ev.clientY+"px";
	return false;
}

	oContextMenu.children[2].onmouseover=function(){
		oContextMenu1[0].style.display="block";
	}
	oContextMenu.children[2].onmouseout=function(){
		clearInterval(this.oTime)
		this.oTime=setTimeout(function(){
			oContextMenu1[0].style.display="none";
		},500)
		
	}
		oContextMenu.children[6].onmouseover=function(){
			oContextMenu1[1].style.display="block";
		}
			oContextMenu1[1].children[0].onclick=function(ev){
				var ev= ev||event;
				ev.cancelBubble=true;
				for (var i=0;i<aAppPic.length;i++) {
					aAppPic[i].children[0].style.width=48+"px";
				}
				
			}
				oContextMenu1[1].children[1].onclick=function(ev){
					var ev= ev||event;
					ev.cancelBubble=true;
					for (var i=0;i<aAppPic.length;i++) {
						aAppPic[i].children[0].style.width=58+"px";
					}
					
				}
		oContextMenu.children[6].onmouseout=function(){
			clearInterval(this.oTime)
			this.oTime=setTimeout(function(){
				oContextMenu1[1].style.display="none";
			},500)	
		}
			document.onclick=function(ev){
				var ev=ev||event;
				oContextMenu.style.display="none";
				ev.cancelBubble=true;
			}


//表
var aLiTime = '';
var oUl = document.getElementById("ul1");
var oHour = document.getElementById("iHour");
var oMin = document.getElementById("iMin");
var oSec = document.getElementById("iSec");
var oLine = document.getElementById("line")
for(var i = 0;i<60;i++)
{
	if(i%5 == 0)
	{
		var clockNum = i/5;
		clockNum = clockNum==0?12:clockNum;
		aLiTime += "<li style ='height: 12px; width: 3px;font-size:20px;color:#fff;text-align:center;font-weight:bold;-moz-transform:rotate("+(i*6)+"deg);-webkit-transform:rotate("+(i*6)+"deg)'>"+clockNum+"</li>"
	}else
	{
		aLiTime += "<li style ='-moz-transform:rotate("+(i*6)+"deg);-webkit-transform:rotate("+(i*6)+"deg)'></li>";
	}
}

oUl.innerHTML = aLiTime;
time();
setInterval(time,50)
function time()
{	
	var oDate = new Date();
	var iHour = oDate.getHours();
	var iMin = oDate.getMinutes();
	var iSec = oDate.getSeconds();
	var iMill = oDate.getMilliseconds();
		oHour.style.transform="rotate("+(iHour+iMin/60)*30+"deg)"
		oMin.style.transform="rotate("+(iMin+iSec/60)*6+"deg)"
		oSec.style.transform="rotate("+iSec*6+"deg)"
}
//主菜单
var oMainMenuList=$Id('mainMenuList');
var oMainMenuListLi=$Tag(oMainMenuList,'li');
var aImg=$Tag(oMainMenuList,'img');
for (var i=0;i<aImg.length;i++) {
	aImg[i].onmousemove=function(ev){
		var ev= ev||event;
		for (var i=0;i<aImg.length;i++) {
			var x=aImg[i].offsetLeft+aImg[i].offsetWidth/2;
			var y=aImg[i].offsetTop+oMainMenuList.offsetTop+aImg[i].offsetHeight/2;
			
			var a=x-ev.clientX;
			var b=y-ev.clientY;
			
			var dis=Math.sqrt(a*a+b*b);
			
			var scale=1-dis/100;

			if(scale<0.5)
			{
				scale=0.5;
			}
			
			aImg[i].width=scale*100;

		}
			ev.cancelBubble=true;

	}
}

//开始动画 log
var oStarting=$Id('starting');
var oStartLoading=$Id('startLoading')
var num=0;
var iTime=null;
oMainMenuListLi[2].onclick=function(){
	oStarting.style.display="block";
		iTime=setInterval(function(){
			num++
			if(num==100){
				oStarting.style.display="none";
				num=0;
				clearInterval(iTime)

			}
			oStartLoading.innerHTML=num+"%";
		},50)

}



//阻止默认行为
//window.event.returnValue = false;
document.addEventListener('click', addEvent,true);

function addEvent(){
	return false;
}
/*
bind(document, 'click', addEvent)
function bind(obj, evname, evfn) {
            if (obj.addEventListener) {
                obj.addEventListener(evname, evfn, false);
            } else {
                obj.attachEvent('on'+evname, function() {
                    evfn.call(obj);
                });
            }
        }*/

/*function stopBubble(e) {

    // 如果提供了事件对象，则这是一个非IE浏览器

    if ( e && e.stopPropagation ) {

        // 因此它支持W3C的stopPropagation()方法 

        e.stopPropagation();

    } else { 

        // 否则，我们需要使用IE的方式来取消事件冒泡

        window.event.cancelBubble = true;

    }

}

 功能：阻止事件默认行为

function stopDefault( e ) {

     // 阻止默认浏览器动作(W3C)

     if ( e && e.preventDefault ) {

         e.preventDefault();

     } else {

        // IE中阻止函数器默认动作的方式

        window.event.returnValue = false;

    }

    return false;

}*/

	
