//头部移动端下载按钮
var oApp = getId('head-app'),
oIos = getTag(oApp, 'a')[0],
oAndroid = getTag(oApp, 'a')[1],
oTios = getTag(oApp, 'a')[2],
oTandroid = getTag(oApp, 'a')[3];

fnHover(oIos, oTios, oTandroid);
fnHover(oAndroid, oTandroid, oTios);

var userBox = getId('userBox'),
userMenu = getId('userMenu');

fnHover(userBox, userMenu);

//通过ID获取元素
function getId(id){
	return document.getElementById(id);
}
//通过ClassName获取元素
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
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

//通过某元素下的tagName获取元素
function getTag(obj, tag){
	return obj.getElementsByTagName(tag);
}

//获取元素定位
function getPos(obj){
	var aPos={l:0,t:0};
	while(obj){
		aPos.l+=obj.offsetLeft;
		aPos.t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return aPos;
}

//划过显示元素
function fnHover(obj1, obj2, obj3){
	var timer = null;
	obj1.onmouseover = function(){
		clearTimeout(timer);
		if(obj3)obj3.style.display = 'none';
		obj2.style.display = 'block';
		if(!obj1.className)obj1.className = 'on';
	}
	obj2.onmouseover = function(){
		clearTimeout(timer);
	}
	obj1.onmouseout = obj2.onmouseout = function(){
		timer = setTimeout(function(){
			obj2.style.display = 'none';
			if(obj1.className=='on')obj1.className='';
		},200)
	}
}

//运动函数
function move(obj, attrs, duration, fx, callback, callback2) {
    clearInterval(obj.iTimer);

    var startTime = Date.now();
    var d = duration;

    var j = {};
    for (var attr in attrs) {
        j[attr] = {};
        j[attr].b = attr == 'opacity' ? Math.round(getStyle(obj, attr) * 100) : parseInt(getStyle(obj, attr));
        j[attr].c = attrs[attr] - j[attr].b;
    }

    obj.iTimer = setInterval(function() {
        var t = Date.now() - startTime;
        if (t >= d) {
            t = d;
        }
        for (var attr in attrs) {
            var v = Tween[fx](t, j[attr].b, j[attr].c, d);
            callback2 && callback2({
                attr : attr,
                v : v
            });
            if (attr == 'opacity') {
                obj.style.opacity = v / 100;
                obj.style.filter = 'alpha(opacity='+ v +')';
            } else {
                obj.style[attr] = v + 'px';
            }
        }
        if (t == d) {
            clearInterval(obj.iTimer);
            callback && callback();
        }
    }, 15);
}

//删除类
function removeClass( obj, sClass ){
    var aClass = obj.className.split(' ');
    if( !obj.className )return;
    for(var i=0; i<aClass.length; i++){
        if( aClass[i] == sClass ){  
            aClass.splice(i,1);
            obj.className = aClass.join(' ');
        }
    }
}

//添加类
function addClass( obj, sClass ){
    var aClass = obj.className.split(' ');
    if( !obj.className ){
        obj.className = sClass;
        return; 
    }
    for(var i=0; i<aClass.length; i++){
        if( aClass[i] == sClass )return;    
    }
    obj.className += ' ' + sClass;
}

/*判断类名是否存在*/
function hasClass( obj, sClass ){ 
    var aClass = obj.className.split(' ');
    for(var i=0; i<aClass.length; i++){
        if( aClass[i] == sClass )return true;
    }
    return false;
}

function view(){
	return {
		w : document.documentElement.clientWidth,
		h : document.documentElement.clientHeight
	}
}


//判断元素是否包含这个className
function isContainClass(obj, classname) {
    var s = '(^|\\s)'+ classname +'(\\s|$)';
    var re = new RegExp(s);
    return re.test(obj.className) ? true : false;
}

/*获取下个节点*/
function getNext( obj ){
    if( !obj || !obj.nextSibling )return null;
    return obj.nextSibling.nodeType === 1 ? obj.nextSibling : getNext( obj.nextSibling );
}

/*获取第一个节点*/
function getFirst( obj ){
    if( !obj || !obj.firstChild )return null;
    return obj.firstChild.nodeType === 1 ? obj.firstChild : getNext( obj.firstChild );  
}

/*获取下一个节点*/
function getPrev( obj ){
    if( !obj || !obj.previousSibling )return null;
    return obj.previousSibling.nodeType === 1 ? obj.previousSibling : getPrev( obj.previousSibling );
}

/*获取最后一个节点*/
function getLast( obj ){
    if( !obj || !obj.lastChild )return null;
    return obj.lastChild.nodeType === 1 ? obj.lastChild : getPrev( obj.lastChild );
}


/*返回当前日期字符串2015-01-12 15:41*/
function fnGetTime() {
    var myTime =  new Date();
    var iYear = myTime.getFullYear();
    var iMonth = myTime.getMonth()+1;// 月
    var iDate = myTime.getDate();
    var iHours = myTime.getHours();
    var iMin = myTime.getMinutes();

    var timeStr = iYear + '-' + setNum(iMonth) + '-' + setNum(iDate) + ' ' + setNum(iHours) + ':' + setNum(iMin);
    return timeStr;
}

/*时间补领零2015-01-12 15:41*/
function setNum(n) {
    return n < 10 ? '0'+n : ''+n;
}