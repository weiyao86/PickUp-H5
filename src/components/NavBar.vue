<template>
  <van-nav-bar :title="title" :left-text="leftText" :right-text="rightText" @click.preventDefault @click-left="clickLeft" :fixed="fixed" :placeholder="placeholder" :border="border" :left-arrow='leftArrow'>
    <template v-if="writeTitle" #title>
      <slot name="over-write">{{title}}</slot>
    </template>
    <template v-if="writeLeft" #left>
      <slot name="over-write-left">{{leftText}}</slot>
    </template>
    <template v-if="writeRight" #right>
      <slot name="over-write-right">{{rightText}}</slot>
    </template>
  </van-nav-bar>
</template>
<script>
import {
  NavBar
} from 'vant';

export default ({
  name: 'NavBar',
  props: {
    'title': {
      type: String,
      default: function(v) {
        return this.$route.meta.title;
      }
    },
    'leftText': {
      type: String,
      dafault: '返回'
    },
    'rightText': {
      type: String,
      dafault: '按钮'
    },
    'leftArrow': {
      type: Boolean,
      default: true
    },
    'border': {
      default: true
    },
    'placeholder': {
      default: false
    },
    'fixed':{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      writeTitle: false,
      writeLeft: false,
      writeRight: false
    }

  },
  components: {
    [NavBar.name]: NavBar
  },

  mounted() {
    let me = this;

    if (me.$slots['over-write']) {
      me.writeTitle = true;
    }
    if (me.$slots['over-write-left']) {
      me.writeLeft = true;
    }
    if (me.$slots['over-write-right']) {
      me.writeRight = true;
    }
  },
  methods: {

    clickLeft() {

      this.$router ? this.$router.back() : window.history.back();
    }
  }
});

</script>
