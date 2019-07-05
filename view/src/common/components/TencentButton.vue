<template>
  <div>
    <div :class="['send-btn', sendBtnActive]" @click="clickHandle">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TencentButton',
  data () {
    return {
      sendBtnActive: {
        active: this.enable
      }
    }
  },
  props: {
    enable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickHandle () {
      if (this.enable) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@styles/varibles.less';
.send-btn {
  display: inline-block;
  text-align: center;
  line-height: 0.6rem;
  background-color: #b1effe;
  color: #fff;
  border-radius: 0.3rem;
  padding: 0 .47rem;
}
.send-btn.active {
  background-color: @blue;
}
.send-btn:active{
  background-color: #1fbafc;
}
</style>
