<template>
<div>
  <div class="header">
    <div class="return-btn iconfont">&#xe622;</div>
    <span class="header-title">
      <span class="iconfont">&#xe640;</span>
      花落折的聊天室
      (
      <span class="online-count">3</span>
      )
    </span>
    <div class="menu iconfont">&#xe655;</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ScreenHeader'
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  line-height: .8rem;
  color: #fff;
  font-size: .28rem;
  text-align: center;
  background: linear-gradient(to left, #00a8ff , #00d9ff);
  .return-btn {
    position: absolute;
    width: .7rem;
    left: 0;
    top: 0;
  }
  .menu {
    position: absolute;
    width: .9rem;
    right: 0;
    top: 0;
    font-size: .36rem;
  }
}
</style>
