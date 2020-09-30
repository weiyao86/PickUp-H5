<template>
  <div class="popup-wrap">
    <div class="popup-title van-hairline--bottom">
      <div class="img-wrap">
        <img v-lazy="specData.img" class="ad-img" />
      </div>
      <div class="text-wrap">
        <p class="price">￥{{ specData.price }}</p>
        <p class="title-text van-multi-ellipsis--l2">{{ specData.goodsName }}</p>
      </div>
    </div>
    <div class="popup-content">
      <div class="spec-wrap">
        <p class="title">规格</p>
        <ul class="list van-hairline--bottom">
          <li class="item" :class="{ active: item.checked }" @click="chooseSpec(item)" v-for="(item, idx) in specData.specs" :key="idx">{{ item.specs_name }}</li>
        </ul>
      </div>
      <div v-if="specData.hasNum" class="shopcart-num">
        <p class="title">数量</p>
        <ul class="list">
          <li class="item">
            <van-stepper v-model.number="specData.buyNum" integer default-value="1" min="1" :max="specData.inventory" />
          </li>
        </ul>
      </div>
    </div>
    <div class="popup-btns-wrap" v-safe-area-inset-bottom>
      <van-button class="confirm" block @click="onCloseLayer">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Specification",
  props: ["refData"],
  data() {
    return {
      specData: this.getData()
    };
  },

  watch: {
    refData: {
      handler(val, oval) {
        this.getData();
        this.setCurSpec(val.id, val.buyNum);
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
      //must be deep copy the object
    getData() {
      let me = this;
      me.specData = JSON.parse(JSON.stringify(me.refData));
    },
    //选择规格,购买数量还原1
    chooseSpec(item) {
      let me = this,
        id = item.specs_id;
      //设置当前选中
      me.setCurSpec(id, 1);
      me.$emit("chooseSpec", me.specData);
    },
    setCurSpec(id, buyNum) {
      let me = this;

      me.specData.specs = [...me.specData.specs].map((res) => {
        let checked = false;
        if (id == res.specs_id) {
          checked = true;
          let { specs_id: id, specs_name: name, specs_price: price, specs_img: img, inventory: inventory } = res;
          me.specData = Object.assign(me.specData, { id, name, price, img, inventory, buyNum: buyNum });
        }
        res["checked"] = checked;
        return res;
      });
    },

    onCloseLayer() {
      let me = this;
      me.$emit("onCloseLayer", me.specData);
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  display: flex;
  flex-flow: column;
  padding: 0 30px;

  .popup {
    &-title {
      flex-shrink: 0;
      height: 210px;
      display: flex;
      align-items: center;

      .img-wrap {
        width: 220px;
        height: 220px;
        position: relative;

        .ad-img {
          position: absolute;
          top: -40px;
          border: 2px solid #eaeaea;
          border-radius: 10px;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }

      .text-wrap {
        flex: 1;
        padding: 0 30px;

        .price {
          font-size: 24px;
          height: 40px;
          line-height: 40px;
          color: $font-active-cls;
        }

        .title-text {
          margin-top: 6px;
          font-size: 26px;
          height: 80px;
          line-height: 40px;
        }
      }
    }

    &-content {
      flex: 1 1 auto;
      max-height: 440px;
      min-height: 240px;
      overflow-y: auto;
      padding-bottom: 100px;
      .spec-wrap,
      .shopcart-num {
        .title {
          height: 70px;
          font-size: 30px;
          font-weight: bold;
          display: flex;
          align-items: flex-end;
        }

        .list {
          padding: 30px 0;
          font-size: 0;

          .item {
            margin: 20px 20px 0 0;
            height: 60px;
            line-height: 60px;
            padding: 0 30px;
            font-size: 24px;
            border-radius: 10px;
            border: 2px solid $theme-gray-bg;
            background: $theme-gray-bg;
            display: inline-block;
          }

          .active {
            border-color: $border-active-cls;
            background: #fff;
            color: $font-active-cls;
          }
        }
      }

      .shopcart-num {
        .list .item {
          padding: 0;
          border-radius: 40px;
          overflow: hidden;
        }
      }
    }

    &-btns-wrap {
      flex-shrink: 0;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 50px;
      background-color: #fff;

      .confirm {
        height: 90px;
        line-height: 90px;
        font-size: 30px;
        border-radius: 10px;
        color: #fff;
        background: $font-active-cls;
        border: 2px solid $font-active-cls;
      }
    }
  }
}
</style>