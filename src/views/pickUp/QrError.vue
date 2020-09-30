<template>
    <div>
        <empty :type="1" :remark="remark"></empty>
    </div>
</template>
<script>
import Empty from "@components/Empty";
export default {
    name:'QrError',
    components:{
        Empty
    },
    data() {
    return {
      remark: "访问错误</br>请同意微信授权"
    };
  },
}
</script>