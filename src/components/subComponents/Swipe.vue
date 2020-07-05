<template>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in lunbotuname" :key="index">
        <img :src="item[imgpath]" :class="[ isfull ? 'img-full' : 'img-normal']" />
      </mt-swipe-item>
    </mt-swipe>
</template>
 
 <script>
export default {
  props: ["lunbotuname", "imgpath", "isfull"]
};
</script>

 <style lang="scss" scoped>
.mint-swipe {
  height: 180px;

  .mint-swipe-item {
    text-align: center;
  
    //添加此类则宽高充满父元素
    .img-full {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    // 添加此类这只是高100%，宽自适应
    .img-normal {
      height: 100%;
    }
  }
}
</style>