<!--
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:43
 * @Description: 
 -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { meth } from '../utils/methods'
export default {
  data() {
    return {

    }
  },
  created() {
    function randoms(num, max, min) {
      return Array.from({ length: num }).map(() => Math.ceil(Math.random() * (max - min) + min));
    }
    let num1 = randoms(10000, 10000000, 1);
    let num2 = randoms(10000, 10000000, 1);
    console.time("sort")
    meth.sort(num1.concat(num2))
    console.timeEnd("sort")
  },
  methods: {

  },

}
</script>
