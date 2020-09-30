<template>
  <div class="confirm-address-wrap">
    <nav-bar></nav-bar>
    <section class="content-wrap list">
      
      <van-form @submit="onSubmit" class="address-info" ref="form" validate-first>
        <van-field class="cell-custom-item" label="收货人" placeholder="请填写收货人姓名" v-model="name" :rules="[{ required: true }]" center clearable> </van-field>
        <van-field class="cell-custom-item" label="手机号" placeholder="请填写收货人手机号" v-model="tel" type="tel" name="tel" :rules="[{ required: true, pattern: /1[3-9]\d{9}$/, message: '请正确输入手机号' }]" center clearable> </van-field>
        <van-field class="cell-custom-item" label="所在地区" placeholder="省市区县、乡镇等" v-model="address" readonly is-link center @click="onShowPopup"> </van-field>
        <van-field class="cell-custom-item" label="详细地址" placeholder="街道、楼牌号等" v-model="desc" :rules="[{ required: true }]" center clearable> </van-field>
        <div class="btns-wrap">
          <van-button type="primary" size="large" class="submit-btn">确认提货</van-button>
        </div>
      </van-form>
      <van-popup  v-model="showPopup" @opened="opendAfter" lock-scroll safe-area-inset-bottom round position="bottom" close-icon-position="top-right" :style="{height:'70%'}" closeable>
        <choose-address ref="addressCmp" :selectArea="addressList" @chooseAddressAfter="chooseAddressAfter"></choose-address>
    </van-popup>
    </section>
  </div>
</template>

<script src="@assets/js/pickUp/confirmAddress.js"></script>
<style lang="scss" src="@assets/styles/pickUp/confirmAddress.scss" scoped />