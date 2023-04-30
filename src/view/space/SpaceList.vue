<script setup lang="ts">
const router = useRouter();

let total = ref(114);
function changePage(page: number) {
  console.log(`to page ${page}`);
}

onMounted(() => {
  console.log(router.currentRoute.value);
})
</script>

<template>
  <div class="spaceList">
    <div class="listContent">
      <user-list />
      <user-list />
      <user-list />
      <user-list />
      <user-list />
      <user-list />
      <user-list />
      <user-list />
      <user-list />
      <user-list />
    </div>
    <div class="listFoot">
      <n-pagination  :on-update:page="changePage" :item-count="total" show-quick-jumper>
        <template #goto>
        跳至
      </template>
      </n-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceList {
  background-color: white;
  border-radius: 5px;
  padding: 20px;

  .listContent {
  }

  .listFoot {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>