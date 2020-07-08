<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="numBox" @change="numberChange"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.js'
// 导入matations映射
import { mapMutations } from 'vuex'

export default {
  props: ["initcount","id"],
  mounted () {
    mui('.mui-numbox').numbox()
  },
  methods: {
    ...mapMutations(["updateCartCount"]),
    numberChange () {
      const val = parseInt(this.$refs.numBox.value)
      //调用mutations的方法，并把 对象传给其参数2 goods
      this.updateCartCount({
        id:this.id,
        count: val
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  
</style>