<template>
  <div>
    <comment :newsid="id"></comment>
  </div>
</template>

<script>
import comment from "../subComponents/Comment.vue";

export default {
  data() {
    return {
      
    }
  },
  props: ["id"],
  components: {
    comment
  }
};
</script>

<style lang="scss" scoped>
div {
  margin: 8px;
}
</style>