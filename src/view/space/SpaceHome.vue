<script setup lang="ts">

import { RequestGetUserPageNum, RequestGetUserPage } from '@/request/requestData';
import { Article } from '@/request/responseData';
import { getUserPageArticlesAPI, getUserPageNumAPI } from '@/request/api';
import { useUserStore } from '@/stores/user';
import { darkTheme } from 'naive-ui';
const message = useMessage();
const userState = useUserStore();
const router = useRouter();

type homeDataType = {
  currentArticleList: Article[],
  total: number,
};

const homeData = reactive<homeDataType>({
  currentArticleList: [],
  total: 1,
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
    console.log(res);
    homeData.currentArticleList = res.data.data;
  } else {
    message.error(res.data.message);
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
    <div class="homeContent">
      <blog-card v-for="item in homeData.currentArticleList" :author="item.author" :author-name="'takune'"
        :card-type="userState.userId === Number(router.currentRoute.value.query.id) ? 2 : 1" :description="item.description" :favorites-num="item.favoritesNum" :id="item.id"
        :title="item.title" :update-time="item.updateTime" :comments-num="item.commentsNum"></blog-card>
    </div>
    <div class="homeFoot">
      <n-config-provider :theme="darkTheme">
        <n-pagination :on-update:page="changePage" :item-count="homeData.total" show-quick-jumper>
          <template #goto>
            跳至
          </template>
        </n-pagination>
      </n-config-provider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceHome {
  background-color: $github-background;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 40px;

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
</style>