const koa = require("koa");
const WebSocket = require('ws');
const Router = require("koa-router");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const randomId = require("./random");
const isLogin = require("./isLogin");
const sendF = require("./sendFormat");

const app = new koa();
const router = new Router();

app.keys = ["By: HualuozhE"];

let data = [
  {
    id: '12347',
    key: randomId(),
    nickname: "小明9",
    content: "太帅了!!!",
    date: Date.now()
  }, {
    id: '12346',
    key: randomId(),
    nickname: "小明8",
    content: "太帅了!!!",
    date: Date.now()
  }, {
    id: '12345',
    key: randomId(),
    nickname: "小明7",
    content: "太帅了!!!",
    date: Date.now()
  }, {
    id: '12344',
    key: randomId(),
    nickname: "小明6",
    content: "太帅了!!!",
    date: Date.now()
  }, {
    id: '123453',
    key: randomId(),
    nickname: "小明5",
    content: "太帅了!!!",
    date: Date.now()
  }, {
    id: '12342',
    key: randomId(),
    nickname: "小明4",
    content: "太帅了!!!",
    date: Date.now()
  }, {
    id: '12341',
    key: randomId(),
    nickname: "小明2",
    content: "太帅了!!!",
    date: Date.now()
  }, {
    id: '12340',
    key: randomId(),
    nickname: "小明1",
    content: "太帅了!!!",
    date: Date.now()
  }
];

let wss = new WebSocket.Server({ port: 8081 })


let query = {
  push(id, nickname, content) {
    const obj = {
      id,
      nickname,
      content,
      key: randomId(),
      date: Date.now()
    }
    data.push(obj)
    return obj
  },

  pop() {
    return data.pop();
  },

  selectTailByNum(masterId, num) {
    let totalLen = data.length;

    let result = data.slice(totalLen - num < 0 ? 0 : totalLen - num, totalLen);

    return result.map(item => {
      if (item.id.toString() === masterId.toString()) {
        item.direction = "right";
      } else {
        item.direction = "left";
      }
      return item;
    });
  },

  selectIdTailByNum(masterId, key, num) {
    let result = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].key.toString() === key.toString()) {
        result = data.slice(i - num < 0 ? 0 : i - num, i);
      }
    }

    return result.map(item => {
      if (item.id.toString() === masterId.toString()) {
        item.direction = "right";
      } else {
        item.direction = "left";
      }
      return item;
    });
  }
};





router

  .post("/api/login", ctx => {
    let nickname = ctx.request.body.nickname;

    if (!nickname) {
      return (ctx.body = sendF.errorMsg("昵称不能为空"));
    }

    if (nickname.length > 10) {
      return (ctx.body = sendF.errorMsg("昵称过长"));
    }

    ctx.session.nickname = nickname;
    ctx.session.id = randomId();

    ctx.cookies.set('id', ctx.session.id, {
      maxAge: 86400000,
      httpOnly: false,
      overwrite: true
    })

    ctx.body = JSON.stringify({
      code: 1,
      msg: "success"
    });
  })

  .post("/api/queryTail", ctx => {
    if (!isLogin(ctx)) return 0;

    ctx.body = sendF.dataMsg(query.selectTailByNum(ctx.session.id, 6));
  })

  // post传入id参数，拿这个id前面的num条数据
  .post("/api/queryIdTail", ctx => {
    if (!isLogin(ctx)) return 0;

    let key = ctx.request.body.key;

    if (!key) {
      return (ctx.body = sendF.errorMsg("没有参数"));
    }

    ctx.body = sendF.dataMsg(
      query.selectIdTailByNum(ctx.session.id, key, 6)
    );
  })

  .post('/api/push', ctx => {
    if (!isLogin(ctx)) return 0

    let content = ctx.request.body.content

    let item = query.push(ctx.session.id, ctx.session.nickname, content)

    item.direction = 'left'

    ctx.body = {code: 1, msg: 'success'}
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(item))
      }
    })

  })

app.use(
  session(
    {
      maxAge: 86400000,
      overwrite: true,
      httpOnly: true,
      rolling: false,
      renew: false
    },
    app
  )
);

app.use(bodyParser());

app.use(require('koa-static')(__dirname + '/public/'));

app.use(router.routes(), router.allowedMethods());

app.listen(80);
