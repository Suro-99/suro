var getDeviceChannel = function() {
	var _deviceChannel = "MOWEB";
	var _userAgnet = window.navigator.userAgent;
	
	if(_userAgnet.match("HSAppAOS") || _userAgnet.match("HSAppIOS")) {
		_deviceChannel = "MOAPP";
	} else {
    var _pcDevice = "win16|win32|win64|mac|macintel";
    var _device = navigator.platform;
    if (_device) {
        if (_pcDevice.indexOf(navigator.platform.toLowerCase()) < 0 ) {
          _deviceChannel = 'MOWEB';
        } else {
          _deviceChannel = "WEB";
        }
    }
	}
	return _deviceChannel;
}

function getDate() {
	var date = new Date();
	var yyyy = date.getFullYear().toString();
	var MM = getFullDate(date.getMonth() + 1,2);
	var dd = getFullDate(date.getDate(), 2);
	var hh = getFullDate(date.getHours(), 2);
	var mm = getFullDate(date.getMinutes(), 2)
	var ss = getFullDate(date.getSeconds(), 2)

	return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
}

function getFullDate(number, length) {
	var str = '' + number;
  while (str.length < length) {
  	str = '0' + str;
  }
  return str;
}


var dataLayer = dataLayer || [];
var pushData = {
    deviceChannel : getDeviceChannel()
};

dataLayer.push(pushData);

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5XVB336S');


var item = [];
var aa = 0;
for(var i = 0;i < 10; i++){
    aa += (i + 1);
    var prdObj = {
        item_name : 'prd_name_' + (i+1) + "_" + getDate(),
        item_id : 'prd_Id_' + (i+1) + "_" + getDate(),
        item_brand : 'prd_br_' + (i+1) + "_" + getDate(),
        item_category : 'prd_cate_1' + (i+1) + "_" + getDate(),
        item_category2 : 'prd_cate_2' + (i+1) + "_" + getDate(),
        item_category3 : 'prd_cate_3' + (i+1) + "_" + getDate(),
        item_category4 : 'prd_cate_4' + (i+1) + "_" + getDate(),
        item_variant : "prd_option_" + (i+1) + "_" + getDate(),
        affiliation : "prd_affli_" + (i+1) + "_" + getDate(),
        coupon : "prd_coupon_" + (i+1) + "_" + getDate(),
        location_id: "prd_lo_id_" + (i+1) + "_" + getDate(),
        currency : "KRW",
        quantity : Number(i+1),
        price : Number((i+1) * 1000),
        discount : Number((i+1) * 100),
    }
    item.push(prdObj);
}


var ecomObj = {
  affiliation : "tr_af_" + getDate(),
  coupon : "tr_co_" + getDate(),
  currency : "KRW",
  items : item,
  shipping : "2500",
  tax : "0",
  transaction_id : "tr_Id_" + getDate(),
  value : "52000"
}  

ecommercelogEvent("purchase", ecomObj);
