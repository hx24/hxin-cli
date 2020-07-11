// 存放用户所需要的常亮

const { version } = require('../package.json')

// 存储模板的位置，使用process.env取出用户目录
// darwin代表mac，否则是win
// mac下取出的是/Users/hx
// 最后.template代表是隐藏文件夹
const downloadDirectory = `${
  process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']
}/.template`

module.exports = {
  version,
  downloadDirectory,
}
