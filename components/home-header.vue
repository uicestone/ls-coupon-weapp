<template lang="pug">
  view.top.flex.justify-center
    image(mode="aspectFit" :src="require('../static/bg_home_top.png')")
    image.logo(:src="require('../static/logo.png')")
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.top
  position relative
  margin-bottom 100upx
  image
    width 750upx
    height 268upx
  image.logo
    width 144upx
    height 144upx
    position absolute
    bottom -72upx
</style>

