<template>
  <div class="container" ref="scrollWrapper">
    <div class="scroll-wrapper">

      <div class="refresh">
        <span class="refresh-msg">{{ refreshMsg }}</span>
      </div>

      <transition-group name="slide-fade">
        <chat-box v-for="item of list"
                  :key="item.key"
                  :nickName="item.nickname"
                  :date="new Date(item.date).toLocaleString()"
                  :content="item.content"
                  :direction="item.direction"
        ></chat-box>
      </transition-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import ScrollBar from '@better-scroll/scroll-bar'
import chatBox from './screenWindowComponents/ChatBox'
import getCookie from '@/common/cookie'
import option from '@/common/option'

BScroll.use(ScrollBar)
BScroll.use(PullDown)

const TIME_STOP = 300
const BOUNCE_TIME = 500

export default {
  name: 'ScreenWindow',

  data () {
    return {
      refreshMsg: 'refresh',
      list: [],
      scroll: null,
      lastKey: 0,
      ws: null
    }
  },

  components: {
    chatBox
  },

  methods: {

    scrollInit () {
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        bounceTime: BOUNCE_TIME,
        pullDownRefresh: {
          threshold: 25,
          stop: 36
        },
        scrollbar: true
      })
      this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
      this.scroll.on('pullingDown', this.pullingDownHandle)
    },

    async pullingDownHandle () {
      if (!this.lastKey) return 0
      this.refreshMsg = 'refreshing...'

      let res = await axios.post('/api/queryIdTail', { key: this.lastKey })

      if (res.status !== 200) {
        throw new Error('网络请求失败')
      } else if (res.data.code === -1) {
        throw new Error(res.data.msg)
      }

      if (res.data.data.length) {
        this.lastKey = res.data.data[0].key
        this.list.splice(0, 0, ...res.data.data)
      }

      this.refreshMsg = 'complete.'

      await new Promise((resolve) => {
        setTimeout(() => {
          this.scroll.finishPullDown()
          resolve()
        }, TIME_STOP)
      })
      setTimeout(() => {
        this.scroll.refresh()
        this.refreshMsg = 'refresh'
      }, BOUNCE_TIME)
    },

    getData () {
      return axios.post('/api/queryTail')
        .then(res => {
          if (res.status !== 200) {
            throw new Error('网络请求失败')
          } else if (res.data.code === -1) {
            throw new Error(res.data.msg)
          }
          this.list = res.data.data
          if (!res.data.data) return 0
          this.lastKey = (this.list[0] && this.list[0].key) || 0
        })
    },

    async renderingView (...data) {
      this.list.splice(this.list.length, 0, ...data)
      await new Promise((resolve) => {
        setTimeout(() => {
          this.scroll.refresh()
          resolve()
        }, 50)
      })

      let state = Math.abs(this.scroll.maxScrollY) + this.scroll.y <= 320
      if (state) {
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 700)
      }
    },

    webSocketInit () {
      if (!('WebSocket' in window)) {
        throw new Error('浏览器不支持WS')
      }

      this.ws = new WebSocket(option.ws)

      this.ws.onmessage = (e) => {
        let data = {}
        try {
          data = JSON.parse(e.data)
        } catch (error) {
          throw error
        }
        if (data.id.toString() === getCookie().id) {
          data.direction = 'right'
        } else {
          data.direction = 'left'
        }
        this.renderingView(data)
      }
    }
  },

  mounted () {
    this.getData()
      .then(() => {
        this.scrollInit()
      })
    this.webSocketInit()
  },

  beforeDestroy () {
    // 终止WebSocket连接
    this.ws.close && this.ws.close()
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

// 动画
.slide-fade-enter-active {
  transition: all .8s ease-in-out;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(3rem);
  opacity: 0;
}
</style>
