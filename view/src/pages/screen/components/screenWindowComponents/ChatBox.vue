<template>
<div class="chat-box-container">
  <div class="date" v-if="date">
    <!-- <span>06-23下午12：57</span> -->
    <span>{{ date }}</span>
  </div>
  <div class="msg-box">
    <div class="avatar" :style="rightStyles">
      <img src="http://5b0988e595225.cdn.sohucs.com/images/20171203/db71e46ef9914a7c9695d45dd0401cb1.jpeg" class="avatar-img">
    </div>

    <div class="message-area" :style="rightStyles">
      <div class="nickname" :style="rightTextStyles">{{ nickName }}</div>
      <div class="bubble">
        <pre>{{ content }}</pre>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ChatBox',
  props: {
    date: String,
    avatar: String,
    nickName: String,
    content: String,
    direction: String
  },
  computed: {
    rightStyles () {
      return {
        float: this.directionText
      }
    },
    rightTextStyles () {
      return {
        textAlign: this.directionText
      }
    },
    directionText () {
      let direction = 'left'
      if (this.direction === 'right') {
        direction = 'right'
      }
      return direction
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@styles/varibles.less';
.chat-box-container {
  padding: .26rem 0;
}
.date {
  padding-top: .3rem;
  line-height: 1;
  text-align: center;
  color: @gray;
  font-size: .24rem;
}
.msg-box {
  overflow: hidden;

  .avatar {
    float: left;
    width: .72rem;
    margin: 0 .26rem;
    .avatar-img {
      width: .72rem;
      height: .72rem;
      border-radius: 50%;
    }
  }

  .message-area {
    float: left;
    max-width: 70%;

    .bubble {
      background-color: #fff;
      padding: .2rem;
      border-radius: .2rem;
    }

    .nickname {
      line-height: .5rem;
      color: @gray;
    }
  }

}
</style>
