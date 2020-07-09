<template>
  <div>
    <div class="goods-list">
      <router-link :to="'/home/goods/' + item.id" class="goods-item" v-for="(item, index) in goodslist" :key="index" tag="div">
        <div class="images">
          <img :src="item.img_url" alt />
        </div>
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
          <p class="price">
            <span class="new">{{ item.sell_price }}</span>
            <span class="old">{{ item.market_price }}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
          </p>
        </div>
      </router-link>
    </div>

    <mt-button type="danger" size="large" plain @click="loadMore" v-show="isloaded">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      goodslist: [],
      isloaded: true 
    };
  },
  methods: {
    async getGoodsListByPage () {
      const { data } = await this.$http.get(
        "/api/getgoods?pageindex=" + this.page
      );
      // console.log(data);
      // concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
      //old_array.concat(value1[, value2[, ...[, valueN]]])
      if (data.status === 0) {
        
        if (data.message.length <= 0) {
          this.isloaded = false;
        }
        this.goodslist = this.goodslist.concat(data.message)
      }
    },
    loadMore () {
      //点击按钮获取更多的评论
      //让pageindex + 1之后，再调用getCommentByPageff
      // if (this.isloaded) return;
      this.page++;
      this.getGoodsListByPage();
    }
  },
  created () {
    this.getGoodsListByPage();
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 6px;
  padding-top: 0;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    margin-top: 6px;
    box-shadow: 0 0 7px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;  
    .images {
      height: 165px;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 14px;
      // height: 40px;
    }
    .info {
      background-color: #eee;
      overflow: hidden;
      p {
        margin: 3px;
      }
      .price {
        .new {
          color: red;
          font-size: 16px;
          font-weight: 700;
          margin-right: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>