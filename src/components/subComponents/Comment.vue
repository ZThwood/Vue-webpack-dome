//公共评论组件
<template>
  <div>
    <h4>发表评论</h4>
    <hr />
    <textarea placeholder="请输入要BB内容（最多120字）" maxlength="120" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="postMsg">发表评论</mt-button>

    <div class="cmt-list" v-for="(item, index) in cmts" :key="index">
      <div
        class="cmt-list-title"
      >第{{ index+1 }}楼&nbsp;用户:{{ item.user_name }}&nbsp;发表时间:{{ item.add_time | dateFormat('MM-DD HH:mm:ss') }}</div>
      <div class="cmt-list-con">{{ item.content }}</div>
    </div>

    <!-- 属性分别是 颜色、尺寸、幽灵图 -->
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>
<script>
//引入mint弹出提示，mint的js组件都要引入才能使用
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageindex: 1,
      cmts: [],
      content: "" //评论的内容
    };
  },

  //接受父组件传过来的值
  props: ["newsid"],
  methods: {
    async getCommentByPage () {
      const { data } = await this.$http.get(
        "/api/getcomments/" + this.newsid + "?pageindex=" + this.pageindex
      );
      // console.log(data);
      if (data.status === 0)
      //concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
        return (this.cmts = this.cmts.concat(data.message));
    },
    loadMore () {
      //点击按钮获取更多的评论
      //让pageindex + 1之后，再调用getCommentByPageff
      this.pageindex ++;
      this.getCommentByPage();
    },
    async postMsg () {
      //trim() 方法会从一个字符串的两端删除空白字符。
      if (this.content.trim().length <= 0) return Toast("请输入评论内容！");
      //发表评论逻辑
      const { data } = await this.$http.post("api/postcomment/" + this.newsid, {
        content: this.content
      });
      if (data.status === 0) {
        this.cmts.unshift({
          user_name: "匿名用户",
          add_time: new Date(),
          content: this.content.trim()
        })
        this.content = "";
      }
    }
  },
  created () {
    this.getCommentByPage();
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
}
textarea {
  margin: 0;
  font-size: 14px;
  margin-top: 5px;
}
.cmt-list {
  padding: 12px 0px 10px;
  .cmt-list-title {
    font-size: 15px;
    padding-bottom: 6px;
    color: #1a1a1a;
  }
  .cmt-list-con {
    font-size: 15px;
    color: #1a1a1a;
  }
}
</style>