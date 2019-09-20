/*
 * @Author: yaodongyi
 * @Date: 2019-09-20 09:50:17
 * @Description: 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况
 */
export const pub = new (class {
  // static obj = {};
  constructor() {}
  deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    // 获取到当前层对象的所有属性。
    let ownProperty = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
    for (let i in ownProperty) {
      if (obj.hasOwnProperty(ownProperty[i])) {
        // console.log(ownProperty[i], ':', obj[ownProperty[i]]);
        if (typeof obj[ownProperty[i]] === 'object' && obj[ownProperty[i]] != null) {
          result[ownProperty[i]] = this.deepCopy(obj[ownProperty[i]]);
        } else {
          result[ownProperty[i]] = obj[ownProperty[i]];
        }
      }
    }
    return result;
  }
})();
