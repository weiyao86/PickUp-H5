<template>
  <div class="detail-wrap">
    <section class="content-wrap list">
      <ul id="empty_list" v-if="details.goods && details.goods.length">
        <li class="categroy-item" v-for="(item, idx) in details.goods" :key="idx"  @click="onSelectRow(item)">
          <div class="inner-wrap">
            <div class="inner-item">
              <div @click.stop class="ck-wrap"><van-checkbox class="check" v-model="item.checked" @click="onChoose(item)"></van-checkbox></div>
              <div class="title-wrap">{{item.goods_name}}</div>
              <div class="text-wrap">
                <p class="title"><span class="symbol">￥</span>{{item.goods_price}}</p>
                <p class="spec-wrap">数量:{{item.goods_num}}</p>
              </div>
            </div>
          </div>
          <div class="footer-total">
             <span class="remark">备注: {{item.explain || "无"}}</span>
            <van-button class="btn-item" @click.stop="onDel(item)" plain>删除</van-button>
          </div>
        </li>
        <li class="last-item"><span class="txt-item">运费:</span><span class="txt-item">{{shippingAmount}}</span></li>
      </ul>
      <div class="no-data" v-else>
        <van-empty class="custom-image" description="没有商品">
          <template #image>
            <van-icon name="bag" />
          </template>
        </van-empty>
      </div>
    </section>

    <van-submit-bar :price="totalPrice*100" button-text="立即下单" :disabled="enabled" @submit="onSubmit" class="submit-btn" safe-area-inset-bottom>
      <div class="text-price-wrap">余额: <span class="price">{{details.card || 0}}</span></div>
    </van-submit-bar>
  </div>
</template>

<script src="@assets/js/pickUp/detail.js"></script>
<style lang="scss" src="@assets/styles/pickUp/detail.scss" scoped />