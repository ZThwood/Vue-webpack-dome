<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll ">
          <!-- 点击时触发，但是在web手机端，clikc会有200-300ms的延时，所以要用tap代替click作为点击事件 -->
          <span 
            :class="[ 'mui-control-item',item.id === 0 ? 'mui-active':'' ]"
            v-for="item in phototype"
            :key="item.id"
            @tap="getPhotoByCategory(item.id)"
          >{{ item.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- 图片区域 -->
    <ul class="lazy">
      <router-link :to="'/home/photos/'+ item.id" v-for="item in photolist" :key="item.id" tag="li" >
        <!-- lazy加载的图片区域 -->
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-content" v-html="item.content"></div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
//顶部滑动组件需要引入js文件初始化
import mui from "../../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      phototype: [],
      photolist: []
    };
  },
  created () {
    this.getPhotoType();
    this.getPhotoByCategory(0);
  },
  methods: {
    async getPhotoType () {
      const { data } = await this.$http.get("/api/getimgcategory");
        // 添加到开头
      if (data.status === 0)
        data.message.unshift({
          title: "全部",
          id: 0
        });
      this.phototype = data.message;
    },
    async getPhotoByCategory (id) {
      const { data } = await this.$http.get("/api/getimages/" + id);
      // console.log(data);
      if (data.status === 0) return (this.photolist = data.message);
    }
  },
  //如果要引入第三方插件最好在mounted中引入
  mounted () {
    mui(".mui-scroll-wrapper").scroll({ //mui导航栏滚动效果
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>
<style lang="scss" scoped>
.mui-slider {
  touch-action: none;
}
.lazy {
  background: #fff;
  margin: 0;
  padding: 10px 10px 0px;
  li {
    list-style: none;
    text-align: center;
    position: relative;
    & + li {
      padding-top: 10px;
    }
    
    img {
      width: 100%;
      vertical-align: middle;
      box-shadow: 2px -1px 5px 0px #808080;
    }
    .info {
      position: absolute;
      left: 0;
      bottom: 0px;
      color: azure;
      text-align: left;
      background-color: rgba(0,0,0,0.5);
      max-height: 90px;
      overflow: hidden;
      .info-title {
        font-size: 15px;
      }
      .info-content {
        font-size: 12px;
        
      }
    }
  }
  img[lazy=loading] { //懒加载
  width: 40px;
  height: 300px;
  margin: auto;
}
}
</style>