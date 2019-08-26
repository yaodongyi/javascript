/*
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:43
 * @Description: babel
 */
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}