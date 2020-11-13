<template>
  <div>
    <empty :type="1" :remark="remark"></empty>
  </div>
</template>
<script>
import Empty from "@components/Empty";
export default {
  name: "QrError",
  components: {
    Empty
  },
  data() {
    return {
      queryParams: {},
      remark: "访问错误</br>"
    };
  },
  created() {
    let me = this;
    
    me.queryParams = me.$route.query;
    if (me.queryParams.msg) {
      me.remark += me.queryParams.msg;
    }
  }
};
</script>