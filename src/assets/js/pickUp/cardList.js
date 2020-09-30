import { mapState } from "vuex";
export default {
  name: "CardList",
  data() {
    return {
      queryParams: {},
      cardList: []
    };
  },

  filters: {
    getTextByStatus(status) {
      let text = "";
      switch (+status) {
        case 0:
          text = "未支付";
          break;
        case 1:
          text = "未发货";
          break;
        case 2:
          text = "已发货";
          break;
        case 3:
          text = "已取消";
          break;
        case 4:
          text = "已完成";
          break;
        default:
          text = "未支付";
          break;
      }
      return text;
    }
  },

  computed: {
    ...mapState(["pickUpUserInfo"])
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

    mescrollInit(mescroll) {
      let me = this;
      me.mescroll = mescroll;
    },

    //上拉加载
    upCallback(page, mescroll) {
      let me = this;
      me.pageNum = page.num;

      let params = {
        uid: me.pickUpUserInfo.uid,
        limit: me.limit,
        page: me.pageNum
      };

      me.$http
        .get("/order/orderList", { params })
        .then(rst => {
          let curData = (rst.data && rst.data.items) || [];

          if (me.pageNum == 1) {
            me.cardList = [];
          }

          me.cardList = [...me.cardList, ...curData];
          me.mescroll.endByPage(curData.length, rst.data.total_pages);
        })
        .catch(error => me.mescroll.endErr());
    },

    isShowBtn(item, status) {
      let me = this,
        isShow = false,
        orderStatus = item.order_status;
        
      switch (status) {
        case 1:
          isShow = orderStatus == 0;
          break;
        case 2:
          isShow = orderStatus == 1;
          break;
        case 3:
          isShow = orderStatus == 2 || orderStatus == 4;
          break;
        default:
          break;
      }
      return isShow;
    },

    //查看订单详情
    onRedirectDetail(item) {
      let me = this;
      
      me.$router.push({
        path: "/pickUp/cardDetail",
        query: {
          uid: me.pickUpUserInfo.uid,
          order_id: item.id,
          status: item.order_status
        }
      });
    },

    //立即支付
    onBuyNow(item) {
      let me = this;
      me.$dialog
        .confirm({
          title: "提示",
          message: `单号：${item.order_sn}\n是否立即支付`
        })
        .then(() => {
          let data = {
            uid: me.pickUpUserInfo.uid,
            order_id: item.id
          };
          me.$http.post("/order/againPay", { data }).then(res => {
            me.$toast({
              title: "提示",
              message: res.msg,
              onClose() {
                me.mescroll.resetUpScroll();
              }
            });
          });
        });
    },

    //取消单
    onCancel(item) {
      let me = this;
      me.$dialog
        .confirm({
          title: "提示",
          message: `单号：${item.order_sn}\n是否取消此提货单`
        })
        .then(() => {
          let data = {
            uid: me.pickUpUserInfo.uid,
            order_id: item.id
          };
          me.$http.post("/order/cancelOrder", { data }).then(res => {
            me.$toast({
              title: "提示",
              message: res.msg,
              onClose() {
                me.mescroll.resetUpScroll();
              }
            });
          });
        });
    },

    //查看物流
    onSearchLogistics(item) {
      let me = this;
      me.$router.push({
        path: "/pickUp/logistics",
        query: {
          uid: me.pickUpUserInfo.uid,
          order_id: item.id
        }
      });
    }
  }
};
