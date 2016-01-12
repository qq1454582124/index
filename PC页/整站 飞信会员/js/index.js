
function $Id(Id){//获取Id
	return document.getElementById(Id);//获取到的Id返回出去
}
function $Tag(oParent,Tag){//获取父级，标签名，
	return oParent.getElementsByTagName(Tag);
}

//获取行间样式
 var oRight=$Id("Right");
 oRight.innerHTML+= oRight.innerHTML
 var aLi1=$Tag(oRight,"li");
 var aImg=$Tag(oRight,"img");
 var oLis=$Id("lis");
 var aLi2=$Tag(oLis,"li");

var iTimer=null;
var num=0
var iLen = aLi1.length;
var iWidth = parseInt(css(aLi1[0], 'width'));
oRight.style.width = iWidth * iLen + 'px';//让li浮动到同一行；ul的宽度就是所有的li
function m(){
	clearInterval(iTimer)
	iTimer=setInterval(function(){
		num++
        for (var i=0;i<aLi2.length;i++) {
            aLi2[i].className="";
        }   
            num=num%aLi2.length;
            aLi2[num].className="hover"

		move(oRight,'left',num*-iWidth,-10,function(){
			if (num==iLen/2) {//当他滚完一半的时候
				oRight.style.left = '0px';//迅速把他扯回来，从新回到0
				num=0
			}
		})
		
	},2000)
}
for (var i=0;i<aLi2.length;i++){
    aLi2[i].index=i;
    aLi2[i].onmouseover=function(){
        clearInterval(iTimer)
        for (var i=0;i<aLi2.length;i++){
            aLi2[i].className="";
        }   
            aLi2[this.index].className="hover";
    }
    aLi2[i].onmouseout=function(){
        /*or (var i=0;i<aLi2.length;i++){
            aLi2[i].className="";
        }*/   
        m();
    }
}

m();



function move(obj, attr, target, speed, callback) {
    clearInterval(obj.iTimer);

    obj.iTimer = setInterval(function() {

        var iCur = parseInt( css(obj, attr) );
        var value = iCur + speed;

        if ( (speed < 0 && value <= target) || (speed > 0 && value >= target) ) {
            clearInterval(obj.iTimer);
            //value = target;
            obj.style[attr] = target + 'px';
            callback && callback();
        } else {
            obj.style[attr] = value + 'px';
        }

    }, 20);
}

function Move(obj, attr, target, duration, fx) {//要运动的名称  属性值  数度  目标  运动形式
                clearInterval(obj.iTimer);
                var b;
                if (attr == 'opacity') {
                    b = Math.round( css(obj, attr) * 100 );
                } else {
                    b = parseInt(css(obj, attr));
                }
                var c = target - b;
                var d = duration || 1000;
                var fx = fx || 'linear';
                var t2 = +new Date();
                obj.iTimer = setInterval(function() {
                    var t = +new Date() - t2;
                    if (t > d) {
                        t = d;
                        clearInterval(obj.iTimer);
                    }
                    var value = Tween[fx](t, b, c, d);

                    if (attr == 'opacity') {
                        obj.style.opacity = value / 100;
                        obj.style.filter = 'alpha(opacity='+value+')';
                    } else {
                        obj.style[attr] = value + 'px';
                    }

                }, 16);
}



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

