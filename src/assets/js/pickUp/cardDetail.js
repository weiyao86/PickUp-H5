export default {
  name: "CartDetail",
  data() {
    return {
      queryParams: {},
      orderDetail: {},
      goodsList: [],
      btnText: "",
      showBtn: false
    };
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
      me.showOptBtn();
    },
    //拉取详情
    getDetail() {
      let me = this,
        params = {
          uid: me.queryParams.uid,
          order_id: me.queryParams.order_id
        };

      me.$http.get("/order/orderDetails", { params }).then(res => {
        let data = res.data || {};
        me.orderDetail = data.order;
        me.goodsList = data.goods;
      });
    },

    //提交操作
    onSubmit() {
      let me = this,
        orderStatus = me.queryParams.status,
        orderSn = me.orderDetail.order_sn,
        url = "",
        confirmTxt = "";

      switch (+orderStatus) {
        case 0:
          url = "/order/againPay";
          confirmTxt = `单号：${orderSn}\n是否立即支付`;
          break;
        case 1:
          url = "/order/cancelOrder";
          confirmTxt = `单号：${orderSn}\n是否取消此提货单`;
          break;
        case 2:
        case 4:
          return me.$router.push({
            path: "/pickUp/logistics",
            query: {
              uid: me.queryParams.uid,
              order_id: me.queryParams.order_id
            }
          });
        default:
          break;
      }
      if (!url) return;

      me.$dialog
        .confirm({
          title: "提示",
          message: confirmTxt
        })
        .then(() => {
          let data = {
            uid: me.queryParams.uid,
            order_id: me.queryParams.order_id
          };
          me.$http.post(url, { data }).then(res => {
            me.$toast({
              title: "提示",
              message: res.msg,
              onClose() {
                me.$router.back();
              }
            });
          });
        });
    },

    //显示对应按钮
    showOptBtn() {
      let me = this,
        orderStatus = me.queryParams.status;
      switch (+orderStatus) {
        case 0:
          me.showBtn = true;
          me.btnText = "立即支付";
          break;
        case 1:
          me.showBtn = true;
          me.btnText = "取消";
          break;
        case 2:
        case 4:
          me.showBtn = true;
          me.btnText = "查看物流";
          break;
        default:
          break;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    let title = "提货单详情";
    switch (+to.query.status) {
      case 0:
        title = "立即支付";
        break;
      case 1:
        title = "取消";
        break;
      case 2:
      case 4:
        title = "查看物流";
        break;
      default:
        title = "提货单详情";
        break;
    }
    to.meta.title = title;
    next();
  }
};
