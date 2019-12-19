import axios from 'axios';
export default {
  getGoodsInfo () {
    return axios.get("/api/goods").then(res => {
      const { code, slider, data: goodsInfo, keys } = res.data;
      if (code) {
        return { slider, goodsInfo, keys };
      } else {
        return null;
      }
    })
  }
}