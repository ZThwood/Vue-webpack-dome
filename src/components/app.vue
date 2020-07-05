<template>
  <div class="app-container">
    <!-- <mt-header fixed title="fixed top"></mt-header> -->
    <mt-header title="他大姨妈" fixed>
      <span slot="left" @click="goBack" v-show="isHome">
        <mt-button icon="back">返回</mt-button>
      </span>
      <mt-button icon="more" slot="right" v-show="isHome"></mt-button>
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="my-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="my-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="my-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">9</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="my-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHome:true
    }
  },
  methods: {
    goBack () {
        this.$router.go(-1)
    }
  },
  created () {
    if (this.$route.path === '/home') {
        this.isHome = false
      } else {
        this.isHome = true
      }
  },
  watch:{
    "$route.path": function (newVal, oldVal) {
      if (newVal === '/home') {
        this.isHome = false
      } else {
        this.isHome = true
      }
    }
  }
};
</script>
∥/这里写的样式,要符合scss语法,并且,样式是当前组件私有的,不会成为全局的样式,也不会应用给子组件
<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;

  //当有组件切换动效的时候，切换的时候页面会同时存在两个组件并把页面撑大
  //造成了根组件上下部分重新拉动条，把超出隐藏即可
  overflow: hidden;

  .myhead {
   
    z-index: 999;
    width: 100%;
  }
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
.mui-bar-tab .my-tab-item.mui-active {
    color: #007aff;
}
.mui-bar-tab .my-tab-item {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .my-tab-item .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .my-tab-item .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>