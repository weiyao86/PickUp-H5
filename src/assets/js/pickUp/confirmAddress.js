import ChooseAddress from "@components/ChooseAddress";
export default {
  name: "ConfirmAddress",
  data() {
    return {
      queryParams: {},
      goodsParams: {},
      details: {},
      showPopup: false,
      addressList: [],
      name: "",
      tel: "",
      address: "",
      desc: "",
      checked: false
    };
  },

  components: { ChooseAddress },

  created() {
    let me = this;
    me.init();
  },

  methods: {
    init() {
      let me = this;
      me.queryParams = me.$route.query;
      try {
        
        me.goodsParams = JSON.parse(me.queryParams.p).goods_num;
      } catch (err) {
        console.warn("JSON parse params error");
      }
    },

    //确认提货
    onSubmit() {
      let me = this,
        addressList = me.addressList || [],
        data = {
          uid: me.queryParams.uid,
          goods_nums: me.goodsParams,
          user_name: me.name,
          mobile: me.tel,
          address: me.address + me.desc
        };

      me.$http
        .post("/order/createOrder", { data })
        .then(res => {
          me.$toast({
            type: "success",
            message: res.msg,
            onClose() {
              //跳转我的提货单列表
              me.$router.push({
                path: "/pickUp/cardList"
              });
            }
          });
        })
        .catch(error => {
          me.$dialog.alert({
            title: "系统提示",
            message: error.msg
          });
        });
    },

    //打开地址栏
    onShowPopup() {
      let me = this;
      me.showPopup = !me.showPopup;
    },

    //地址栏加载后
    opendAfter() {
      let me = this,
        addressCmp = me.$refs.addressCmp;
      addressCmp.init();
    },

    //地址选完后
    chooseAddressAfter(navList) {
      let me = this;
      me.showPopup = !me.showPopup;
      me.addressList = [...navList];
      me.address = "";
      me.addressList.forEach(item => (me.address += " " + item.name));
    }
  }
};
