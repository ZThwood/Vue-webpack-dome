//商品详情
<template>
  <div class="decs-container">
    <h1 class="title">{{ goodsdesc.title }}</h1>  
    <hr>
    <div v-html="goodsdesc.content" class="content"></div>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsdesc: {}
    }
  },
  props: ["id"],
  methods: {
   async getDesc () {
      const { data } = await this.$http.get('/api/goods/getdesc/' + this.id)
      console.log(data);
      
      if (data.status === 0) return this.goodsdesc = data.message[0]
    }
  },
  created () {
    this.getDesc()
  }
}
</script>

<style lang="scss">
.decs-container {
  padding: 10px;
   
  .title {
    margin-bottom: 10px;
    font-size: 20px;
   text-align: center;
  }
  .content {
    color: black;
    img {
      width: 100%;
    }
    p {
      margin: 0;
    }
  }
}
  
  
</style>