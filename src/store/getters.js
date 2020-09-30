export default {
  getCurrentCity(state) {
    return state.movieAreaType == 1 ? state.cityName : state.currentCountryCity;
  }
}
