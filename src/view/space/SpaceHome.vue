<script setup lang="ts">

let total = ref(114);
function changePage(page: number) {
  console.log(`to page ${page}`);
}
</script>

<template>
  <div class="spaceHome">
    <div class="homeContent">
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
    </div>
    <div class="homeFoot">
      <n-pagination :on-update:page="changePage" :item-count="total" show-quick-jumper>
        <template #goto>
          跳至
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceHome {
  background-color: white;
  border-radius: 5px;
  padding: 20px;

  .homeContent {
  }

  .homeFoot {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>