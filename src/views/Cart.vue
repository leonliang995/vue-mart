<template>
  <div>
    <div class="goods" v-for="(item,index) in cart" :key="item.id">
      {{item.title}}
      <div class="right">
        <i class="cubeic-remove" @click="remove(index)"></i>
        <span>{{item.cartCount}}</span>
        <i class="cubeic-add" @click="add(index)"></i>
      </div>
    </div>
    <div>总价：{{total}}</div>
    <cube-button :disable="true" v-if="total<mintotal">还差{{mintotal-total}}元可以购买</cube-button>
    <cube-button v-else>
      下单<span v-if="!isLogin">(需要登录)</span>
    </cube-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data () {
    return {
      mintotal: 1000
    };
  },
  computed: {
    ...mapState({
      cart: state => state.cart.list,
      isLogin: state => state.user.isLogin
    }),
    ...mapGetters(["total"])
  },
  methods: {
    remove (index) {
      console.log(index);
      this.$state.commit("cartRemove", index);
    },
    add (index) {
      this.$state.commit("cartAdd", index);
    }
  }
}
</script>

<style lang="stylus" >
.goods {
  padding: 10px;
  text-align: left;

  .right {
    float: right;
  }

  i {
    font-size: 18px;
  }
}
</style>