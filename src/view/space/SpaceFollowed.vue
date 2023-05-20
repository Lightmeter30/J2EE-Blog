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
  if(res.data.status === 0) {
    followedData.ids = res.data.data;
    getBriefInfo(followedData.ids);
  } else {
    console.log(res.data.message);
  }
}

async function getBriefInfo(ids:number[]) {
  const data: RequestGetOtherBriefInfos = {
    ids: ids
  };
  const res = await getOtherBriefInfosAPI(data, userState);
  if(res.data.status === 0) {
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
      <div class="listContent">
        <user-list v-for="(item, index) in followedData.userList" :id="followedData.ids[index]" :avatar="item.avatar" :name="item.name" :description="item.description" :is-attention="item.followed" />
      </div>
      <div class="listFoot" v-show="false" >
        <n-config-provider :theme="darkTheme">
          <n-pagination v-model:page="nowPage" :on-update:page="changePage" :item-count="followedData.total" show-quick-jumper>
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
.loading {
  @include center;
  position: relative;
  top: 200px;
}
</style>