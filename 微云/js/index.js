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
function getByClass(obj, tagname, classname) {
            var elements = obj.getElementsByTagName(tagname);
            var result = [];

            var re = new RegExp('(^|\\s)'+classname+'(\\s|$)');

            for (var i=0; i<elements.length; i++) {
                if (re.test(elements[i].className)) {
                    result.push(elements[i]);
                }
            }

            return result;
}

var oMain_nav=$Id('main_nav')
var oUpload_btn=$Id('upload_btn')
var oList=$Id('list');
var aLi=$Tag(oList,'li');
var iTime=null
/*添加*/
oUpload_btn.onmouseover=function(){
    oList.style.display="block";
}
oUpload_btn.onmouseout=function(){
    iTime=setTimeout(function(){
        oList.style.display="none";
    },500)
}
for (var i=0;i<aLi.length;i++){
    aLi[i].onmouseover=function(ev){
        ev=ev||event;
        clearTimeout(iTime)
        oList.style.display="block";
    }
    aLi[i].onmouseout=function(){
        oList.style.display="none";
    }
}
/*添加*/

var oNav_box=$Id('nav_box');
var aLi=$Tag(oNav_box,'li');
var oMain_bod=$Id('main_bod');
var num=null
for (var i=0;i<aLi.length;i++){
    aLi[i].index=i;
    aLi[i].onclick=function(){
        oMain_bod.removeChild(oMain_bod.children[0])
        var oDiv=document.createElement('div');
        oMain_bod.insertBefore(oDiv,oMain_bod.children[0]);
    }
}

var oBtn_message=$Id('btn_message');
var aA=$Tag(oBtn_message,'a');
var oMain_path=$Id('main_path');
/*for (var i=0;i<aSpan.length;i++){
    aSpan[i].onclick=function(){

    }
}*/
//新建
aA[5].onclick=function(){
    var b=true;
    if(b){
        var oLi=document.createElement('li');
        var oCheck=document.createElement('input');
        oCheck.type="checkbox";
        oLi.appendChild(oCheck)
        var oText=document.createElement('input');
        oText.type="text";
        oText.className="text";
        oLi.appendChild(oText)
        oMain_path.appendChild(oLi);
        b=false;
    }

//删除
aA[4].onclick=function(){
    
}  

    /*if (oText.value==""){
        alert("请输入")
        return;
    }*/
}
