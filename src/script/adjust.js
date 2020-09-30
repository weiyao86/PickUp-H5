//rem 布局
(function(window, document) {
  var setRem = function() {
    var baseSize = 75,
      innerWidth =
        document.documentElement.clientWidth ||
        document.documentElement.getBoundingClientRect().width ||
        window.innerWidth,
      scale = innerWidth / 750;

    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  };
  window.addEventListener(
    "orientationchange" in window ? "orientationchange" : "resize",
    setRem,
    false
  );
  setRem();
})(window, document);

// 判断iPhone X、iPhone XS、iPhone XS Max、iPhone XR
// iPhone X、iPhone XS
var iphoneReg =
  /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio;
var isIPhoneX =
  iphoneReg &&
  window.devicePixelRatio === 3 &&
  window.screen.width === 375 &&
  window.screen.height === 812;
// iPhone XS Max
var isIPhoneXSMax =
  iphoneReg &&
  window.devicePixelRatio === 3 &&
  window.screen.width === 414 &&
  window.screen.height === 896;
// iPhone XR
var isIPhoneXR =
  iphoneReg &&
  window.devicePixelRatio === 2 &&
  window.screen.width === 414 &&
  window.screen.height === 896;

if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
  document.getElementsByTagName("html")[0].className += "isIPhoneX";
}
