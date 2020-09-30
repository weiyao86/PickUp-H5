<template>
  <div class="main-page"></div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "AuthPickUp",
  data() {
    return {
      wxInfo: null
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
       // let h="http://172.16.30.232:8081/#/pickUp/auth?number=TH000027&sign=WVRNM05UYzVZVEk1TWpjME5HUXpNemczTVRWa1kyUm1aREF6WWpBeE56ZFVTREF3TURBeU53PT0=";
        
        let fullUrl = `${me.$http.baseUrl}wx/getWxUserInfo?redirect_url=${href}`;

        window.location.href = fullUrl;
      } else {
        //设置本地用户相关缓存
        let userInfo = {
            uid: me.wxInfo.uid || ""
          },
          lastFullPath = me.$getStorage("lastPathListForPickUp");

        me.$setStorage("wechatAuth", true);
        me.$setStorage("pickUpUserInfo", userInfo);
        me.setPickUpUserInfo(userInfo);

        me.$router.replace(lastFullPath);
      }
    }
  }
};
</script>
