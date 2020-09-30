<template>
  <div class="home">
    <!-- <img alt="Vue logo" class="bottom-button" src="../assets/logo.png" v-click-outside='vcoConfig'> -->
    <p class="img-wrap"></p>
   <p class="text-wrap">网页走丢了...</p>
  </div>
</template>
<script>

export default {
  name: 'Home',

  data() {
    return {
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
        // Note: The default value is true, but in case you want to activate / deactivate
        //       this directive dynamically use this attribute.
        isActive: true
      }
    }
  },
  created() {

    console.log(this.$http)
    console.log(this.$utils.dateFormat('', 'yy-MM-dd'))
  },
  methods: {

    handler() {
    },
    middleware(event) {
      return event.target.className !== 'modal'
    }
  }
}

</script>
<style lang='scss'>
body {
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}

.home{
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .img-wrap{
    width:72px;
    height:72px;
    margin:0 0 40px;
    content:-webkit-image-set(
      url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAENJREFUeF7tzbEJACEQRNGBLeAasBCza2lLEGx0CxFGG9hBMDDxRy/72O9FMnIFapGylsu1fgoBdkXfUHLrQgdfrlJN1BdYBjQQm3UAAAAASUVORK5CYII=) 1x,
      url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQMAAADdiHD7AAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAFJJREFUeF7t0cENgDAMQ9FwYgxG6WjpaIzCCAxQxVggFuDiCvlLOeRdHR9yzjncHVoq3npu+wQUrUuJHylSTmBaespJyJQoObUeyxDQb3bEm5Au81c0pSCD8HYAAAAASUVORK5CYII=) 2x);
  }
  .text-wrap{
    color:#000;
    font-weight: 500;
    font-size:46px;
  }
}

@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
  .bottom-button {
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
}

</style>
