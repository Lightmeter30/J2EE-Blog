<template>
  <div class="scrollMe">
    <SideContent />
    <div class="searchView">
      <div class="loading" v-if="loading">
        <n-spin :size="150" stroke="#39c5bb" />
      </div>
      <div v-else class="searchContent">
        <blog-card v-for="(item, index) in groupData.currentArticleList" :author="item.author"
          :author-name="(item.authorName as string)" :card-type="1" :description="item.description"
          :favorites-num="item.favoritesNum" :id="item.id" :title="item.title" :update-time="item.updateTime"
          :comments-num="item.commentsNum" :tags="groupData.tagsList[index]"
          :topic="groupData.topicList[index]"></blog-card>
      </div>
      <div class="searchFoot" v-show="groupData.total > 1">
        <n-config-provider :theme="darkTheme">
          <n-pagination v-model:page="nowPage" :on-update:page="changePage" :item-count="groupData.total"
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
  </div>
</template>

<script setup lang="ts">
import { NPagination, darkTheme } from 'naive-ui';
import { useUserStore } from '@/stores/user';
import { useSearchStore } from "@/stores/search";
import { Article, Theme, Label } from '@/request/responseData';
import { RequestGetThemeArticlePageNum, RequestGetPageThemeArticleIds, RequestGetByIdList, RequestGetUserNames, RequestGetLabelsByIds, RequestGetThemeByIds } from '@/request/requestData';
import { getThemeArticlePageNumAPI, getPageThemeArticleIdsAPI, getArticleByIdListAPI, getUserNamesAPI, getArticleLabelListAPI, getArticleThemeListAPI } from '@/request/api';
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

type groupDataType = {
  currentArticleList: Article[];
  total: number;
  topicList: Theme[],
  tagsList: Array<Label[]>,
};

const groupData = reactive<groupDataType>({
  currentArticleList: [],
  topicList: [],
  tagsList: [],
  total: 1,
});

async function changePage(page: number) {
  nowPage.value = page;
  const data: RequestGetPageThemeArticleIds = {
    themeId: Number(router.currentRoute.value.query.id),
    currentPage: page,
  };
  const res = await getPageThemeArticleIdsAPI(data);
  if (res.data.status === 0) {
    getArticle(res.data.data);
  } else {
    console.log(res.data);
  }
}

async function getArticle(ids: number[]) {
  loading.value = true;
  const data: RequestGetByIdList = {
    ids: ids
  }
  const res = await getArticleByIdListAPI(data);
  if (res.data.status === 0) {
    const currentArticleList = res.data.data;
    // TODO: 查询作者姓名
    const author: number[] = [];
    const ids: number[] = [];
    for (let i = 0; i < currentArticleList.length; i++) {
      author[i] = currentArticleList[i].author;
      ids[i] = currentArticleList[i].id;
    }
    await getUserName(author, currentArticleList);
    await getThemeList(ids);
    await getLabelList(ids);
    groupData.currentArticleList = currentArticleList;
    loading.value = false;
  } else {
    console.log(res.data);
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
    groupData.topicList = res.data.data;
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
    groupData.tagsList = res.data.data;
  } else {
    console.error(res.data.message);
  }
}

async function init() {
  const data: RequestGetThemeArticlePageNum = {
    themeId: Number(router.currentRoute.value.query.id),
  }
  const res = await getThemeArticlePageNumAPI(data);
  if (res.data.status === 0) {
    groupData.total = res.data.data;
  } else {
    console.log(res.data);
  }
}

watch(
  () => router.currentRoute.value.query.id,
  (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    init();
    changePage(1);
  },
);

onMounted(() => {
  init();
  changePage(1);
})

</script>

<style scoped lang="scss">
.searchView {
  width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 25px;

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
.loading {
  @include center;
  position: relative;
  top: 200px;
}
</style>