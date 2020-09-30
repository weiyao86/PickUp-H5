 <template>
  <div class="auth-wrap">
    <nav-bar></nav-bar>
    <div class="wrap">
     
      <van-form @submit="onSubmit" ref="form" validate-first>
        <van-field class="cell-custom-item" label="商品序号" maxlength="30" v-model="getGoodsCode" placeholder="请输入商品序号" :rules="[{ required: true}]" clearable> </van-field>
        <van-field class="cell-custom-item" label="数量" maxlength="16" v-model="goodsNum" type="number" placeholder="请输入商品数量" :rules="[{ required: true}]" clearable> </van-field>
       
        <van-button type="primary" size="large" :disabled="canSubmit" class="submit-btn">加入提货单</van-button>
      </van-form>
    </div>
  </div>
</template>

<script src="@assets/js/pickUp/addGoods.js"></script>
<style lang="scss" src="@assets/styles/pickUp/addGoods.scss" scoped />