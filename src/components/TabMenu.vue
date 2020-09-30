<template>
  <van-tabbar v-model="active" fixed route>
    <van-tabbar-item replace to="/main/movie">
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? icon.active[0] : icon.inactive[0]" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/main/cinema">
      <span>影院</span>
      <template #icon="props">
        <img :src="props.active ? icon.active[1] : icon.inactive[1]" />
      </template></van-tabbar-item>
    <van-tabbar-item class="animate__animated animate__heartBeat" to="/main/scan">
      <span>扫码</span>
      <template #icon="props">
        <img :src="props.active ? icon.active[2] : icon.inactive[2]" />
      </template></van-tabbar-item>
    <van-tabbar-item to="/main/My">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? icon.active[3] : icon.inactive[3]" />
      </template></van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default ({
  name: 'TabFootMenu',
  data() {
    return {
      active: 0,
      icon: {
        inactive: [
          require("@assets/images/tab-bar-icon/home.png"),
          require("@assets/images/tab-bar-icon/category.png"),
          require("@assets/images/tab-bar-icon/scan.png"),
          require("@assets/images/tab-bar-icon/me.png")
        ],
        active: [require("@assets/images/tab-bar-icon/home_active.png"),
          require("@assets/images/tab-bar-icon/category_active.png"),
          require("@assets/images/tab-bar-icon/scan.png"),
          require("@assets/images/tab-bar-icon/me_active.png")
        ]
      }
    }
  }
})

</script>
