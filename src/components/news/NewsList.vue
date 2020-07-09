<template>
  <div>
    <ul class="mui-table-view" v-for="(item, index) in newslist" :key="index">
      <li class="mui-table-view-cell mui-media">
        <router-link :to="'/home/news/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
                <!-- 使用过滤器过滤时间格式 -->
              <span>发表时间:{{ item.add_time | dateFormat('YYYY-MM-DD') }}</span>
              <span>点击数:{{ item.click }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newslist: []
    };
  },
  created () {
    this.getNewsList();
  },
  methods: {
    async getNewsList () {
      //获取数据
      const { data } = await this.$http.get("/api/getnewslist");
      // console.log(data);
      if (data.status === 0) this.newslist = data.message;
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-media-body {
  h1 {
    font-size: 14px;
  } 
  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
  }
}
</style>