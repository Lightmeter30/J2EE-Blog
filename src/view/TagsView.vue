<template>
  <div class="scrollMe">
    <div class="searchView">
      <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
      <div class="searchContent">
        <blog-card v-for="item in searchData.currentArticleList" :author="item.author" :author-name="item.authorName"
          :card-type="1" :description="item.description" :favorites-num="item.favoritesNum" :id="item.id"
          :title="item.title" :update-time="item.updateTime" :comments-num="item.commentsNum" ></blog-card>
      </div>
      <div class="searchFoot">
        <n-config-provider :theme="darkTheme">
          <n-pagination v-model:page="nowPage" :on-update:page="changePage" :item-count="searchData.total" show-quick-jumper>
            <template #goto>
              跳至
            </template>
          </n-pagination>
        </n-config-provider>
      </div>
      <div style="height: 20px;"></div>
      <n-config-provider :theme="darkTheme">
        <n-back-top :right="'1.3%'" />
      </n-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPagination, darkTheme } from 'naive-ui';
import { useUserStore } from '@/stores/user';
import { useSearchStore } from "@/stores/search";
import { Article } from '@/request/responseData';
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

type searchDataType = {
  currentArticleList: Article[];
  total: number;
};

const searchData = reactive<searchDataType>({
  currentArticleList: [],
  total: 1,
});
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
    searchData.currentArticleList = res.data.data.pageArticles;
    searchData.total = res.data.data.pageNum;
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
  width: 60%;
  position: relative;
  left: 20%;
  margin-top: 20px;
  margin-bottom: 20px;

  .searchContent {}

  .searchFoot {
    background-color: $github-card-background;
    min-width: 620px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}

.scrollMe {
  height: 95%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: $scrollbar-color $github-background;
  background: url('@/assets/img/search.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0;
  opacity: 0.8;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $scrollbar-color;
  }
}
</style>