<template>
  <div class="container" ref="scrollWrapper">
    <div class="scroll-wrapper">

      <div class="refresh">
        <span class="refresh-msg">{{ refreshMsg }}</span>
      </div>

      <chat-box v-for="item of list"
                :key="item.id"
                :nickName="item.nickname"
                :date="new Date(item.date).toLocaleDateString()"
                :content="item.content"
                :direction="item.direction"
      ></chat-box>

    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import ScrollBar from '@better-scroll/scroll-bar'
import chatBox from './screenWindowComponents/ChatBox'
import axios from 'axios'

BScroll.use(ScrollBar)
BScroll.use(PullDown)

export default {
  name: 'ScreenWindow',

  data () {
    return {
      refreshMsg: 'refresh',
      list: [],
      scroll: {}
    }
  },

  components: {
    chatBox
  },

  methods: {

    scrollInit () {
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        pullDownRefresh: {
          threshold: 25,
          stop: 36,
          startY: 999
        },
        scrollbar: true
      })
      this.scroll.on('pullingDown', this.pullingDownHandle)
    },

    pullingDownHandle () {
      this.refreshMsg = '刷新中...'
      setTimeout(() => {
        this.refreshMsg = '刷新完成！'
        setTimeout(this.scroll.finishPullDown, 1000)
      }, 2000)
    },

    getData () {
      axios.post('/api/queryTail')
        .then(res => {
          if (!res.data || res.status !== 200) {
            throw new Error('网络请求失败')
          }
          this.list = res.data.data
        })
    }

  },

  mounted () {
    this.getData()
    this.scrollInit()
  },

  updated () {
    this.scroll.refresh() // TODO: 1.重写监控函数
  }

}
</script>

<style lang="less" scoped>
@import '~@styles/varibles.less';

.container {
  position: fixed;
  top: 0.8rem;
  left: 0;
  right: 0;
  bottom: 1.5rem;
  overflow: hidden;

  /deep/ .bscroll-indicator {
    background: rgba(0, 0, 0, 0.3) !important;
  }

  /deep/ .bscroll-vertical-scrollbar {
    width: 4px !important;
  }

  .scroll-wrapper {
    min-height: 101%;
    .refresh {
      position: absolute;
      width: 100%;
      line-height: .5rem;
      text-align: center;
      transform: translateY(-100%);
    }
  }
}
</style>
