<template>
  <div>
    <h1 class="titlehead">{{newsinfo.title}}</h1>
    <p class="info">
      <!-- 使用过滤器过滤时间格式 -->
      <span>发表时间:{{newsinfo.add_time | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
      <span>点击数:{{newsinfo.click}}</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 使用评论组件 -->
    <!-- 可以直接使用props的值来传给子组件 -->
    <comment v-bind:newsid="id"></comment>
  </div>
</template>
<script>
// 导入评论组件
import comment from '../subComponents/Comment.vue'

export default {
  data() {
    return {
      newsinfo: {}
    };
  },
  props: ["id"],  //接受父组件传过来的id  
  methods: {
    async getNewsinfo() {
      const { data } = await this.$http.get("/api/getnew/" + this.id);
      // console.log(data);

      if (data.status === 0) return (this.newsinfo = data.message[0]);
    }
  },
  created() {
    this.getNewsinfo();
  },
  components: {
    // 注册组件
    comment
  }
};
</script>
<style lang="scss" scoped>
div {
  margin: 10px;
  .titlehead {
    font-size: 24px;
    padding: 13px 0;
    // text-align: center;
  }
  .info {
    color: black;
    
  }
}
</style>