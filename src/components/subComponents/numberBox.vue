<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="numMax">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.js'

export default {
  
  props: ["numMax"],
  mounted () {
    mui('.mui-numbox').numbox()
  },
  watch: {
    numMax:function (newval, oldval) {
      //无论外界传递的max值是什么，最后的一点是合法值
      //每当监听到 numMax 值变化，就通过JS API 来设置最大值
      mui('.mui-numbox').numbox().setOption('max', newval)
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>