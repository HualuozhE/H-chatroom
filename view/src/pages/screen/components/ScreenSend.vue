<template>
<div class="send-container">
  <div class="send-area">
    <textarea class="msg-input" v-model="inputText"></textarea>
    <div :class="['send-btn', sendBtnActive]" @click="clickHandle">发送</div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ScreenSend',
  data () {
    return {
      inputText: '',
      sendBtnActive: {
        active: false
      }
    }
  },
  methods: {
    clickHandle () {
      if (!this.sendBtnActive.active) return false
      axios.post('/api/push', { content: this.inputText })
      this.inputText = ''
    }
  },
  watch: {
    inputText () {
      if (this.inputText.length) {
        this.sendBtnActive.active = true
      } else {
        this.sendBtnActive.active = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@styles/varibles.less';
.send-container {
  position: fixed;
  height: 1.34rem;
  padding: 0 .22rem;
  bottom: 0;
  left: 0;
  right: 0;

  // sned-area区域
  .send-area {
    width: 100%;
    position: relative;
    padding-right: 1.2rem;
    .msg-input {
      height: .68rem;
      width: 100%;
      border-radius: .3rem;
      padding: .12rem .35rem;
      caret-color: @blue;
    }
    .send-btn {
      width: 1.12rem;
      position: absolute;
      top: 50%;
      right: -.06rem;
      transform: translateY(-50%);
      text-align: center;
      line-height: .6rem;
      background-color: #b1effe;
      color: #fff;
      border-radius: .3rem;
    }
    .send-btn.active {
      background-color: @blue;
    }
  }
}
</style>
