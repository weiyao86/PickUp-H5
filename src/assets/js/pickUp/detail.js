import { mapState } from "vuex";
export default {
  name: "PickUpDetail",

  data() {
    return {
      queryParams: {},
      details: {},
      enabled: true,
      totalPrice: 0, //总价
      shippingAmount: 0 //运费
    };
  },

  computed: {
    ...mapState(["pickUpUserInfo"])
  },

  created() {
    let me = this;

    me.queryParams = me.$route.query;
    me.init();
  },

  methods: {
    init() {
      let me = this;
      me.getDetail();
    },

    //根据当前卡状态跳转
    //二维码错误  1
    //卡不可使用  2
    //卡过期   3
    redirectByStatus(status) {
      let me = this,
        redirectUrl = "";

      switch (+status) {
        case 3:
          redirectUrl = "/pickUp/cardExpire";
          break;
        case 2:
          redirectUrl = "/pickUp/cardUseLess";
          break;
        case 1:
          redirectUrl = "/pickUp/qrError";
          break;
        default:
          break;
      }
      if (redirectUrl) {
        me.$router.replace(redirectUrl);
      }
    },

    getDetail() {
      let me = this,
        params = {
          uid: me.pickUpUserInfo.uid,
          number: me.queryParams.number,
          sign: me.queryParams.sign
        };

      me.$http.get("/goods/goodsCart", { params }).then(res => {
        me.details = res.data || {};

        me.redirectByStatus(res.status);
      });
    },

    //获取总价
    onChoose(item) {
      let me = this;

      me.getAllPrice();
    },

    //获取选中
    getAllCkd() {
      let me = this,
        goodsNum = {};

      me.details.goods || (me.details.goods = []);
      me.details.goods.forEach(res => {
        res["checked"] && (goodsNum[res.goods_id] = res.goods_num);
      });
      return goodsNum;
    },
    //我的提货单
    onSubmit() {
      let me = this,
        data = { goods_num: me.getAllCkd() },
        params = {
          uid: me.pickUpUserInfo.uid,
          p: JSON.stringify(data)
        };

      me.$router.push({
        path: "/pickUp/confirmAddress",
        query: params
      });
    },

    //选择行
    onSelectRow(item) {
      let me = this;
      item["checked"] = !item["checked"];
      me.getAllPrice();
    },

    //获取总价
    getAllPrice() {
      let me = this,
        data = { goods_num: me.getAllCkd() };

      me.$http.post("/goods/getCartPrice", { data }).then(res => {
        let data = res.data;
        me.totalPrice = data.total_amount;
        me.shippingAmount = data.shipping_amount;

        me.enabled =
          me.totalPrice == 0 || me.totalPrice >= me.details.card.balance;
      });
    },

    //delete
    onDel(item) {
      let me = this;

      me.$dialog
        .confirm({
          title: "提示",
          message: "确认删除此商品吗"
        })
        .then(() => {
          let data = {
            uid: me.pickUpUserInfo.uid,
            goods_id: item.goods_id
          };
          me.$http.post("/goods/cartDel", { data }).then(res => {
            me.$toast({
              type: "success",
              message: res.msg,
              onClose() {
                me.details.goods.forEach((res, idx) => {
                  if (res.id == item.id) {
                    me.details.goods.splice(idx, 1);
                  }
                });
                me.getAllPrice();
              }
            });
          });
        });
    }
  }
};
