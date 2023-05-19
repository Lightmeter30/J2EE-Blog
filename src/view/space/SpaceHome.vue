<script setup lang="ts">

import { RequestGetUserPageNum, RequestGetUserPage, RequestGetOtherBriefInfos, RequestGetLabelsByIds, RequestGetThemeByIds, RequestGetUserNames, } from '@/request/requestData';
import { Article, Theme, Label } from '@/request/responseData';
import { getArticleLabelListAPI, getArticleThemeListAPI, getOtherBriefInfosAPI, getUserNamesAPI, getUserPageArticlesAPI, getUserPageNumAPI } from '@/request/api';
import { useUserStore } from '@/stores/user';
import { darkTheme } from 'naive-ui';
const message = useMessage();
const userState = useUserStore();
const router = useRouter();
const loading = ref(true);

type homeDataType = {
  currentArticleList: Article[],
  total: number,
  topicList: Theme[],
  tagsList: Array<Label[]>,
};

const homeData = reactive<homeDataType>({
  currentArticleList: [],
  total: 1,
  topicList: [
  ],
  tagsList: [
  ],
});




const changePage = async (page: number) => {
  console.log(`to page ${page}`);
  const data: RequestGetUserPage = {
    userId: Number(router.currentRoute.value.query.id),
    currentPage: page,
  }
  const res = await getUserPageArticlesAPI(data, userState);
  if (res.data.status === 0) {
    // TODO: 接口对接
    // console.log(res);
    if(res.data.data.length === 0) {
      loading.value = false;
      return;
    }
    const currentArticleList = res.data.data;
    const ids: number[] = [];
    const author: number[] = [];
    for (const item of res.data.data) {
      author.push(item.author);
      ids.push(item.id);
    }
    await getUserName(author, currentArticleList);
    await getThemeList(ids);
    await getLabelList(ids);
    homeData.currentArticleList = currentArticleList;
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
    homeData.topicList = res.data.data;
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
    homeData.tagsList = res.data.data;
  } else {
    console.error(res.data.message);
  }
}

const init = async () => {
  const data: RequestGetUserPageNum = {
    userId: Number(router.currentRoute.value.query.id),
  };
  const res = await getUserPageNumAPI(data, userState); res
  if (res.data.status === 0) {
    homeData.total = res.data.data;
    changePage(1);
  } else {
    message.error(res.data.message);
  }
};

onMounted(() => {
  init();
})
</script>

<template>
  <div class="spaceHome">
    <div class="loading" v-if="loading">
      <n-spin :size="150" stroke="#39c5bb" />
    </div>
    <div v-else>
      <div v-if="homeData.currentArticleList.length === 0" class="empty">
        <img style="height: 300px;margin-top: 100px;" src="@/assets/img/null-search.svg" />
        <div>勇敢的少年啊快去写博客吧!</div>
      </div>
      <div v-else>
        <div class="homeContent">
          <div v-for="(item, index) in homeData.currentArticleList" >
            <blog-card :author="item.author"
              :author-name="(item.authorName as string)"
              :card-type="userState.userId === Number(router.currentRoute.value.query.id) ? 2 : 1"
              :description="item.description" 
              :favorites-num="item.favoritesNum" 
              :id="item.id" 
              :title="item.title"
              :update-time="item.updateTime" 
              :comments-num="item.commentsNum" 
              :tags="(homeData.tagsList[index])" 
              :topic="(homeData.topicList[index])"
              >
            </blog-card>
          </div>
        </div>
        <div class="homeFoot" v-show="homeData.total !== 1">
          <n-config-provider :theme="darkTheme">
            <n-pagination :on-update:page="changePage" :item-count="homeData.total" show-quick-jumper>
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
.spaceHome {
  background-color: $github-background;
  border-radius: 5px;
  min-height: 550px;
  padding: 20px;
  margin-bottom: 40px;

  .empty {
    font-size: 20px;
    color: $github-header-text;
    text-align: center;
  }

  .homeContent {}

  .homeFoot {
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
}</style>