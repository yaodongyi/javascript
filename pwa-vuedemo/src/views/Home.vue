<!--
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:43
 * @Description: 
 -->
<template>
  <div class="home">
    <h1>This is an home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { all_api } from "../utils/api.js";
import { meth } from '../utils/methods';

export default {
  name: 'home',
  created() {
    this.all_fun()
    meth.getVue.call(this); // 2
  },
  methods: {
    async all_fun() {
      let all_response = await all_api();
      console.log(all_response)
    }
  }
}
</script>
