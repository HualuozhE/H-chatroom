
module.exports = {

  errorMsg (msg) {
    return JSON.stringify({
      code: -1,
      msg
    })
  },

  dataMsg (data) {
    return JSON.stringify({
      code: 1,
      data
    })
  }

}
