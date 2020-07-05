<template>
  <div>
    <h1 class="titlehead">{{imageinfolist.title}}</h1>
    <p class="info">
      <!-- 使用过滤器过滤时间格式 -->
      <span>发表时间:{{imageinfolist.add_time | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
      <span>点击数:{{imageinfolist.click}}</span>
    </p>
    <hr />
    <!-- <ul class="thumbimg">
      <li v-for="(item, index) in thumbimg" :key="index">
        <img :src="item.src" alt="" data-preview-src="" data-preview-group="1">
      </li>
    </ul>-->
    <div class="thumbs">
       <vue-preview :slides="thumbimg" @close="handleClose"></vue-preview>
    </div>
   
    <div class="content" v-html="imageinfolist.content"></div>


    <!-- 使用评论组件 -->
    <!-- 可以直接使用props的值来传给子组件 -->
    <comment v-bind:newsid="id"></comment>
  </div>
</template>
<script>
import comment from "../subComponents/Comment.vue";
// import '../../../lib/mui/js/mui.previewimage.js'

export default {
  data() {
    return {
      imageinfolist: {},
      thumbimg: []
    };
  },
  methods: {
    async getImageInfo() {
      const { data } = await this.$http.get("/api/getimageInfo/" + this.id);
      // console.log(data)
      if (data.status === 0) return (this.imageinfolist = data.message[0]);
    },
    async getThumbImg() {
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      console.log(data);
      if (data.status === 0) {
        data.message.forEach(item => {
          item.w = 600;
          item.h = 400;
          item.msrc=item.src;  //关键点，赋值给它
        });
      }
      this.thumbimg = data.message;
    },
    handleClose() {
      console.log("close event");
    }
  },
  props: ["id"],
  created() {
    this.getImageInfo();
    this.getThumbImg();
  },
  components: {
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
    span {
      color: #808080;
    }
  }
  .content {
    font-size: 16px;
    padding: 13px 0;
  }
  .thumbs{
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 30%;  
                  margin: 5px; 
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        }
}
</style>