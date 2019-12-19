<template>
  <div id="app">
    <transition name="route-move">
      <router-view class="child-view" />
    </transition>
    <!-- tabBar -->
    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHandler">
      <!-- v-model是指定选中哪个tab -->
      <cube-tab v-for="(item,index) in tabs" :key="index" :icon="item.icon" :label="item.value">
        <div>{{item.label}}</div>
        <span :disable="true" class="badge" v-if="item.label=='Cart'&&cartTotal!=0">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      selectLabel: '/',
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home"
        },
        {
          label: "Cart",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "Me",
          value: "/about",
          icon: "cubeic-person"
        }
      ]
    }
  },
  created () {
    //避免页面刷新丢失当前状态
    this.selectLabel = this.$route.path;
  },
  watch: {
    $route (route) {
      //监听路由变化并动态设置页签选中状态
      this.selectLabel = route.path;
    }
  },
  methods: {
    changeHandler (val) {
      this.$router.push(val);
    }
  },
  computed: {
    ...mapGetters(["cartTotal"])
  }

}
</script>
<style lang="stylus">
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #edf0f4;
}

.cube-tab-bar-slider {
  top: 0;
}

.cube-tab {
  position: relative;
}

span.badge {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px;
  min-width: 16px;
  min-height: 16px;
  position: absolute;
  right: 25%;
  top: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
