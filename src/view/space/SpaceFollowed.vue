<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { getUserFollowListAPI, getOtherBriefInfosAPI } from "@/request/api";
import { RequestGetOtherBriefInfos } from "@/request/requestData";
import { useUserStore } from "@/stores/user";
import { BriefInfo } from "@/request/responseData";

const router = useRouter();
const nowPage = ref(1);
const loading = ref(true);
const userState = useUserStore();
interface followedDataType {
  total: number;
  ids: number[];
  userList: BriefInfo[];
};

const followedData = reactive<followedDataType>({
  total: 1,
  ids: [],
  userList: [],
});

function changePage(page: number) {
  console.log(`to page ${page}`);
}

async function init() {
  const res = await getUserFollowListAPI(userState);
  if (res.data.status === 0) {
    if (res.data.data.length === 0) {
      loading.value = false;
      return;
    }
    followedData.ids = res.data.data;
    getBriefInfo(followedData.ids);
  } else {
    console.error(res.data.message);
  }
}

async function getBriefInfo(ids: number[]) {
  const data: RequestGetOtherBriefInfos = {
    ids: ids
  };
  const res = await getOtherBriefInfosAPI(data, userState);
  if (res.data.status === 0) {
    followedData.userList = res.data.data;
    loading.value = false;
  } else {
    console.error(res.data);
  }
}

onMounted(() => {
  init();
})
</script>

<template>
  <div class="spaceList">
    <div class="loading" v-if="loading">
      <n-spin :size="150" stroke="#39c5bb" />
    </div>
    <div v-else>
      <div v-if="followedData.userList.length === 0" class="empty">
        <img style="height: 300px;margin-top: 100px;" src="@/assets/img/null-search.svg" />
        <div>您还没有关注的用户哦!</div>
      </div>
      <div v-else class="listContent">
        <user-list v-for="(item, index) in followedData.userList" :id="followedData.ids[index]" :avatar="item.avatar"
          :name="item.name" :description="item.description" :is-attention="item.followed" />
      </div>
      <div class="listFoot" v-show="false">
        <n-config-provider :theme="darkTheme">
          <n-pagination v-model:page="nowPage" :on-update:page="changePage" :item-count="followedData.total"
            show-quick-jumper>
            <template #goto>
              跳至
            </template>
          </n-pagination>
        </n-config-provider>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceList {
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

  .listFoot {
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