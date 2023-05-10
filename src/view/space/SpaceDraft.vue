<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { getUserDraftPageNumAPI, getUserDraftPageAPI } from '@/request/api';
import { RequestGetUserPage, RequestGetUserPageNum } from '@/request/requestData';
const message = useMessage();
const userState = useUserStore(); 
let total = ref(114);
function changePage(page: number) {
  console.log(`to page ${page}`);
  getDraftPage(page);
}

async function getDraftPage( page: number ) {
  const data: RequestGetUserPage = {
    currentPage: page,
    userId: userState.userId,
  };
  const res = await getUserDraftPageAPI( data, userState );
  if(res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
  } else {
    message.error(res.data.message);
  }
};

onMounted( async () => {
  const data: RequestGetUserPageNum = {
    userId: userState.userId
  }
  const res = await getUserDraftPageNumAPI( data, userState );
  if(res.data.status === 0 ) {
    total.value = res.data.data;
    getDraftPage(1);
  } else {
    message.error(res.data.message);
  }
});
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