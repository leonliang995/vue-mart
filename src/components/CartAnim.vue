<template>
  <div class="ball-wrap">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="show">
        <div class="inner">
          <div class="cubeic-add"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "cartAnim",
  data () {
    return {
      show: false
    }
  },
  methods: {
    //外部启动动画接口，传递点击按钮元素
    start (el) {
      this.el = el;
      //使ball显示，激活动画钩子
      this.show = true;
    },
    beforeEnter (el) {
      //获取start传进来的el的位置
      const rect = this.el.getBoundingClientRect();
      const x = rect.left - window.innerWidth / 2;
      const y = -(window.innerHeight - rect.top - 20 - 10);
      //移动本组件中的小球
      el.style.transform = `translate3d(0,${y}px,0)`;
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(${x}px,0,0)`;
    },
    enter (el, done) {
      //触发重绘，位置变化产生动画
      document.body.offsetHeight;
      //恢复原位置
      el.style.transform = `translate3d(0,0,0)`;
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(0,0,0)`;
      //监听动画结束
      el.addEventListener("transitionend", done)
    },
    afterEnter (el) {
      //清理
      this.show = false;
      el.style.display = "none";
      this.$emit("transitionend");
    }
  }
}
</script>

<style lang="stylus" >
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 100000;
    color: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      transition: all 0.5s linear;

      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>