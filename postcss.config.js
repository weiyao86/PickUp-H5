const AutoPrefixer = require("autoprefixer");
const px2rem = require("postcss-pxtorem");
module.exports = ({
  file
}) => {
  let remUnit; // 判断条件
  console.log('*******************')
  console.log(file)
 
  //按750*1334 设计稿1：1还原,第三方UI框架没适配rem－如(vant 根字体为37.5px),后续重写vant组件样式时需px/2
  let otherUI=['vant','mescroll'];
  if (file && file.dirname && otherUI.some(n=>file.dirname.indexOf(n)>-1)) {
    remUnit = 37.5;
  } else {
    remUnit = 75;
  }
  return {
    plugins: [
      px2rem({
        rootValue: remUnit, //vant-UI的官方根字体大小是37.5
        unitPrecision: 5,
        propList: ['*']
        // selectorBlackList: [],
        // replace: true,
        // mediaQuery: false,
        // minPixelValue: 12
      }), AutoPrefixer({
        overrideBrowserslist: [

          "Android 4.1",

          "iOS 7.1",

          "Chrome > 31",

          "ff > 31",

          "ie >= 8"
        ]
      })
    ]
  };
};
