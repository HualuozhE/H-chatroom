<template>
<div class="parent">
  <screen-header></screen-header>
  <screen-window></screen-window>
  <screen-send></screen-send>
</div>
</template>

<script>
import ScreenHeader from './components/ScreenHeader'
import ScreenWindow from './components/ScreenWindow'
import ScreenSend from './components/ScreenSend'
export default {
  name: 'Screen',
  components: {
    ScreenHeader,
    ScreenWindow,
    ScreenSend
  }
}
</script>

<style lang="less" scoped>
@import '~@styles/varibles.less';
.parent {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @bgColor;
}
</style>
