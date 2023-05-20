<template>
  <div class="scrollMe">
    <div class="searchView">
      <div class="loading" v-if="loading">
        <n-spin :size="150" stroke="#39c5bb" />
      </div>
      <div v-else class="searchContent">
        <div v-show="searchData.currentArticleList.length === 0" class="empty">
          <img style="height: 300px;margin-top: 100px;" src="@/assets/img/null-search.svg" />
          <div>未检索到相关文章,请更换关键词!</div>
        </div>
        <blog-card v-for="(item, index) in searchData.currentArticleList" :author="item.author"
          :author-name="(item.authorName as string)" :card-type="1" :description="item.description"
          :favorites-num="item.favoritesNum" :id="item.id" :title="item.title" :update-time="item.updateTime"
          :comments-num="item.commentsNum" :topic="searchData.topicList[index]"
          :tags="searchData.tagsList[index]"></blog-card>
      </div>
      <div class="searchFoot" v-show="searchData.total > 1">
        <n-config-provider :theme="darkTheme">
          <n-pagination v-model:page="nowPage" :on-update:page="changePage" :item-count="searchData.total"
            show-quick-jumper>
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
    <side-content />
  </div>
</template>

<script setup lang="ts">
import { NPagination, darkTheme } from 'naive-ui';
import { useUserStore } from '@/stores/user';
import { useSearchStore } from "@/stores/search";
import { Article, Theme, Label } from '@/request/responseData';
import { RequestGetLabelsByIds, RequestGetThemeByIds, RequestGetUserNames, RequestPageFuzzySearch } from '@/request/requestData';
import { getArticleLabelListAPI, getArticleThemeListAPI, getUserNamesAPI, pageFuzzySearchAPI } from '@/request/api';
const userState = useUserStore();
const message = useMessage();
const router = useRouter();
const searchStore = useSearchStore();
const nowPage = ref(1);
const loading = ref(true);
// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";

type searchDataType = {
  currentArticleList: Article[];
  topicList: Theme[],
  tagsList: Array<Label[]>,
  total: number;
};

const searchData = reactive<searchDataType>({
  currentArticleList: [],
  total: 1,
  topicList: [],
  tagsList: [],
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
  loading.value = true;
  const data: RequestPageFuzzySearch = {
    currentPage: curPage,
    search: searchText
  };
  const res = await pageFuzzySearchAPI(data, userState);
  if (res.data.status === 0) {
    // TODO: 接口数据对接
    console.log(res.data.data);
    const currentArticleList = res.data.data.pageArticles;
    const author: Array<number> = [];
    const ids: Array<number> = [];
    for (let i = 0; i < currentArticleList.length; i++) {
      author.push(currentArticleList[i].author);
      ids.push(currentArticleList[i].id);
    }
    await getUserName(author, currentArticleList);
    await getLabelList(ids);
    await getThemeList(ids);
    searchData.currentArticleList = currentArticleList;
    searchData.total = res.data.data.pageNum;
    loading.value = false;
  } else {
    message.error(res.data.message);
  }
}

async function getUserName(ids: number[], currentArticleList: Article[]) {
  const data: RequestGetUserNames = {
    ids: ids
  }
  const res = await getUserNamesAPI(data);
  if (res.data.status == 0) {
    const author = res.data.data;
    for (let i = 0; i < author.length; i++) {
      currentArticleList[i].authorName = author[i];
    }
  } else {
    console.error(res.data.message);
  }
}

async function getThemeList(ids: number[]) {
  const data: RequestGetThemeByIds = {
    ids: ids
  };
  const res = await getArticleThemeListAPI(data);
  if (res.data.status === 0) {
    searchData.topicList = res.data.data;
  } else {
    console.error(res.data.message);
  }
}

async function getLabelList(ids: number[]) {
  const data: RequestGetLabelsByIds = {
    ids: ids
  };
  const res = await getArticleLabelListAPI(data);
  if (res.data.status === 0) {
    searchData.tagsList = res.data.data;
  } else {
    console.error(res.data.message);
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
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 40px;

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
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $scrollbar-color;
  }
}

.empty {
  background-color: $github-card-background;
  padding: 0 0 40px 0;
  border-radius: 15px;
  font-size: 20px;
  color: $github-header-text;
  text-align: center;
}

.loading {
  @include center;
  position: relative;
  top: 200px;
}
</style>