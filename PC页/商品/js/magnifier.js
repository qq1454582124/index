window.onload = function() {
	//获取页面元素
  var objMag = document.getElementById("magnifier");
  var objSmall = document.getElementById("small");
  var objMark = document.getElementById("mark");
  var objShow = document.getElementById("show");
  var objBig = document.getElementById("big");
  var objBigImage = objBig.getElementsByTagName("img")[0];
	//鼠标移入，放大镜mark和大图片big显示
  objMark.onmouseover = function() {
    objShow.style.display = "block";
		objBig.style.display = "block";
  }
	//鼠标移出，放大镜mark和大图片big隐藏
  objMark.onmouseout = function() {
    objShow.style.display = "none";
		objBig.style.display = "none";
  }
	//鼠标在小图片上移动
  objMark.onmousemove = function(ev) {
    var _event = ev || window.event; //兼容多个浏览器的event参数模式
    var left = _event.clientX - objMag.offsetLeft - objSmall.offsetLeft - objShow.offsetWidth / 2;
    var top = _event.clientY - objMag.offsetTop - objSmall.offsetTop - objShow.offsetHeight / 2;

    if (left < 0) {
      left = 0;
    } else if (left > (objMark.offsetWidth - objShow.offsetWidth)) {
      left = objMark.offsetWidth - objShow.offsetWidth;
    }

    if (top < 0) {
      top = 0;
    } else if (top > (objMark.offsetHeight - objShow.offsetHeight)) {
      top = objMark.offsetHeight - objShow.offsetHeight;

    }

    objShow.style.left = left + "px";
    objShow.style.top = top + "px";

    var percentX = left / (objMark.offsetWidth - objShow.offsetWidth);
    var percentY = top / (objMark.offsetHeight - objShow.offsetHeight);

    objBigImage.style.left = -percentX * (objBigImage.offsetWidth - objBig.offsetWidth) + "px";
    objBigImage.style.top = -percentY * (objBigImage.offsetHeight - objBig.offsetHeight) + "px";
  }
}