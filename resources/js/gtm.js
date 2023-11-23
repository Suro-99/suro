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
	var MM = pad(date.getMonth() + 1,2);
	var dd = pad(date.getDate(), 2);
	var hh = pad(date.getHours(), 2);
	var mm = pad(date.getMinutes(), 2)
	var ss = pad(date.getSeconds(), 2)

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