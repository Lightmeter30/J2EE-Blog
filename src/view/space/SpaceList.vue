<script setup lang="ts">
import { darkTheme } from "naive-ui";
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
      <n-config-provider :theme="darkTheme">
        <n-pagination :on-update:page="changePage" :item-count="total" show-quick-jumper>
          <template #goto>
            跳至
          </template>
        </n-pagination>
      </n-config-provider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceList {
  background-color: $github-background;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 40px;

  .listContent {}

  .listFoot {
    background-color: $github-card-background;
    min-width: 620px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>