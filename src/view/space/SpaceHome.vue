<script setup lang="ts">

import { RequestGetUserPageNum, RequestGetUserPage } from '@/request/requestData';
import { getUserPageArticlesAPI, getUserPageNumAPI } from '@/request/api';
import { useUserStore } from '@/stores/user';
const message = useMessage();
const userState = useUserStore();
const router = useRouter();
let total = ref(114);

const changePage = async (page: number) => {
  console.log(`to page ${page}`);
  const data: RequestGetUserPage = {
    userId: Number(router.currentRoute.value.query.id),
    currentPage: page,
  }
  const res = await getUserPageArticlesAPI(data, userState);
  if (res.data.status === 0) {
    // TODO: 接口对接
    console.log(res);
  } else {
    message.error(res.data.message);
  }
}

const init = async () => {
  const data: RequestGetUserPageNum = {
    userId: Number(router.currentRoute.value.query.id),
  };
  const res = await getUserPageNumAPI(data, userState); res
  if (res.data.status === 0) {
    total.value = res.data.data;
    changePage(1);
  } else {
    message.error(res.data.message);
  }
};

onMounted(() => {
  init();
})
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