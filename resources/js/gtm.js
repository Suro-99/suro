var getDate = function() {
	var date = new Date();
	var yyyy = date.getFullYear().toString();
	var MM = getFullDate(date.getMonth() + 1,2);
	var dd = getFullDate(date.getDate(), 2);
	var hh = getFullDate(date.getHours(), 2);
	var mm = getFullDate(date.getMinutes(), 2)
	var ss = getFullDate(date.getSeconds(), 2)

	return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
}

var getFullDate = function(number, length) {
	var str = '' + number;
  while (str.length < length) {
  	str = '0' + str;
  }
  return str;
}

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

var logEvent = function (name, params) {
  if (!name) { return; }
  if (window.AnalyticsWebInterface) {
    window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
  }
  else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.firebase) {
    var message = { event: 'logEvent', name: name, parameters: params };
    window.webkit.messageHandlers.firebase.postMessage(message);
  }
  else {
    window.dataLayer.push({ event: name, parameters: params });
  }
}

var setUserProperty = function (name, value) {
  if (!name || !value) { return; }

  var message = { event: 'setUserProperty', name: name, value: value };

  if (window.AnalyticsWebInterface) {
    window.AnalyticsWebInterface.setUserProperty(name, value);
  }
  else if (window.webkit && window.webkit.messageHandlers
    && window.webkit.messageHandlers.firebase) {
    window.webkit.messageHandlers.firebase.postMessage(message);
  }
}

var ecommercelogEvent = function (name, params) {
  if (!name || !params) { return; }

  if (window.AnalyticsWebInterface) {
    window.AnalyticsWebInterface.ecommerceLogEvent(name, JSON.stringify(params));
  }
  else if (window.webkit && window.webkit.messageHandlers
    && window.webkit.messageHandlers.firebase) {
    var message = { event: 'ecommerceLogEvent', name: name, parameters: params };
    window.webkit.messageHandlers.firebase.postMessage(message);
  }
  else {
    window.dataLayer.push({ event: name, parameters: params });
  }
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


// var item = [];
// var aa = 0;
// for(var i = 0;i < 10; i++){
//     aa += (i + 1);
//     var prdObj = {
//         item_name : 'prd_name_' + (i+1) + "_" + getDate(),
//         item_id : 'prd_Id_' + (i+1) + "_" + getDate(),
//         item_brand : 'prd_br_' + (i+1) + "_" + getDate(),
//         item_category : 'prd_cate_1' + (i+1) + "_" + getDate(),
//         item_category2 : 'prd_cate_2' + (i+1) + "_" + getDate(),
//         item_category3 : 'prd_cate_3' + (i+1) + "_" + getDate(),
//         item_category4 : 'prd_cate_4' + (i+1) + "_" + getDate(),
//         item_variant : "prd_option_" + (i+1) + "_" + getDate(),
//         affiliation : "prd_affli_" + (i+1) + "_" + getDate(),
//         coupon : "prd_coupon_" + (i+1) + "_" + getDate(),
//         location_id: "prd_lo_id_" + (i+1) + "_" + getDate(),
//         currency : "KRW",
//         quantity : 1,
//         price : Number((i+1) * 1000),
//         discount : Number((i+1) * 100),
//     }
//     item.push(prdObj);
// }


// var ecomObj = {
//   affiliation : "tr_af_" + getDate(),
//   coupon : "tr_co_" + getDate(),
//   currency : "KRW",
//   items : item,
//   shipping : 2500,
//   tax : 0,
//   transaction_id : "tr_Id_" + getDate(),
//   value : 49500
// }  

// ecommercelogEvent("purchase", ecomObj);


// 상품 상세



var itemObj = {
  item_id : "703619_" + getDate(),
  item_name : "[쌤위크특가]바이엘 채널 옷장세트 140cm~350cm(높이216cm) 화이트 16종" ,
  item_brand : "한샘",
  item_category : "가구",
  item_category2 : "옷장·드레스룸",
  item_category3 : "여닫이옷장",
  price : 629000,
  currency : "KRW"
};

var items = [];
items.push(itemObj);

var dataLayerObj = {
  items : items,
  event_keyword : "ga4_only_view_item",
  currency : "KRW"
}
logEvent("view_item", dataLayerObj);

dataLayerClearObj = {
    parameters : {
        items : undefined,
        currency : undefined,
        event_keyword : undefined
    }
}
dataLayer.push(dataLayerClearObj);



 // 장바구니 추가
dataLayerObj = {
  items : items,
  event_keyword : "ga4_only_add_to_cart",
  currency : "KRW"
}
logEvent("add_to_cart", dataLayerObj);

dataLayerClearObj = {
    parameters : {
        items : undefined,
        currency : undefined,
        event_keyword : undefined
    }
}
dataLayer.push(dataLayerClearObj);


// 주문서 작성
var itemObj2 = {
  item_id : "823609_" + getDate(),
  item_name : "[쌤위크특가] 포레 컴포트 6인 라운지세트 (벤치1, 코너벤치1, PP의자2 포함)",
  item_brand : "한샘",
  item_category : "가구",
  item_category2 : "식탁",
  item_category3 : "6인용식탁이상",
  price : 1269000,
  quantity: 1,
  currency : "KRW"
};

items = [];
items.push(itemObj);
items.push(itemObj2);

// 결제 완료
dataLayerObj = {
  value : 1901000,
  shipping : 3000,
  transaction_id : "tr_" + getDate(),
  coupon : "한샘몰 첫구매 쿠폰 (1만원 이상 구매시)",
  items : items,
  event_keyword : "ga4_only_add_payment_info",
  currency : "KRW"
}
logEvent("add_payment_info", dataLayerObj);

dataLayerClearObj = {
    parameters : {
      value : undefined,
      shipping : undefined,
      transaction_id : undefined,
      items : undefined,
      coupon : undefined,
      currency : undefined,
      event_keyword : undefined
    }
}
dataLayer.push(dataLayerClearObj);


// 환불 완료
items = [];
items.push(itemObj2);

var dataLayerObj = {
  transaction_id : "tr_" + getDate(),
  items : items,
  event_keyword : "ga4_only_refund",
  currency : "KRW"
}
logEvent("refund", dataLayerObj);

dataLayerClearObj = {
    parameters : {
      transaction_id : undefined,
      items : undefined,
      currency : undefined,
      event_keyword : undefined
    }
}
dataLayer.push(dataLayerClearObj);

