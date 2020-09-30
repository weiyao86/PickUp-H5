<template>
  <div class="footer-nav">
    <router-link class="side-active left" to="/pickUp/cardlist">
      <van-icon name="notes-o" />
    </router-link>
    <router-link class="side-active right" to="/pickUp/addGoods">
      <van-icon name="add-o" />
    </router-link>
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
  /deep/ .van-icon {
    margin: 10px;
    color: #fff;
    font-size: 40px;
  }
  .side-active {
    position: fixed;
    bottom: 100px;
    width: 80px;
    height: 80px;
    z-index: 10;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left {
    border-radius: 0 20px 0 0;
    left: 0;
    right: auto;
    background:#fe8a02;
  }
  .right {
    border-radius: 20px 0 0;
    left: auto;
    right: 0;
    background: #fe5502;
  }
}
</style>