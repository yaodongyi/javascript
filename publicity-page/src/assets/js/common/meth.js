/*
 * @Author: yaodongyi
 * @Date: 2019-09-04 21:12:15
 * @Description: 全局 methods-API
 */
module.exports = new (class methods{
  constructor() {
    this.query = this._query();
    return this;
  }
  /**
   * @param {String} page 例"index.html"
   * @param {*} query 参数
   */
  router(arg = { path: page, query: query }) {
    if (typeof arg === 'string') {
      window.location.href = arg;
    } else if (typeof arg === 'object') {
      window.location.href = arg.path + '?' + JSON.stringify(arg.query);
    }
    return this;
  }
  /* 获取query参数 */
  _query() {
    if (window.location.search) return JSON.parse(unescape(window.location.search.substr(1)));
  }
})();
