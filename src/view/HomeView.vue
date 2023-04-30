<template>
  <div class="home">
    <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
  </div>
</template>

<script setup lang="ts">
// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";
</script>

<style scoped lang="scss">
.home {
  width: 80%;
  position: relative;
  left: 10%;
  margin-top: 20px;
  // margin-bottom: 20px;
}
</style>