<template lang="pug">
  view
    scroll-view(scroll-y="true")
      view.cu-form-group.margin-top
        view.title 姓名
        input(placeholder="请填写 >").text-right
      view.cu-form-group
        view.title 性别
        input(placeholder="请填写 >").text-right
      view.cu-form-group
        view.title 年龄
        input(placeholder="请填写 >" type="number").text-right
      view.cu-form-group
        view.title 手机号
        input(placeholder="请填写 >" type="number").text-right
      view.cu-form-group
        view.title 邮箱
        input(placeholder="请填写 >" ).text-right
      view.cu-form-group
        view.title 城市
        input(placeholder="请填写 >" ).text-right
      button.cu-btn.block.bg-green.margin-xl.lg(:disabled="loading" @click="updateUserProfile")
        text.icon-loading2.iconfont-spin(v-if="loading")
        text 保存
</template>


<script>
export default {
  data() {
    return {
      form: {
        username: ""
      },
      loading: false
    };
  },
  methods: {
    updateUserProfile() {
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>
