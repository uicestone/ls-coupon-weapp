<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="stylus">
@import 'common/colorui/main.css'
@import 'common/colorui/icon.css'
@import 'common/colorui/animation.css'
@import '/components/gaoyia-parse/parse.css'

.bottom-fixed
  position fixed
  bottom 0
  width 100%
.top-fixed
  position fixed
  top 0
  width 100%
.text-green
  color #2a6350
.bg-red
  background-color #dd452e
</style>
