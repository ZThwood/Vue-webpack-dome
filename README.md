## 轮播图

1. 使用了mint-UI的轮播图

```HTML
<!-- 轮播图区 -->*

  <mt-swipe :auto="4000">

   <mt-swipe-item v-for="(item, index) in lunbotu" :key="index">

        <img :src="item.img" class="swipe-size" />

   </mt-swipe-item>

  </mt-swipe>
```



### axios的使用  

+ async/await是基于promise实现的，他不能用于普通的回调函数
+ async/await使得异步代码看起来像同步代码
+ async/await与Promise一样，是非阻塞的。

1. 导入axios

```javascript
//导入 axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:'http://api.cms.liulongbin.top/'
})
```

2. 使用axios获取数据

```javascript
<script>
export default {
  data() {
    return {
      lunbotu: []
    };
  },
  created() {
    this.getLunbo();
  },
  methods: {
    async getLunbo() {
      const { data } = await this.$http.get("/api/getlunbo");
      console.log(data);
      if (data.status === 0) this.lunbotu = data.message;
    }
  }
};
</script>
```
## 功能区

1. 使用了`mul`的网格(grid-default)

``` html

```

使用第三方组件原则上不自己添加类



## 使用动画实现路由切换



## 时间的格式化

这里在过滤器文件中`filters.js`使用了插件`momen`和过滤器

1. 安装

``` shell
cnpm i moment -S
```

2. 引入

```js
import moment from "moment"
```

3. 结合全局过滤器使用

``` js
Vue.filter('dateFormat', function (data, myformat='YYYY-MM-DD HH:mm:ss') { //没有传参默认格式
  return moment(data).format(myformat)
})
```

+ 当用户在过滤器中使用`dateFormat('YYYY-MM-DD')`就会把格式传给`myformat`
+ 用户没有传参就会采用参数2后面的值作为默认值

##  评论子组件的封装和引用

1. 在项目创建`src->subComponents>comment.vue`目录及文件

2. 在`Newsinfo`页面导入`comment.vue`
3. 通过私有组件注册方式注册`comment.vue`
4. 以注册的名称用标签写在页面(view)上即可

## 获取评论内容

1. 通过`属性传递`获取父组件的`id值`
2. 定义根据页码和id值获取评论的方法，并在`created`中调用改方法
3. 获取到的数据挂载到data中并渲染

## 点击获取加载更多评论

1. 给加载更多按钮添加点击事件`@click='loadMore'

2. 方法中让页面自增加1，再调用获取评论内容的方法

   调用获取内容的方法出现的问题

   + 第一页的评论会被覆盖
   + 解决方法是把两个内容用`concat方法`合并起来

   `this.cmt = this.cmt.concat(data.message)`



## 实现发表功能

1. 点击评论时，判断一下内容是否为空

   ```js
   this.content.trim().length <= 0
   ```

2.  不为空时则调用API接口提交评论到数据到后端

   ``` js
   const { data } = await this.$http.post("api/postcomment/" + this.newsid, {
           content: this.content
         });
   ```

3. 评论成功后，手动组织出新的评论对象，手动unshift更新到评论列表中

   ```js
   if (data.status === 0) {
           this.cmts.unshift({
             user_name: "匿名用户",
             add_time: new Date(),
             content: this.content.trim()
           })
           this.content = "";
         }
   ```

   

 concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

`array1.concat(array2);`


从数组和对象中提取值，对变量进行赋值，称为解构（`destructuring`）

数组的解构赋值，按照对应的顺序赋值，如果值数量超出则多余的值被抛弃，如果值不够则为`undefined`。


