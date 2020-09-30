import { mapState } from "vuex";
export default {
  name: "PickUpDetail",

  data() {
    return {
      queryParams: {},
      details: {},
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

    getDetail() {
      let me = this,
        params = {
          uid: me.pickUpUserInfo.uid
        };

      me.$http.get("/goods/goodsCart", { params }).then(res => {
        me.details = res.data || {};
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

    //是否可下单
    canSubmit() {
      let me = this,
        data = me.getAllCkd();
      if (!Object.keys(data).length) {
        return true;
      }
      return false;
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
                me.getDetail();
                me.getAllPrice();
              }
            });
          });
        });
    }
  }
};
