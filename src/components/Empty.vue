<template>
  <div class="pickup-empty-wrap">
    <van-empty class="custom-image">
      <template #image>
        <van-icon v-if="type == 1" name="info" />
        <van-icon v-else name="coupon-o" />
      </template>
      <template #description>
        <p v-html="desc" class="text-desc"></p>
      </template>
    </van-empty>
  </div>
</template>

<script>
export default {
  name: "Empty",
  props: ["remark","type"],
  data() {
    return {
      desc: this.remark || "暂无数据",
      img: this.image || this.$emptyImg
    };
  },
  created() {
    let me = this;
    me.init();
  },
  methods: {
    init() {
      let me = this;
    }
  }
};
</script>

<style lang="scss" scoped>
.pickup-empty-wrap {
  .custom-image {
    .text-desc {
      text-align: center;
    }
    /deep/ .van-empty__image {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      img {
        width: 50%;
        height: 50%;
      }

      .van-icon {
        color: #ccc;
      }
    }
  }
}
</style>