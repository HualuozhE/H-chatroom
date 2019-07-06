export default function () {
  let cookie = window.document.cookie.split('; ')
  let res = {}

  cookie.forEach(item => {
    let arr = item.split('=')
    res[arr[0]] = arr[1]
  })

  return res
}
