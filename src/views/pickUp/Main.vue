<template>
  <div class="main-page">
    <transition :name="transitionName" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
export default {
  name: "PickUpMain",
  data() {
    return {};
  },

  mounted() {
    let me = this;
  },

  methods: {
    enter() {},
    leave() {},
    beforeEnter() {}
  }
};
</script>
