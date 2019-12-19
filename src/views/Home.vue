<template>
  <div class="home">
    <k-header title="购物吧">

    </k-header>
    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="2000">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class="slider" :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <!-- 商品列表 -->
    <good-list :data="goods" @CartAnim="startCartAnim($event)"></good-list>
    <!-- 动画组件 -->
    <!-- <cart-anim ref="ca"></cart-anim> -->
  </div>
</template>

<script>
import gs from "@/service/goods"
import GoodList from "@/components/GoodList"
import CartAnim from "@/components/CartAnim"
import KHeader from "@/components/KHeader"

export default {
  name: 'home',
  components: {
    GoodList, KHeader
  },
  data () {
    return {
      slider: [],
      goodsInfo: {},
      keys: []
    }
  },
  methods: {
    startCartAnim (el) {
      // const anim = this.$createCartAnim({
      //   onTransitionend () {
      //     anim.remove();//cubeui自带的方法
      //   }
      // });
      // anim.start(el);

      //使用简易create
      const anim = this.$create(CartAnim);
      anim.start(el);
      anim.$on("transitionend", anim.remove);
    }
  },
  computed: {
    goods () {
      return this.keys.flatMap(key => this.goodsInfo[key]);
    }
  },
  created () {
    gs.getGoodsInfo().then(data => {
      if (data) {
        this.slider = data.slider;
        this.goodsInfo = data.goodsInfo;
        this.keys = data.keys;
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
  height: auto;
}
</style>
