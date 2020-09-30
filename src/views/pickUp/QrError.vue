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
      remark: "访问错误</br>请检查二维码是否正确"
    };
  },
}
</script>