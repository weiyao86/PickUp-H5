<template>
  <div id="app">
     <transition :name="transitionName" @leave="leave" @enter="enter">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
     <!-- <side-nav v-if="$route.meta.isNavBar"></side-nav> -->
  </div>
</template>
<script>
import SideNav from '@components/SideNav';
export default ({
  name: 'App',
  components:{
    SideNav
  },
  created(){},
  methods:{
    enter(){
    },
    leave(){
    }
  }

})

</script>
<style lang="scss">
#app {
  height:inherit;
  font-family:'PingFang SC', -apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
  color:$text-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


</style>
