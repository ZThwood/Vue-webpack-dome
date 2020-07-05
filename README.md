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

+ async/await是基于promise实现的，他不能用于普通的回调函数，因此异步方法返回值是promise的时候才能使用
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

1. 使用了`MUI`的网格(grid-default)

   注意

   使用第三方组件原则上不自己添加类



## 使用动画实现路由切换

1. 添加动画

```js
 <transition>
      <router-view></router-view>
</transition>
```

2. 设置样式

```css
// 切换动画
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

/* v-enter-active入场动画的时间段 */
/* v-leave-active离场动画的时间段 */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
```

3. 





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



# 2 图片分享模块

## 2.1 使用mui的顶部滚动

1. 在图片分享组件中引入js文件初始化

```js
import mui from "../../../lib/mui/js/mui.js"
```

2. 引入该插件的配置

```js
export default {
  //如果要引入第三方插件最好在mounted中引入
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
```



+ 运行后报错

```shell
Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

> 原因

​	`webpack`打包的js文件是严格模式，对于`mui`的引入的js代码无法接受

> 解决方法

​	移除严格模式

​	1. 安装(webpack4+版本)

```js
cnpm i @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode -D
```

​	2. 在`.babelrc`中的`plugins`中配置一下

```js
{
  "plugins": [["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]]
}
```



## 解决tabbar区域和图片分类列表js行为冲突问题

1. 冲突原因 每一个tabbar按钮的类样式`mui-tab-item`和js行为有冲突
2. 解决思路：把所以相关样式粘贴出来，然后该类名替换掉之前的



 ## 获取图片分类数据并加载到页面上

1. 获取分类数据
2. 手动把`全部分类信息,通过数组的 unshift方法,头部追加到数组中
3. 把获取到的分类,挂载到data上的 category中
4. 默认设置全部分类被高亮选中:通过:cass结合三元表达式,把id为0那一项分类,设置为默认选中

## 默认加载全部的分类数据
1. 定义一个 getPhotoBy Category的方法,接收一个分类ld,然后根据ld取所有的图片列表

2. 把获取到的图片,挂载到 photolith中

3. 根据 Mint-U的lazy-load组件,实现图片的懒加载效果;

  + 在实现懒加载效果时候,需要注意:图片的URL地址,需要通过vazy来指定;

  + 需要把图片的样式也粘贴到项目中,同时,把` Image选择器修改成img标签选择器

## 点击图片跳转到图片详情页面的路由改造
1. 把每个图片的改造成 router-link同时,要添加tag=""属性,而且,跳转的链接,需要使用o来
设置,因为需要传递这个图片的d过去;
2. 添加一个路由的规则,在规则中,使用 props来快速传递路由中的参数;
3. 添加路由对应的组件

## 开发图片的详情页面
1. 根据 props中接收的图片ld,获取图片的详情数据
2. 根据图片的详情,渲染页面最基本的结构
3. 发表评论的功能,直接引用现成的组件:
  + 使用 import把评论子组件导入到当前组件中
  + 把导入的评论组件对象,注册为当前图片详情页面的子组件 components
  + 以标签形式,把注册好的评论子组件名称,引入到页面指定区域
  + 注意:如果要实现评论的功能,需要在(以标签形式)引用评论子组件的时候,为其传递个 newsid"的属性,属性值,应该是当前图片的d;

## 实现缩略图的效果
1. 先加载所有的图片并显示到页面上;
2. 使用`vue- preview`插件来实现缩略图效果;
3. 如何使用缩略图组件呢:
+ 运行 `cnpm i vue-preview -S`安装

+ 在全局的配置文件 `globalConfig.js`中,安装此组件

  ```js
  import VuePreview from vue-preview
  Vue.use(VuePreview)
  ```

+ 在页面中,先把获取到的图片,按照标准的格式做一层包装:为每个图片添加w和h属性以及`src`属性;

  ```js
  async getThumbImg() {
        const { data } = await this.$http.get("/api/getthumimages/" + this.id);
        console.log(data);
        if (data.status === 0) {
          data.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc=item.src;  //关键点，赋值给它
          });
        }
        this.thumbimg = data.message;
      }
  handleClose() {
        console.log("close event");
      }
  ```

  

+ 把官方提供的例子中的mg标签粘贴到页面中,去渲染数据就行了;

  ```html
  <div class="thumbs">
         <vue-preview :slides="thumbimg"  @close="handleClose"></vue-preview>
  </div>
  ```

  

## 实现商品列表的经典两列布局
1. 外层有一个 goods-list,里面的每个商品都是 goods-item;
2. 给外层的 goods-list设置 display:fex布局,同时为了让行只显示两个商品,我们为每个
goods-item添加了宽度为49%洞时,设置了 goods-list的 flex-wrap:wrap
3. 通过为父盒子添加 padding:7px来挤出左右的边距;
4. 为了保留出中间的间隙,为父盒子 goods-list添加了 justify-content: space- between;


















































`concat() 方法`用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

`array1.concat(array2);`


从数组和对象中提取值，对变量进行赋值，称为解构（`destructuring`）

数组的解构赋值，按照对应的顺序赋值，如果值数量超出则多余的值被抛弃，如果值不够则为`undefined`。

