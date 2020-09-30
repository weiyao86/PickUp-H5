<template>
  <div class="card-use-less-wrap">
    <empty :remark="remark"></empty>
    <div class="btns-wrap" v-safe-area-inset-bottom>
      <van-button type="primary" size="large" class="submit-btn" @click="onRedirect">我的提货单</van-button>
    </div>
  </div>
</template>
<script>
import Empty from "@components/Empty";
export default {
  name: "CardUseLess",
  components: {
    Empty
  },
  data() {
    return {
      remark: "卡不可用</br>该卡未在使用时间"
    };
  },
  methods:{
      onRedirect(){
          let me=this;
          me.$router.push({
              path:"/pickUp/cardList"
          });
      }
  }
};
</script>

<style lang="scss">
.card-use-less-wrap {
  min-height: 100%;
  .btns-wrap {
    position: fixed;
    bottom: 0;
    left: 50px;
    right: 50px;

    .submit-btn {
      background-color: $edit-buttons-bg;
      border-color: $edit-buttons-bg;
      font-size: 30px;
      height: 90px;
      vertical-align: middle;
      border-radius: 20px;
    }

    .del-btn {
      background-color: #fff;
      border-color: #fff;
      border-radius: 20px;
      font-size: 30px;
      color: #333;
      height: 90px;
      margin-top: 20px;
    }
  }
}
</style>