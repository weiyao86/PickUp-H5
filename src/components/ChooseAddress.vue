<template>
  <div class="choose-address-wrap">
    <p class="title">选择地区</p>

    <div class="content">
      <div class="nav-wrap">
        <ul class="navbar">
          <li class="nav-item" :class="{ active: setNavActive(item, idx) }" @click="onClickNav(item)" v-for="(item, idx) in navList" :key="idx">{{ item.name }}</li>
        </ul>
      </div>
      <div class="inner-wrap">
        <p class="inner-title">{{ tipChoose }}</p>
        <div class="inner-content" ref="areaWrap">
          <van-cell :title="item.name" :border="false" :class="{ 'choose-cell': item.checked }" @click="choose($event, item)" center v-for="item in areaList" :key="item.id" :data-id="item.id">
            <template #right-icon v-if="item.checked">
              <van-icon name="success" class="active-icon" />
            </template>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChooseAddress",
  props: {
    selectArea: Array
  },
  data() {
    return {
      tipChoose: "请选择省/市",
      areaList: [], //地区列表
      lastAreaList: [], //保存最后一次快照
      navList: [], //导航列表
      curNavItem: {} //当前点击导航
    };
  },

  created() {
    let me = this;

    me.placeHolderTip = {
      id: 9999,
      name: "请选择"
    };

    me.navList.push(me.placeHolderTip);
  },

  methods: {
    //根据传入外部导航列表初始化
    init() {
      let me = this,
        navList = [...me.selectArea];

      //导航数据与最后一次地址信息快照均存在
      if (navList.length && me.lastAreaList.length) {
        me.navList = navList;
        me.areaList = [...me.lastAreaList];
        me.curNavItem = navList[navList.length - 1];
        me.$nextTick(() => me.scrollView(false));
      } else if (navList.length) {
        //仅传入导航数据，地址数据重新获取
        me.navList = navList;
        me.curNavItem = navList[navList.length - 1];
        me.getChildArea(navList[navList.length - 2], () => me.scrollView(false));
      } else {
        //初始化获取数据
        me.getProvince();
      }
    },
    //获取一级列表
    getProvince(cb = null) {
      let me = this;

      me.$http.get("/area/getProvinceList").then((res) => {
        me.areaList = me.setCustData(res.data) || [];
        me.$nextTick((res) => {
          me.$refs.areaWrap.scrollTop=0;
          typeof cb == "function" && cb();
        });
      });
    },

    //获取子级
    getChildArea(item, cb = null) {
      let me = this,
        params = {
          pid: item.id
        };

      me.$http.get("/area/getProvinceList", { params }).then((res) => {
        me.areaList = me.setCustData(res.data) || [];
        me.$nextTick(() => {
          me.$refs.areaWrap.scrollTop=0;
          typeof cb == "function" && cb();
        });
      });
    },

    //导航操作
    onClickNav(item) {
      let me = this;
      me.curNavItem = item;

      if (item.id == me.placeHolderTip.id || item.leaf) {
        //点击请选择
        let idx = me.navList.length - 2;
        if (idx < 0 || item.leaf) return;

        //取出前导航父ID
        let prevItem = me.navList[idx];

        me.getChildArea({ id: prevItem.id }, () => me.scrollView(false));
      } else {
        if (item["level"] == 1) {
          me.getProvince(me.scrollView);
        } else {
          me.getChildArea({ id: item.parent_id }, me.scrollView);
        }
      }
    },

    //选择省/市/镇
    choose(evt, item) {
      let me = this;

      me.setCustData(me.areaList, item);
      me.setNavList(item);
      if (item.leaf) {
        item.leaf && me.navList.pop();
        me.curNavItem = item;
        me.lastAreaList = me.areaList;
        me.$emit("chooseAddressAfter", me.navList);
      } else {
        me.getChildArea(item);
        me.curNavItem = me.placeHolderTip;
      }
    },

    //设置导航列表
    setNavList(item) {
      let me = this,
        len = me.navList.length - 1,
        idx = me.getIdxByCompareLvl(item);

      if (!me.existPlaceHolderTip()) {
        me.navList.push(me.placeHolderTip);
      }
      if (idx > -1) {
        me.navList.splice(idx, 1, item);
      } else {
        me.navList.splice(len, 0, item);
      }
    },

    existPlaceHolderTip() {
      let me = this;
      return me.navList.some((item) => item.id == me.placeHolderTip.id);
    },

    //根据层级获取索引
    getIdxByCompareLvl(item) {
      let me = this,
        idx = -1;
      for (let i = 0, list; (list = me.navList[i]); i++) {
        if (list.level == item.level) {
          idx = i;
          break;
        }
      }
      return idx;
    },

    //封装checked字段到结果集
    setCustData(data, curItem) {
      let me = this;
      return data.map((item) => {
        item["checked"] = false;
        if (curItem && item.id == curItem.id) {
          item["checked"] = true;
        }
        return item;
      });
    },

    //设置导航
    setNavActive(item, idx) {
      let me = this;

      return item.id == me.curNavItem.id;
    },

    //滚动到可见位置
    scrollView(addTipText = true) {
      let me = this,
        children = me.$refs.areaWrap.children,
        item = me.curNavItem,
        curDom = null;

      me.setCustData(me.areaList, item);

      let idx = me.getIdxByCompareLvl(item);

      me.navList.splice(idx + 1, 10);

      addTipText && me.navList.push(me.placeHolderTip);

      for (let i = 0, child; (child = children[i]); i++) {
        let cid = child.getAttribute("data-id") || "";

        if (cid == item.id) {
          curDom = child;
          break;
        }
      }

      if (curDom) {
        curDom.scrollIntoViewIfNeeded(true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.choose-address-wrap {
  height: 100%;
  display: flex;
  flex-flow: column;
  .title {
    font-size: 36px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .content {
    flex: 1;
    display: flex;

    flex-flow: column;
    .nav-wrap {
      height: 90px;
      overflow-x: auto;
      overflow-y: hidden;
      .navbar {
        height: inherit;
        background: #f8f8f8;
        font-size: 0;
        display: inline-block;
        min-width: 100%;
        white-space: nowrap;
        vertical-align: top;
        li:last-child{
          margin-right:54px;
        }
        .nav-item {
          position: relative;
          display: inline-block;
          margin-left: 54px;
          font-size: 30px;
          line-height: 90px;
        }
        .active {
          color: $font-active-cls;
          &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border: 2px solid $font-active-cls;
          }
        }
      }
    }
    .inner-wrap {
      flex: 1;
      display: flex;
      flex-flow: column;
      height: 0;
      .inner-title {
        height: 80px;
        font-size: 26px;
        line-height: 4;
        color: #999;
        margin-left: 30px;
      }
      .inner-content {
        flex: 1;
        margin: 0 22px;
        overflow: auto;
        scroll-behavior: smooth;
        /deep/ .van-cell__title {
          font-size: 30px;
        }
        .active-icon {
          color: $font-active-cls;
        }
        .choose-cell {
          background: #f8f8f8;
        }
      }
    }
  }
}
</style>