<!--
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:43
 * @Description: 
 -->
<template>
  <div class="home">
    <h1>This is an home page</h1>
    <ul @click="meths">
      <li v-for="(item,key) in obj.arr" :key="key" :data-index="key">
        <div v-for="(i,k) in item.a" :key="k" :data-index="k">
          {{i}}
        </div>
      </li>
    </ul>

    <card :list="arr" />
    ////
    <ul>
      <li v-for="(item,key) in arr" :key="key">{{item}}</li>
    </ul>
    <button @click="c()">btn</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { all_api } from "../utils/api.js";
import { meth } from '../utils/methods';
import card from "./card.vue"
export default {
  name: 'home',
  components: { card },
  data() {
    return {
      arr: [1, 2, 3, 4, 5],
      obj: { arr: [{ a: [1, 2, 3] }, { a: [1, 3, 2] }] },
    }
  },
  created() {
    // this.all_fun()
    // meth.getVue.call(this); // 2
    setTimeout(() => {
      this.arr[1] = 0
    })
  },
  methods: {
    c() {
      console.log(this.arr[1])
      // this.obj.arr[1].a[1] = 0;
      // this.arr[1] = 0
      // this.$set(this.obj.arr[1].a, 1, 0)
      this.$set(this.arr, 1, 0)
      // this.$forceUpdate()
    },
    async all_fun() {
      // let all_response = await all_api();
      // console.log(all_response)
    },
    meths(e) {
      console.log(e.target.dataset.index)
    }
  }
}
</script>
