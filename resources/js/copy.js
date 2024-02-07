// 각종 권한 허용
const log = require('logToConsole');
const injectScript = require('injectScript');
const callInWindow = require('callInWindow');
const copyFromWindow = require('copyFromWindow');
const queryPermission = require('queryPermission');
const createQueue = require('createQueue');
const getCookieValues = require('getCookieValues');

// 인터페이스 케이스 함수
const dataLayerPush = createQueue('dataLayer');
const logEvent = copyFromWindow("logEvent");
const setUserProperty = copyFromWindow("setUserProperty");
const ecommercelogEvent = copyFromWindow("ecommercelogEvent");

// GA4, DS 이벤트 전송을 위해 dataLayer 객체 만들기
var dataLayerObj = {};
var tmpDataLayerObj = {};
var dataObj = {};

// DS 스크립트 URL, DS로 데이터 전송 함수
const url = "https://mall.hanssem.com/resources/js/log/nlogger.js";
const nLogger = copyFromWindow('nLogger');


// 성공, 실패 시 실행 함수
const onSuccess = () => { data.gtmOnSuccess(); };
const onFailure = () => { data.gtmOnFailure(); };

// 넘어온 데이터 객체 확인
log('data =', data);

var dsParamsForLoop = function(params, dataObject) {
  if(params !== undefined) {
    for(var x in params){
      if(data.eventParamsDS[x].eventValueDS !== undefined) {
         dataObject[data.eventParamsDS[x].eventNameDS] = data.eventParamsDS[x].eventValueDS;
      }
    }  
  }
  return dataObject;
};


var replaceKey = function(key) {
  
  log('replaceKey 함수 시작 =', key);
  
  if(key.indexOf("-") > -1) {
    key = key.replace("-", "_");
    key = replaceKey(key);
  }
  
  log('replaceKey 함수 종료 =', key);
  return key;
}; 

var dsforGA4ParamsForLoop = function(params, dataObject) {
  
  log('dsforGA4ParamsForLoop 함수 시작');
  
  if(params !== undefined) {
    for(var x in params){
      if(data.eventParamsDS[x].eventValueDS !== undefined) {
        var key = replaceKey(data.eventParamsDS[x].eventNameDS);
        dataObject[key] = data.eventParamsDS[x].eventValueDS;
      }
    }  
  }
  
  log('dsforGA4ParamsForLoop 함수 종료');
  
  return dataObject;
};

var gaParamsForLoop = function(params, dataObject) {

  log('gaParamsForLoop 함수 시작');
  
  log('getPCID=', getPCID());
  log('getPageLocation=', getPageLocation());
  log('getPageReferrer=', getPageReferrer());
  log('getPageTitle=', getPageTitle());
  log('getPageParameter=', getPageParameter());
  
  log('gaParamsForLoop 함수 중간 1 ', params);
  
  if(getPCID() !== undefined) dataObject.pcid = getPCID();
  if(getPageLocation() !== undefined) dataObject.page_location = getPageLocation();
  if(getPageReferrer() !== undefined) dataObject.page_referrer = getPageReferrer();
  if(getPageTitle() !== undefined) dataObject.page_title = getPageTitle();
  if(getPageParameter() !== undefined) dataObject.page_params = getPageParameter();

  log('gaParamsForLoop 함수 중간 2 ');
  
  if(params !== undefined) {
    for(var x in params){
      if(data.eventParams[x].eventValue !== undefined) {
        dataObject[data.eventParams[x].eventName] = data.eventParams[x].eventValue;
      }
    }  
  }
  
  log('gaParamsForLoop 함수 종료');
  
  return dataObject;
};

var getPCID = function(){  
  const cookieName = 'PCID';
  let cookieValues;
  if (queryPermission('get_cookies', cookieName)) {
    cookieValues = getCookieValues(cookieName) + "_s";
  }
  return cookieValues;
};

var getPageLocation = function () {
  const getUrl = require('getUrl');
  if (queryPermission('get_url')) {
    var pageLocation = getUrl();
    return pageLocation.split("?")[0].substring(0, 100);
  }
  return undefined;
};

var getPageReferrer = function () {
  const getReferrerUrl = require('getReferrerUrl');
  
  if (queryPermission('get_referrer')) {
    var referrer = getReferrerUrl();
    return referrer.substring(0, 100);
  }
  return undefined;
};

var getPageTitle = function () {
  const readTitle = require('readTitle');
  
  if (queryPermission('read_title')) {
    var title = readTitle();
    return title.substring(0, 100);
  }
  return undefined;
};

var getPageParameter =function(){
  const getUrl = require('getUrl');
  if (queryPermission('get_url')) {
    var pageLocation = getUrl();
    if(pageLocation.indexOf('?') > -1) {
      return pageLocation.split("?")[1].substring(0, 100);
    }
  }
  return undefined;
};

var setGAData = function(){
  
  // GA4에 전송할 사용자, 이벤트 정보 dataLayer 객체에 추가
  dataLayerObj.event_keyword = data.keyword;

  // GA에 전송할 이벤트 정보 dataLayer 객체에 추가
  // DataStory에 전송할 이벤트 정보 dataLayer 객체에 추가
  dataLayerObj = gaParamsForLoop(data.eventParams, dataLayerObj);
  dataLayerObj = dsforGA4ParamsForLoop(data.eventParamsDS, dataLayerObj);

  log('dataLayerObj=', dataLayerObj);
};

var setClearData = function (){
  // dataLayer 이전 변수 제거
  tmpDataLayerObj.parameters = {};
  for(var y in dataLayerObj){
    tmpDataLayerObj.parameters[y] = undefined;
  }
  
  dataLayerPush(tmpDataLayerObj);
};

if(data.keyword.indexOf('ga4_only') > -1){
  setGAData();
  logEvent(data.keyword.split('ga4_only_')[1], dataLayerObj);
  setClearData();
}
else {
  // DataStory 키워드와 GA4 이벤트 명을 동일하게 작성
  var eventType = "ga4_event_web";

  if(data.type == "visible"){
    eventType = "ga4_event_web_visible";
  }
  
  setGAData();
  logEvent(eventType, dataLayerObj);
  setClearData();

  log('tmpDataLayerObj : ', tmpDataLayerObj);

  // 페이지 뷰 일 경우 DataStory 스크립트 로드 
  if(data.type == "page" && queryPermission('inject_script', url)) {
    log("Data story 스크립트 로트 실행");
    
    injectScript(url, onSuccess, onFailure);
    
    log("Data story 스크립트 로트 완료");
  } 

  // 이벤트, 요소 노출일 경우 DS로 전송하는 이벤트 함수 실행
  else {
    
    // 유효성 검사(userId, wp_uid, pathParams 확인)
    if(data.userId !== undefined && data.pathParams !== undefined){

      log('nLogger.configure 함수 실행');
      
      
      var serviceId = data.serviceId;
      
      log('서비스 명 =', serviceId);
      
      if(serviceId.indexOf("REAL_") > -1) {
        serviceId = serviceId.replace("REAL_", "STAGE_");
      }
      
      log('서비스 명 바꾸기 완료');
      
      // 초기 함수 실행
      nLogger.configure({
        nth_service_id: serviceId,
        nth_uid_key: "loginCookieId"
      });
    
      log('nLogger.configure 함수 실행 완료');
      log('nLogger.event 함수 실행');
      
      
      // DS에 전송할 객체 채우기
      if(data.keyword !== "NULL") dataObj[data.type] = data.keyword;
      
      dataObj = dsParamsForLoop(data.eventParamsDS, dataObj);
      
      if(data.keyword !== "NULL") dataObj.isActionLog = "true";
      
      if(data.eventParamsDS !== undefined) {
        for(var x in data.eventParamsDS){
          if(data.eventParamsDS[x].eventNameDS.indexOf("data-gtm-tracking") > -1) {
            dataObj.isActionLog = "true";
          }
        }
      }
      
      dataObj.userNo = data.userId;
      dataObj.wp_uid = data.wp_uid;
    
      log(dataObj);  
      
      nLogger.event(data.pathParams, dataObj);

      log('nLogger.event 함수 실행 완료');
    }
  }

  data.gtmOnSuccess();
}