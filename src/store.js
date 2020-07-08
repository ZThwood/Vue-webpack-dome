import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

//每當初始化項目的时候，从localStorage中取数据
let car = window.JSON.parse(localStorage.getItem('cart') || '[]')

//创建一个状态对象
const store = new Vuex.Store({
  state: {
    //购物车数组，存储对象的事{id, count, select}
    cart: car
  },
  mutations: {
    addToCar (state,goods) {
      let flag = false
      state.cart.some(item => {
        if (item.id === goods.id) {
          item.count += goods.count
          flag = true
          return true
        } 
      })
      //如果没找到同样的则添加全部信息
      if (!flag) {
        state.cart.push(goods)
      }

      //为了持久化存储购物车的数据，把商品序列化出来存储到localStrorage中
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
      // JSON.stringify() 方法将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串，
      //如果指定了 replacer 是一个函数，则可以选择性地替换值，或者如果指定了 replacer 是一个数组，
      //则可选择性地仅包含数组指定的属性。
    },
    updateCartCount (state, goods) {
      state.cart.some(item => {
        if (item.id == goods.id) {
          item.count = goods.count
          return true
        }
      })
      
      // 更新localStorage
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    },
    // 删除购物车某一项
    delFromCart (state, id) {
        state.cart.some((item, i) => {
          if (item.id == id) {
            state.cart.splice(i, 1)
          }
        })
         // 更新localStorage
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    },
    // 购物车选择框的变化更新
    changeSelectState (state, obj) {
      state.cart.forEach(item => {
        if (item.id == obj.id) {
          item.selected = obj.selected
          return true
        }
      })
       // 更新localStorage
       localStorage.setItem('cart', window.JSON.stringify(state.cart))
    }
  },
  getters: {
    totalcount (state) {
      let c = 0
      //getters特性，数据变化了会重新计算
      state.cart.forEach(item=>c += item.count)
      return c
    },
    // 获取购物车中所有商品id字符串
    idstr (state) {
      let arr = []
      state.cart.forEach(item => arr.push(item.id))
      return arr.join(',')
    },
    //获取购物车商品id对应的数量
    countObj (state) {
      let o = {}
      state.cart.forEach(item => o[item.id] = item.count)
      return o
    },
    selectObj (state) {
      let o = {}
      state.cart.forEach(item => o[item.id] = item.selected)
      return o
    },
    //勾选商品选择计算
    selectedCount (state) {
      let c = 0
      state.cart.forEach(item => {
        if (item.selected) {
          c += item.count
        }
      })
      return c
    },
    //总价s
    amount (state) {
      let sum = 0
      state.cart.forEach(item => {
        if (item.selected) {
          sum += item.count * item.price
        }
      })
      return sum
    }
  }
  
})

export default store