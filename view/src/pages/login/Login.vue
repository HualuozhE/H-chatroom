<template>
<div>
  <login-box></login-box>
</div>
</template>

<script>
import LoginBox from './components/LoginBox'
import getCookie from '@/common/cookie'
export default {
  name: 'Login',
  components: {
    LoginBox
  },
  beforeCreate () {
    if (getCookie().id) {
      this.$router.push('/screen')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
