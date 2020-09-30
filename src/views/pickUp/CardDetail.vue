<template>
  <div class="cart-detail-wrap">
     <nav-bar></nav-bar>
    <section class="content-wrap list">
      <p class="card-title van-hairline--bottom">
        <span class="label">提货单</span><span class="card-no">{{ orderDetail.order_sn }}</span>
      </p>
      <ul id="empty_list">
        <li class="categroy-item van-hairline--bottom" v-for="(item, idx) in goodsList" :key="idx">
          <div class="inner-wrap">
            <div class="inner-item">
              <div class="title-wrap">{{ item.goods_name }}</div>
              <div class="text-wrap">
                <p class="title"><span class="symbol">￥</span>{{ item.goods_price }}</p>
                <p class="spec-wrap">数量:{{ item.goods_num }}</p>
              </div>
            </div>
          </div>
        </li>
        <li class="last-item van-hairline--bottom">
          <span class="txt-item">运费:</span><span class="txt-item">{{ orderDetail.shipping_amount }}</span>
        </li>
        <li class="last-item">
          <span class="txt-item">总额:</span><span class="txt-item">{{ orderDetail.total_amount }}</span>
        </li>
      </ul>
      <div class="user-info">
        <p class="label-title">收货信息</p>
        <p class="label-name">{{ orderDetail.reciever }}</p>
        <p class="label-name">{{ orderDetail.mobile }}</p>
        <p class="label-area">{{ orderDetail.address }}</p>
      </div>
    </section>
    <div class="btns-wrap" v-safe-area-inset-bottom>
      <van-button type="primary" size="large" class="submit-btn" @click="onSubmit" v-if="showBtn">{{btnText}}</van-button>
    </div>
  </div>
</template>

<script src="@assets/js/pickUp/cardDetail.js"></script>
<style lang="scss" src="@assets/styles/pickUp/cardDetail.scss" scoped />