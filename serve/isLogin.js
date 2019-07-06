module.exports = function(ctx) {

  if (!ctx.session.id || !ctx.session.nickname) {
    ctx.body = JSON.stringify({
      code: -1,
      msg: "没有登录"
    });
    return false
  } else {
    return true
  } 

};
