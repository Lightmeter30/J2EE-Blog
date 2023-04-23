<template>
  <div class="home">
    <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
    <div style="position: relative; top: 100px; left: 200px; width: 80%;height: auto;margin-bottom: 50px; " >
      <user-card></user-card>
      <blog-card></blog-card>
      <comment-list></comment-list>
      <user-list></user-list>
    </div>
  </div>
</template>

<script setup lang="ts">
// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";
</script>

<style scoped lang="scss">
</style>