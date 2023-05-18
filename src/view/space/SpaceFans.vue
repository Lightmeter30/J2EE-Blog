<script setup lang="ts">
import { getOtherBriefInfosAPI } from "@/request/api";
import { RequestGetOtherBriefInfos } from "@/request/requestData";
import { BriefInfo } from "@/request/responseData";
import { useUserStore } from "@/stores/user";
import { darkTheme } from "naive-ui";

const userState = useUserStore();
const router = useRouter();

interface fansDataType {
  total: number;
  ids: number[];
  userList: BriefInfo[];
}
const fansData = reactive<fansDataType>({
  total: 1,
  ids: [],
  userList: [],
});
function changePage(page: number) {
  console.log(`to page ${page}`);
}
const loading = ref(true);

async function init() {
  console.log(`111`);
}

async function getBriefInfo(ids:number[]) {
  const data: RequestGetOtherBriefInfos = {
    ids: ids
  };
  const res = await getOtherBriefInfosAPI(data, userState);
  if(res.data.status === 0) {
    fansData.userList = res.data.data;
    loading.value = false;
  } else {
    console.error(res.data);
  }
}

onMounted(() => {
  console.log(router.currentRoute.value);
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
        <user-list v-for="(item, index) in fansData.userList" :id="fansData.ids[index]" :avatar="item.avatar" :name="item.name" :description="item.description" :is-attention="item.followed" />
      </div>
      <div class="listFoot" v-show="false" >
        <n-config-provider :theme="darkTheme">
          <n-pagination :on-update:page="changePage" :item-count="fansData.total" show-quick-jumper>
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