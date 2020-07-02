<template>
  <div>
    <!-- 轮播图区 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in lunbotu" :key="index">
        <img :src="item.img" class="swipe-size" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 图标grid -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/news">
            <span class="mui-icon mui-icon-extra mui-icon-extra-new"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photos">
            <span class="mui-icon mui-icon-image">
              <span class="mui-badge">5</span>
            </span>
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
            <div class="mui-media-body">商品购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-compose"></span>
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-videocam"></span>
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lunbotu: []
    };
  },
  created() {
    this.getLunbo();
  },
  methods: {
    async getLunbo() {
      const { data } = await this.$http.get("/api/getlunbo");
      console.log(data);
      if (data.status === 0) this.lunbotu = data.message;
    }
  }
};
</script>
<style lang="scss">
.mint-swipe {
  height: 180px;
}
.mint-swipe-item {
  &:nth-child(1) {
    background-color: aqua;
  }
  &:nth-child(2) {
    background-color: pink;
  }
  &:nth-child(3) {
    background-color: hotpink;
  }
}
.swipe-size {
  width: 100%;
  height: 100%;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
</style>