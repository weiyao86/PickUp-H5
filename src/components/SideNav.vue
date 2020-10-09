<template>
  <div class="footer-nav van-hairline--bottom">
    <router-link class="side-active van-hairline--surround left" to="/pickUp/cardlist"> <van-icon name="notes-o" /><span>我的订单</span> </router-link>
    <router-link class="side-active van-hairline--surround right" to="/pickUp/addGoods"> <van-icon name="add-o" /><span>添加商品</span> </router-link>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {};
  },
  components: {},
  methods: {
    onSide() {
      let me = this;
    }
  }
};
</script>
<style lang="scss" scoped>
.footer-nav {
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  top: auto;
  background: #fff;
  height: 80px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  /deep/ .van-icon {
    margin: 10px;
    color: #fe8a02;
    font-size: 40px;
  }
  .side-active {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: #fe8a02;
    height: 60px;
    border-radius: 10px;
    background: #fff;
    padding: 0 20px;
  }
  .left {
    color: #fe8a02;

     .van-icon{
      color: #fe8a02;
    }

    &:after {
      border-color: #fe8a02;
      border-radius: 20px;
    }
  }
  .right {
    color: #fe5502;
    .van-icon{
      color: #fe5502;
    }
    &:after {
      border-color: #fe5502;
      border-radius: 20px;
    }
  }
}
</style>