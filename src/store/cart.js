export default {
  state: {
    //购物车初始状态
    list: JSON.parse(localStorage.getItem("cart")) || []
  },
  mutations: {
    //添加到购物车
    addCart (state, item) {
      const good = state.list.find(v => v.title == item.title);
      if (good) {
        good.cartCount += 1;
      } else {
        state.list.push({
          ...item,
          cartCount: 1
        })
      }
    },
    //购物车商品减1
    cartRemove (state, index) {
      if (state.list[index].cartCount > 1) {
        state.list[index].cartCount -= 1;
      }
    },
    // 购物车商品加1
    cartAdd (state, index) {
      state.list[index].cartCount += 1;
    }
  },
  //相当于全局的计算属性
  getters: {
    //商品总数
    cartTotal: state => {
      let num = 0;
      state.list.forEach(v => {
        num += v.cartCount;
      });
      return num;
    },
    //商品总价
    total: state => {
      return state.list.reduce(
        (total, item) => total + item.cartCount * item.price,
        0
      );
    }
  }
}