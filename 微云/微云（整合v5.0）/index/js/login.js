//登陆浮窗定位
var oLogin = getId('login'),
iW = -oLogin.offsetWidth,
iH = -oLogin.offsetHeight;
oLogin.style.margin = iH/2 +'px 0 0 ' + iW/2+'px';

//登陆输入字符显示叉子
var oForm = getId('loginform');
var oUserName = oForm.getElementsByTagName('input')[0];
var aUin_del = getId('uin_del');

oUserName.onkeyup = function(ev){
	var ev = ev || event;
	aUin_del.style.display = this.value ? 'block' : 'none';
}
aUin_del.onclick=function(){
	oUserName.value='';
	aUin_del.style.display='none';
}

//各个输入框滑过高亮
var aInputs=oForm.getElementsByTagName('input');
for(var i=0;i<aInputs.length;i++){
	aInputs[i].onmouseover=function(){
		this.style.borderColor='#999';
	}
	aInputs[i].onmouseout=aInputs[i].onblur=function(){
		this.style.borderColor='#ccc';
	}
	aInputs[i].onfocus=function(){
		this.style.borderColor='#a7d1fb';
	}
}

//显示扫一扫图片
var aSweep = getByClass(oLogin, 'img', 'sweep')[0];
var aQrImg = getByClass(oLogin, 'div', 'qr-img')[0];

aQrImg.onmouseover=function(){
	aSweep.style.display='block';
	aSweep.style.zIndex=1;
	move(aSweep,{opacity:100}, 600, 'linear',function(){
		setTimeout(function(){
			move(aSweep,{opacity:0}, 600, 'linear',function(){
				aSweep.style.zIndex=0;
				aSweep.style.display='none';
			});
		},2000);
	});
}

aQrImg.onmouseout=function(){
	move(aSweep,{opacity:0}, 600, 'linear',function(){
		aSweep.style.zIndex=0;
		aSweep.style.display='none';
	});
}

//刷新二维码图片
var oQrInvaild = getByClass(aQrImg, 'span', 'qr-invaild')[0];
fnAuto();
function fnAuto(){
	clearInterval(timer);
	var timer=setTimeout(function(){
		oQrInvaild.style.display='block';
		oQrInvaild.onclick=function(){
			this.style.display='none';
			fnAuto();
		}
	},4000)
}

//暂时点击登陆直接显示验证码
var aSubmit = getByClass(oLogin, 'a', 'submit')[0];
var aVerifyArea = getByClass(oLogin, 'div', 'verifyArea')[0];
aVerifyArea.style.display='block';
// aSubmit.onclick=function(){
	
// }

//更换验证码图片
var aVerifyImgTips = getByClass(oLogin, 'a', 'verifyimg_tips')[0];
var aVerifyImg = getByClass(oLogin, 'img', 'verifyimg')[0];
var arrVerifyImg=['img/ptgetimage1.jpg','img/ptgetimage2.jpg','img/ptgetimage3.jpg']
var num=0;
aVerifyImgTips.onclick=aVerifyImg.onclick=function(){
	num++;
	if(num==3){
		num=0;
	}
	aVerifyImg.src=arrVerifyImg[num];
}


//登录验证
var aUserName = getId('user'),
aPass = getId('pass'),
aVerify = getId('verifyinputArea'),
aSubmit = getId('submit'),
aErrM = getId('err_m'),
aErrorTips = getId('error_tips'),
aLogin = getByClass(oLogin, 'div', 'login')[0],
aLoginForm = getId('loginform');

var errMessage={
	'nullAccount':'您还没有输入帐号！',
	'nullPass':'您还没有输入密码！',
	'nullVerify':'您还没有输入验证码！',
	'account':'请输入正确的QQ帐号、手机号、邮箱！',
	'miss':'您输入的帐号或密码不正确，请重新输入。',
	'lackVerify':'请输入完整的验证码！',
	'missVerify':'您输入的验证码不正确，请重新输入。'
};
aSubmit.onclick=function(){
	if(isNull(aUserName.value)){
		aErrM.innerHTML=errMessage.nullAccount;
		aErrorTips.style.display='block';
		comP();
		disappearTip();
	}else if(isNull(aPass.value)){
		aErrM.innerHTML=errMessage.nullPass;
		aErrorTips.style.display='block';
		comP();
		disappearTip();
	}else if(isNull(aVerify.value)){
		aErrM.innerHTML=errMessage.nullVerify;
		aErrorTips.style.display='block';
		comP();
		disappearTip();
	}else if(!isQQAccount(aUserName.value) && !isMobileAccount(aUserName.value) && !isEmailAccount(aUserName.value)){
		aErrM.innerHTML=errMessage.account;
		aErrorTips.style.display='block';
		comP();
		disappearTip();
	}else if(!isPass(aPass.value)){
		aErrM.innerHTML=errMessage.miss;
		aErrorTips.style.display='block';
		comP();
		disappearTip();
	}else if(isLackVerify(aVerify.value)){
		aErrM.innerHTML=errMessage.lackVerify;
		aErrorTips.style.display='block';
		comP();
		disappearTip();
	}else if(!isRightVerify(aVerify.value)){
		aErrM.innerHTML=errMessage.missVerify;
		aErrorTips.style.display='block';
		comP();
		disappearTip();
	}else{
		aErrorTips.style.display='none';
		window.location.href = 'index.html';//跳转到主页
	}
}

function comP(){//计算验证信息框的定位
	aErrorTips.style.top=getPos(aLoginForm).t-getPos(aLogin).t-aErrorTips.offsetHeight+'px';
}

function disappearTip(){//验证信息框过一会儿消失
	setTimeout(function(){
		aErrorTips.style.display='none';
	},3000);
}

function isNull(str){//判断空
	if(str==''){
		return true;
	}
	var s='^[ ]+$';
	var re=new RegExp(s);
	return re.test(str);
}

function isQQAccount(str){//判断是否是正确的qq号
	return /^[1-9]\d{4,10}$/.test(str);
}

function isPass(str){//判断是否是正确的密码
	return /^\w{1,16}$/.test(str);
}

function isLackVerify(str){//判断是否是完整的验证码
	return /^\w{1,3}$/.test(str);
}

function isRightVerify(str){//判断是否是正确的验证码
	var code={'nwaa':1,'okpk':1,'xuhu':1};
	return code[str]?true:false;
}

function isMobileAccount(str) {//判断是否是正确的手机号
    return /^1\d{10}$/.test(str);
}

function isEmailAccount(str) {//判断是否是正确的邮箱
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str);
}


/*根据链接判断是否显示头部登录信息*/
var str = window.location.href;
var header = document.getElementById('header');
var ftYahei = getByClass(header, 'div', 'ftYahei')[0];
if(str.indexOf('login.html')!=-1){
	ftYahei.style.display = 'none';
}else{
	ftYahei.style.display = 'block';
}