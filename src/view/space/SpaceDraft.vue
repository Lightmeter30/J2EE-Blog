<script setup lang="ts">
import {darkTheme} from "naive-ui";
import { useUserStore } from '@/stores/user';
import { getUserDraftPageNumAPI, getUserDraftPageAPI } from '@/request/api';
import { RequestGetUserPage, RequestGetUserPageNum } from '@/request/requestData';
import {Draft} from '@/request/responseData';
const message = useMessage();
const userState = useUserStore(); 
type draftDataType = {
  draftList: Draft[];
  total: number;
};

const draftData = reactive<draftDataType>({
  draftList: [],
  total: 1,
});

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
    draftData.draftList = res.data.data;
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
    draftData.total = res.data.data;
    getDraftPage(1);
  } else {
    message.error(res.data.message);
  }
});
</script>

<template>
  <div class="spaceDraft">
    <div class="draftContent">
      <draft-card v-for="item in draftData.draftList" :author="item.author" :description="item.description" :id="item.id" :title="item.title" :update-time="item.updateTime" ></draft-card>
    </div>
    <div class="draftFoot" v-show="draftData.total !== 1" >
      <n-config-provider :theme="darkTheme">
      <n-pagination :on-update:page="changePage" :item-count="draftData.total" show-quick-jumper>
        <template #goto>
          跳至
        </template>
      </n-pagination>
      </n-config-provider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceDraft {
  background-color: $github-background;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 40px;

  .draftContent {

  }

  .draftFoot {
    background-color: $github-card-background;
    min-width: 620px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>