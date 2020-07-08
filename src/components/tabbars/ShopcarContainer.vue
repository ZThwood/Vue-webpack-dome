<template>
  <div class="shopcar-container">
    <!-- 商品清单 -->
    <div class="goods-list" >
      <!-- 卡片 -->
      <div class="mui-card" v-for="item in shopcarlist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goods-item">
            <!-- mint按钮 -->
            <mt-switch v-model="selectObj[item.id]" @change="changeSelect(item.id, selectObj[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt />

            <div class="info">
              <h1>{{item.title}}</h1>
              <div class="price-num">
                <span>￥{{item.sell_price}}</span>
                <!-- countObj[item.id]表示商品对应的数量 -->
                <shopcar-numberbox :initcount="countObj[item.id]" :id="item.id"></shopcar-numberbox>
                <a href="#" @click.prevent="del(item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner settlement">
          <div class="left">
            <p>总价（不含运费）</p>
            <p>
              已勾选商品
              <span class="danger">{{selectedCount}}</span>件，总价
              <span class="danger">￥{{amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import shopcarNumberbox from "../subComponents/shopcar_numberbox.vue";
// 导入映射
import { mapGetters, mapMutations} from "vuex"
export default {
  data() {
    return {
      shopcarlist: []
    };
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      if (this.idstr.length <= 0) return;
      const { data } = await this.$http.get('/api/goods/getshopcarlist/' + this.idstr)
      if (data.status === 0) return this.shopcarlist = data.message
      
    },
   del (id) {
      this.shopcarlist.some((item, i) => {
        if (item.id == id) {
          this.shopcarlist.splice(i, 1);
          return true 
        }
      })
      this.delFromCart(id) 
    },
    changeSelect (id, select) {
      // console.log(id+'-----'+select);
        this.changeSelectState({
          id:id,
          selected:select
          })
    },
    ...mapMutations(["delFromCart","changeSelectState"])
  },
  computed: {
    ...mapGetters(["idstr","countObj","selectObj","selectedCount","amount"])
  },
  components: {
    shopcarNumberbox
  }
};
</script>
<style lang="scss">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-item {
    display: flex;
    justify-content: space-between;
    img {
      width: 40px;
      height: 40px;
      align-items: center;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h1 {
        font-size: 13px;
      }
      .price-num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
  .settlement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .danger {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
  }
  
}
</style>