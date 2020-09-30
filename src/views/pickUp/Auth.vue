<template>
  <div class="main-page"></div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "AuthPickUp",
  data() {
    return {
      wxInfo: null,
      redirectStatus: {
        qrCode: 1, //二维码错误
        cardUseLess: 2, //卡不可使用
        cardExpire: 3 //卡过期
      }
    };
  },

  created() {
    let me = this;
    me.wxInfo = me.$route.query;
    me.wechatLogin();
  },

  methods: {
    ...mapMutations(["setPickUpUserInfo"]),
    wechatLogin() {
      let me = this,
        href = window.location.href.replace("#", "%23"),
        sec = Math.random().toString(16).substr(2); //8-16 数字+字母

      if (me.wxInfo && !me.wxInfo.openid) {
        //TODO: 上线后更换为     wx/getWxUserInfo
        let fullUrl = `${me.$http.baseUrl}wx/getUserInfo?type=2&redirect_url=${href}`;

        window.location.href = fullUrl;
      } else {
        //设置本地用户相关缓存
        let userInfo = {
          //TODO: 上线后更换
            uid: 1 //me.wxInfo.uid || ""
          },
          lastFullPath = me.$getStorage("lastPathListForPickUp");

        me.$setStorage("wechatAuth", true);
        me.$setStorage("pickUpUserInfo", userInfo);
        me.setPickUpUserInfo(userInfo);

        let { cardExpire, cardUseLess, qrCode, redirectUrl = "" } = me.redirectStatus;
        switch (+(me.wxInfo.status)) {//me.wxInfo.status
          case cardExpire:
            redirectUrl = "/pickUp/cardExpire";
            break;
          case cardUseLess:
            redirectUrl = "/pickUp/cardUseLess";
            break;
          case qrCode:
            redirectUrl = "/pickUp/qrError";
            break;
          default:
            redirectUrl = lastFullPath;
            break;
        }

        me.$router.replace(redirectUrl);
      }
    }
  }
};
</script>
