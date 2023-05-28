<template>
  <div class="scrollMe">
    <SideContent />
    <div class="home">
      <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
      <div class="loading" v-if="loading">
        <n-spin :size="150" stroke="#39c5bb" />
      </div>
      <div v-else class="homeContent">
        <blog-card v-for="(item, index) in homeData.currentArticleList" :author="item.author"
          :author-name="(item.authorName as string)" :card-type="1" :description="item.description"
          :favorites-num="item.favoritesNum" :id="item.id" :title="item.title" :update-time="item.updateTime"
          :comments-num="item.commentsNum" :tags="homeData.tagsList[index]"
          :topic="homeData.topicList[index]"></blog-card>
      </div>
      <div class="homeFoot" v-show="homeData.total > 1 && !loading">
        <n-config-provider :theme="darkTheme">
          <n-pagination v-model:page="nowPage" :on-update:page="changePage" :page-count="homeData.total"
            show-quick-jumper>
            <template #goto>
              跳至
            </template>
          </n-pagination>
        </n-config-provider>
      </div>
      <div style="height: 20px;"></div>
      <n-back-top :right="'1.3%'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPagination } from 'naive-ui';
import { RequestGetUserNames, RequestGetPageArticles, RequestGetLabelsByIds, RequestGetThemeByIds } from '@/request/requestData';
import { Article, Theme, Label } from '@/request/responseData';
import { getHomePageArticlesAPI, getHomePageNumAPI, getUserNamesAPI, getArticleLabelListAPI, getArticleThemeListAPI } from '@/request/api';
import { darkTheme } from 'naive-ui';
import SideContent from '@/components/SideContent.vue';

const message = useMessage();
const router = useRouter();
const nowPage = ref(1);
const loading = ref(true);

type homeDataType = {
  currentArticleList: Article[],
  topicList: Theme[],
  tagsList: Array<Label[]>,
  total: number,
};

const homeData = reactive<homeDataType>({
  currentArticleList: [],
  total: 1,
  topicList: [],
  tagsList: [],
});

const changePage = async (page: number) => {
  loading.value = true;
  nowPage.value = page;
  const data: RequestGetPageArticles = {
    currentPage: page,
  }
  const res = await getHomePageArticlesAPI(data);
  if (res.data.status === 0) {
    // TODO: 接口对接
    console.log(res);
    const currentArticleList = res.data.data;
    const author: Array<number> = [];
    const ids: number[] = [];
    for (let i = 0; i < currentArticleList.length; i++) {
      author.push(currentArticleList[i].author);
      ids.push(currentArticleList[i].id);
    }
    await getUserName(author, currentArticleList);
    await getThemeList(ids);
    await getLabelList(ids);
    homeData.currentArticleList = currentArticleList;
    loading.value = false;
  } else {
    message.error(res.data.message, { duration: 1200 });
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
  const res = await getHomePageNumAPI();
  if (res.data.status === 0) {
    homeData.total = res.data.data;
    changePage(1);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

onMounted(() => {
  init();
})

</script>

<style scoped lang="scss">
.home {
  width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 25px;

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

.scrollMe {
  height: 95%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: $scrollbar-color $github-background;
  background: url('@/assets/img/personalBackground.jpg');
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