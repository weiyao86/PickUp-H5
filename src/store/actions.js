
export default {
  //热门城市,全国城市
  getCardStatus(ctx, data) {
    ctx.commit('initAllCities', data);
  }
}
