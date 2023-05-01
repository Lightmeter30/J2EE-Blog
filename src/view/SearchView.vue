<template>
  <div class="searchView">
    <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
    <div class="searchContent">
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
    </div>
    <div class="searchFoot">
      <n-pagination  :on-update:page="changePage" :item-count="total" show-quick-jumper>
        <template #goto>
        跳至
      </template>
      </n-pagination>
    </div>
    <div style="height: 20px;" ></div>
  </div>
</template>

<script setup lang="ts">
import { NPagination } from 'naive-ui';

// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";

let total = ref(114);
function changePage(page: number) {
  console.log(`to page ${page}`);
}

</script>

<style scoped lang="scss">
.searchView {
  width: 70%;
  position: relative;
  left: 15%;
  margin-top: 20px;
  margin-bottom: 20px;

  .searchContent {
  }

  .searchFoot {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>