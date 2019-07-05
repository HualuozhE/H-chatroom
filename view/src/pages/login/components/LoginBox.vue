<template>
<div class="box">
  昵称：
  <tencent-input v-model="inputText"></tencent-input>
  <tencent-button :enable="true" @click="clickHandle" class="login-btn">Login</tencent-button>
</div>
</template>

<script>
import axios from 'axios'
import TencentInput from '@/common/components/TencentInput'
import TencentButton from '@/common/components/TencentButton'
export default {
  name: 'LoginBox',
  components: {
    TencentInput,
    TencentButton
  },
  data () {
    return {
      inputText: ''
    }
  },
  methods: {
    clickHandle () {
      axios.post('/api/login', { nickname: this.inputText })
        .then((res) => {
          if (res.status !== 200 || !res.data) {
            throw new Error('网络请求失败')
          }
          if (res.data.code === 1) {
            this.$router.push('/screen')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 6rem;
  margin: 0 auto;
  line-height: 1.6;

  .login-btn {
    margin-top: .6rem;
  }
}
</style>
