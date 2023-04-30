<script setup lang="ts">

let total = ref(114);
function changePage(page: number) {
  console.log(`to page ${page}`);
}
</script>

<template>
  <div class="spaceDraft">
    <div class="draftContent">
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
    </div>
    <div class="draftFoot">
      <n-pagination :on-update:page="changePage" :item-count="total" show-quick-jumper>
        <template #goto>
          跳至
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceDraft {
  background-color: white;
  border-radius: 5px;
  padding: 20px;

  .draftContent {

  }

  .draftFoot {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>