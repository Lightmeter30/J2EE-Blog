<template>
  <div class="scrollMe">
    <div class="home">
      <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
      <div class="homeContent">
        <blog-card v-for="item in homeData.currentArticleList" :author="item.author" :author-name="item.authorName"
          :card-type="1" :description="item.description" :favorites-num="item.favoritesNum" :id="item.id"
          :title="item.title" :update-time="item.updateTime" :comments-num="item.commentsNum" ></blog-card>
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
      <div style="height: 20px;"></div>
      <n-config-provider :theme="darkTheme">
        <n-back-top :right="'1.3%'" />
      </n-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPagination } from 'naive-ui';
import { RequestGetPageArticles } from '@/request/requestData';
import { Article } from '@/request/responseData';
import { getHomePageArticlesAPI, getHomePageNumAPI } from '@/request/api';
import { darkTheme } from 'naive-ui';
// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";
const message = useMessage();

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
  const data: RequestGetPageArticles = {
    currentPage: page,
  }
  const res = await getHomePageArticlesAPI(data);
  if (res.data.status === 0) {
    // TODO: 接口对接
    console.log(res);
    homeData.currentArticleList = res.data.data;
  } else {
    message.error(res.data.message, {duration: 1200});
  }
}

const init = async () => {
  const res = await getHomePageNumAPI();
  if (res.data.status === 0) {
    homeData.total = res.data.data;
    changePage(1);
  } else {
    message.error(res.data.message, {duration: 1200});
  }
};

onMounted(() => {
  init();
})

</script>

<style scoped lang="scss">
.home {
  width: 60%;
  position: relative;
  left: 20%;
  margin-top: 20px;
  margin-bottom: 20px;

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
  background: url('@/assets/img/background.jpg');
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