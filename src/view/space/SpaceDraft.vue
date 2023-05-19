<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { useUserStore } from '@/stores/user';
import { getUserDraftPageNumAPI, getUserDraftPageAPI, getDraftLabelListAPI, getDraftThemeListAPI, getUserNamesAPI } from '@/request/api';
import { RequestGetLabelsByIds, RequestGetThemeByIds, RequestGetUserNames, RequestGetUserPage, RequestGetUserPageNum } from '@/request/requestData';
import { Draft, Theme, Label } from '@/request/responseData';
const message = useMessage();
const loading = ref(true);
const userState = useUserStore();
type draftDataType = {
  draftList: Draft[];
  total: number;
  topicList: Theme[],
  tagsList: Array<Label[]>,
};

const draftData = reactive<draftDataType>({
  draftList: [],
  total: 1,
  topicList: [],
  tagsList: [],
});

function changePage(page: number) {
  console.log(`to page ${page}`);
  getDraftPage(page);
}

async function getDraftPage(page: number) {
  const data: RequestGetUserPage = {
    currentPage: page,
    userId: userState.userId,
  };
  const res = await getUserDraftPageAPI(data, userState);
  if (res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
    const draftList = res.data.data;
    const ids: number[] = [];
    for(let i = 0; i < draftList.length; i++) {
      ids.push(draftList[i].id);
    }
    await getLabelList(ids);
    await getThemeList(ids);
    draftData.draftList = draftList;
    loading.value = false;
  } else {
    message.error(res.data.message);
  }
};

async function getThemeList(ids: number[]) {
  const data: RequestGetThemeByIds = {
    ids: ids
  };
  const res = await getDraftThemeListAPI(data);
  if(res.data.status === 0) {
    draftData.topicList = res.data.data;
  } else {
    console.error(res.data.message);
  }
}

async function getLabelList(ids: number[]) {
  const data: RequestGetLabelsByIds = {
    ids: ids
  };
  const res = await getDraftLabelListAPI(data);
  if(res.data.status === 0) {
    draftData.tagsList = res.data.data;
  } else {
    console.error(res.data.message);
  }
}

onMounted(async () => {
  const data: RequestGetUserPageNum = {
    userId: userState.userId
  }
  const res = await getUserDraftPageNumAPI(data, userState);
  if (res.data.status === 0) {
    draftData.total = res.data.data;
    getDraftPage(1);
  } else {
    message.error(res.data.message);
  }
});
</script>

<template>
  <div class="spaceDraft">
    <div class="loading" v-if="loading">
      <n-spin :size="150" stroke="#39c5bb" />
    </div>
    <div v-else>
      <div class="empty" v-if="draftData.draftList.length === 0">
        <img style="height: 300px;margin-top: 100px;" src="@/assets/img/null-search.svg" />
        <div>勇敢的少年啊快去打草稿吧!</div>
      </div>
      <div v-else>
        <div class="draftContent">
          <draft-card v-for="(item, index) in draftData.draftList" :author="item.author" :description="item.description"
            :id="item.id" :title="item.title" :update-time="item.updateTime" :tags="draftData.tagsList[index]" :topic="draftData.topicList[index]"></draft-card>
        </div>
        <div class="draftFoot" v-show="draftData.total !== 1">
          <n-config-provider :theme="darkTheme">
            <n-pagination :on-update:page="changePage" :item-count="draftData.total" show-quick-jumper>
              <template #goto>
                跳至
              </template>
            </n-pagination>
          </n-config-provider>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceDraft {
  background-color: $github-background;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 40px;
  min-height: 550px;

  .empty {
    font-size: 20px;
    color: $github-header-text;
    text-align: center;
  }

  .draftContent {}

  .draftFoot {
    background-color: $github-card-background;
    min-width: 620px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}

.loading {
  @include center;
  position: relative;
  top: 200px;
}
</style>