import us from "@/service/user"//us->userservice

export default {
  state: {
    isLogin: !!localStorage.getItem('token')
  },
  mutations: {
    setLoginState (state, val) {
      state.isLogin = val;
    }
  },
  actions: {
    login (store, userInfo) {
      console.log(store);
      return us.login(userInfo).then(({ token }) => {
        if (token) {
          //code,token
          store.commit('setLoginState', true);
          localStorage.setItem('token', token);
          return true;
        }
        return false
      })
    },
    logout ({ commit }) {
      //清空
      localStorage.removeItem('token');
      commit('setLoginState', false);
    }

  }
}