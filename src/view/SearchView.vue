<template>
  <div class="searchView">
    <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
    <div class="searchContent">
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
      <blog-card></blog-card>
    </div>
    <div class="searchFoot">
      <n-pagination v-model:page="nowPage" :on-update:page="changePage" :item-count="total" show-quick-jumper>
        <template #goto>
          跳至
        </template>
      </n-pagination>
    </div>
    <div style="height: 20px;"></div>
  </div>
</template>

<script setup lang="ts">
import { NPagination } from 'naive-ui';
import { useUserStore } from '@/stores/user';
import { useSearchStore } from "@/stores/search";
import { initCustomFormatter } from 'vue';
import { RequestPageFuzzySearch } from '@/request/requestData';
import { pageFuzzySearchAPI } from '@/request/api';
const userState = useUserStore();
const message = useMessage();
const router = useRouter();
const searchStore = useSearchStore();
const nowPage = ref(1);
// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";

let total = ref(114);
function changePage(page: number) {
  nowPage.value = page;
  searchAPI(page, searchStore.searchText);
}

searchStore.$subscribe((obj, param1) => {
  console.log('change from subscribe');
  nowPage.value = 1;
  searchAPI(nowPage.value, param1.searchText);
})

async function searchAPI(curPage: number, searchText: string) {
  const data: RequestPageFuzzySearch = {
    currentPage: curPage,
    search: searchText
  };
  const res = await pageFuzzySearchAPI(data, userState);
  if (res.data.status === 0) {
    // TODO: 接口数据对接
    console.log(res.data.data);
  } else {
    message.error(res.data.message);
  }
}

onMounted(() => {
  console.log('change from onMounted');
  searchAPI(1, searchStore.searchText);
})

</script>

<style scoped lang="scss">
.searchView {
  width: 70%;
  position: relative;
  left: 15%;
  margin-top: 20px;
  margin-bottom: 20px;

  .searchContent {}

  .searchFoot {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>