<!--
 * @Author: yaodongyi
 * @Date: 2019-09-19 16:35:03
 * @Description: 
 -->
<template>
  <div>
    <ul>
      <li v-for="(item,key) in list" :key="key">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["list"],
}
</script>