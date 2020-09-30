import Cache from "../script/localStorage";

export default {
  cancelTokenList: [], //取消请求数组
  //仅提货卡使用
  pickUpUserInfo:Cache.getStorage('pickUpUserInfo')
}
