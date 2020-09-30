import { mapState } from "vuex";
export default {
  name: "AddGoods",
  data() {
    return {
      queryParams: {},
      goodsCode: "",
      goodsNum: ""
    };
  },

  computed: {
    ...mapState(["pickUpUserInfo"]),

    canSubmit() {
      let me = this;
      return !me.goodsNum || !me.goodsCode;
    },
    getGoodsCode: {
      get: function() {
        return this.goodsCode;
      },
      set: function(val) {
        this.goodsCode = val.toUpperCase();
      }
    }
  },

  created() {
    let me = this;
    me.init();
  },

  methods: {
    init() {
      let me = this;

      me.queryParams = me.$route.query;
    },

    //提交
    onSubmit() {
      let me = this,
        data = {
          uid: me.pickUpUserInfo.uid,
          goods_num: me.goodsNum,
          serial_number: me.goodsCode
        };

      me.$http.post("/goods/addGoodsCart", { data }).then(res => {
        me.$toast({
          type: "success",
          message: res.msg,
          onClose() {
           me.$router.back();
          }
        });
      });
    }
  }
};
