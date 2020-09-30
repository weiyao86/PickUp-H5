<template>
  <div class="card-list-wrap">
    <nav-bar></nav-bar>
    <mescroll-vue class="content-wrap list" :down="mescrollDown" :up="mescrollUp" ref="mescroll" @init="mescrollInit">
      <ul id="empty_list" class="goods-list">
        <li class="goods-item" v-for="item in cardList" :key="item.id" @click="onRedirectDetail(item)">
          <p class="title van-hairline--bottom">
            <span class="label">提货单</span><span class="card-no">{{ item.order_sn }}</span
            ><span class="status">{{ item.order_status | getTextByStatus }}</span>
          </p>

          <div class="footer-total">
            <span class="sn-text van-ellipsis">{{ (item.createtime * 1000) | dateFormat("yyyy-MM-dd hh:mm:ss") }}</span>
            <div class="btns-wrap" @click.stop>
              <van-button class="btn-item" plain v-if="isShowBtn(item, 1)" @click="onBuyNow(item)">立即支付</van-button>
              <van-button class="btn-item" plain v-if="isShowBtn(item, 2)" @click="onCancel(item)">取消</van-button>
              <van-button class="btn-item" plain v-if="isShowBtn(item, 3)" @click="onSearchLogistics(item)">查询物流</van-button>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>
        
<script src="@assets/js/pickUp/cardList.js"></script>
<style lang="scss" src="@assets/styles/pickUp/cardList.scss" scoped />