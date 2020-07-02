<template>
  <div class="app-container">
    <!-- <mt-header fixed title="fixed top"></mt-header> -->
    <mt-header title="他大姨妈">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">9</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
∥/这里写的样式,要符合scss语法,并且,样式是当前组件私有的,不会成为全局的样式,也不会应用给子组件
<style lang="scss" scoped>
.app-container {
  // padding-top: 40px;
  //当有组件切换动效的时候，切换的时候页面会同时存在两个组件并把页面撑大
  //造成了根组件上下部分重新拉动条，把超出隐藏即可
  overflow: hidden;
  margin-bottom: 50px;
}

// 切换动画
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

/* v-enter-active入场动画的时间段 */
/* v-leave-active离场动画的时间段 */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

</style>