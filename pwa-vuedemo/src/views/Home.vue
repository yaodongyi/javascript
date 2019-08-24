<!--
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:43
 * @Description: 
 -->
<template>
  <div class="home">
    <h1>This is an home page123456</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { all_api } from "../utils/api.js";
export default {
  name: 'home',
  created() {
    this.all_fun()
  },
  methods: {
    async all_fun() {
      let all_response = await all_api();
      console.log(all_response)
    }
  }
}
</script>
