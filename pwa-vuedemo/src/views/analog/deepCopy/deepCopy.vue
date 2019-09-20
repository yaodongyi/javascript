<!--
 * @Author: yaodongyi
 * @Date: 2019-09-19 10:46:09
 * @Description: 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况
 -->
<template>
  <div>
    analog
  </div>
</template>
<script>
import { pub } from "./deepCopy.js"
export default {
  data() {
    return {
      obj: {},
      head: Symbol('头顶'),
      hat: Symbol('帽子'),
      cause: Symbol('原因'),
    }
  },
  created() {
    // 验证
    let o1 = this.prop();
    this.obj[this.hat].num[1] = 0;
    console.log(this.obj, o1);
  },
  methods: {
    prop() {
      // 新建一个魔性的对象。
      this.obj = {
        origin: { name: '小明', [this.head]: '🍃' },
        [this.hat]: { [this.cause]: 'wife', color: 'green', background: '🌾', num: [1, 2, 3, 4, 5, 6, 7, 8, 9, [Infinity]] },
        move: function () { }
      };
      // 接下来对这个魔性的对象进行深拷贝，太残忍了。
      return pub.deepCopy(this.obj);
    }

  },
}
</script>
