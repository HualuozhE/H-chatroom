<template>
  <div>
    <input :type="inputType" class="msg-input" @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: 'TencentInput',
  props: {
    value: String,
    inputType: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@styles/varibles.less';
.msg-input {
  height: 0.68rem;
  width: 6.5rem;
  border-radius: 0.3rem;
  padding: 0.12rem 0.35rem;
  caret-color: @blue;
}
</style>
