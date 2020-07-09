<template>
  <div class="goodsinfo-container">
    <!-- 实现半场动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
      <swiper :lunbotuname="lunbotu" :imgpath="'src'"></swiper>
    </div>

    <!-- 商品区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <span style="margin-right:10px">
              <del>￥{{ goodsinfo.market_price }}</del>
            </span>
            销售价:
            <span
              style="font-size:16px;color:red;font-weight:700;"
            >￥{{ goodsinfo.sell_price }}</span>
          </p>

          <p>
            购买数量:
            <span>
              <!-- * 由于 goodsin是通过Aax动态获取回来的,但是,Ajax是异步请求,需要消耗时间
                因此,可能会导致这样的情况: bobo组件先于Ajax渲染出来,此时,组件被渲染的时
              goodsinfo为空对象,因此,传递到子组件中的 stock quantity是 undefined */-->
              <numberbox :numMax="goodsinfo.stock_quantity" @func="getNumberBoxValue"></numberbox>
            </span>
          </p>
          <div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat('YYYY-MM-DD hh-mm-ss') }}</p>
        </div>
      </div>
      <div class="mui-card-footer btnarea">
        <!-- 使用编程式导航,点击跳转 -->
        <mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>

        <mt-button type="danger" size="large" plain @click="goCom">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subComponents/Swipe.vue";
import numberbox from "../subComponents/numberBox.vue";

// mapMutations
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      lunbotu: [],
      goodsinfo: {},
      flag: false,
      selectedCount: 1 //用户现在的商品购买数量
    };
  },
  props: ["id"],
  methods: {
    ...mapMutations(["addToCar"]),
    async getlunbotu () {
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      if (data.status === 0) return (this.lunbotu = data.message);
    },
    async getGoodsInfo () {
      const { data } = await this.$http.get("/api/goods/getinfo/" + this.id);
      if (data.status === 0) return (this.goodsinfo = data.message[0]);
    },
    goDesc () {
      this.$router.push("/home/goods/goodsdesc/" + this.id);
    },
    goCom () {
      this.$router.push({ name: "goodscmt", params: { id: this.id } });
    },
    
    addToCart () {
      this.flag = !this.flag;
      // this.$store.commit("addToCar", {
      //   id: this.id,
      //   count: this.selectedCount
      // })
      this.addToCar({
        id: this.id,
        count: this.selectedCount,
        // 默认购物车开关 选择状态
        selected:true,
        price:this.goodsinfo.sell_price
      });
    },

    // 半场动画
    beforeEnter (el) {
      el.style.transform = "translate(0, 0)";
    },
    enter (el, done) {
      // 获取小球坐标
      const ballPos = el.getBoundingClientRect();
      // console.log(ballPos);
      const badgePos = document.getElementById("badge").getBoundingClientRect();
      // console.log(badgePos);
      const left = badgePos.left - ballPos.left + "px";
      const top = badgePos.top - ballPos.top + "px";

      //没有这个会没有过渡效果
      el.offsetWidth;
      // 设置结束后的位置
      el.style.transform = "translate(" + left + ", " + top + ")";
      //设置过渡
      el.style.transition = "all 0.5s cubic-bezier(.46,-0.4,1,.49)";
      //done() 是afterEnter(el)函数的引用，用于动画结束后立刻消失
      done ();
    },
    afterEnter (el) {
      this.flag = !this.flag;
    },

    //获取子组件传过来的值
    getNumberBoxValue (val) {
      console.log(val);
      this.selectedCount = val;
    }
  },
  created () {
    this.getlunbotu();
    this.getGoodsInfo();
  },
  components: {
    swiper,
    numberbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  position: relative;
  background-color: #eee;
  // 塌陷了
  overflow: hidden;
  .btnarea {
    flex-direction: column;
    // 排除第一个选中后一个
    button + button {
      margin-top: 10px;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    background-color: #ef4f4f;
    border-radius: 50%;
    position: absolute;
    top: 300px;
    left: 143px;
    z-index: 99;
  }
}
</style>