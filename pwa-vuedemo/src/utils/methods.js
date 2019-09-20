/*
 * @Author: yaodongyi
 * @Date: 2019-08-27 23:27:45
 * @Description: 
 */
import V from '../main';
export const meth = new (class {
  constructor(a) {
    console.log(a);
  }
  getVue() {
    console.log(this);
  }
  /**
   * 以20000为分水岭，小于20000使用sort,大于使用希尔排序
   * @param {number[]} array 
   * @desc 小于20000数据量的情况下，sort排序是比希尔排序要快的。
   */
  sort(array) {
    if (array.length < 20000) {
      // 原生数组排序api，不同的浏览器有不同的内置排序方式，但是在chrome和safari上面是很稳定的。
      console.log("使用Array.prototype.sort排序")
      return array.sort((x, y) => x - y)
    } else {
      console.log("数据量大于 20000 选择shell排序")
      return this._ShellSort(array)
    }
  }
  /**
   * 希尔排序，对应js排序中，大数据量下希尔排序是较为稳定、快速的排序方式。
   * @param {number[]} arr 
   */
  _ShellSort(arr) {
    var len = arr.length;
    var temp, gap = 1;
    while (gap <= len / 3) {
      gap = gap * 3 + 1;
    }
    while (gap >= 1) {
      for (var i = gap; i < len; i++) {
        temp = arr[i];
        for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
          arr[j + gap] = arr[j];
        }
        arr[j + gap] = temp;
      }
      gap = (gap - 1) / 3;
    }
    return arr;
  }
})(V);
