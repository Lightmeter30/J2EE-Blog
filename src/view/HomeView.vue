<template>
  <div class="scrollMe">
    <div class="sideContent">
      <user-card />
      <div class="sideCard">
        <div class="title">
          <n-icon color="#C70002" style="position: relative; top: 3px;" ><american-football-sharp/></n-icon>
          本站简介
        </div>
        <div class="content">
          欢迎来到<span style="color: #39c5bb;" >ヽ(*ﾟдﾟ)ノBlog!</span> 你可以在本博客网站上创建属于自己的账号, 用博客分享自己学习上的心得和生活上的趣事。若遇到任何技术性问题，欢迎联系站长。
        </div>
      </div>
      <div class="sideCard">
        <div class="title">
          <n-icon color="#6FA802" style="position: relative; top: 3px;" ><albums/></n-icon>
          博客分组
        </div>
        <div class="content">
          <div v-for="item in homeData.groupList" @click="toGroup(item.id)" class="groupItem">
            <div>{{ item.name }}</div>
            <div>{{ item.articleNum }}</div>
          </div>
        </div>
      </div>
      <div class="sideCard">
        <div class="title">
          <n-icon color="#CFD0CF" style="position: relative; top: 3px;" ><PricetagsSharp/></n-icon>
          热门标签
        </div>
        <div class="wordContent">
          <TagsCloud  @tag-click="tagClick" />
        </div>
      </div>
    </div>
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
        <n-back-top :right="'1.3%'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPagination } from 'naive-ui';
import { RequestGetPageArticles } from '@/request/requestData';
import { Article } from '@/request/responseData';
import { getHomePageArticlesAPI, getHomePageNumAPI } from '@/request/api';
import { darkTheme } from 'naive-ui';
import { AmericanFootballSharp, Albums, PricetagsSharp } from '@vicons/ionicons5';
// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";
const message = useMessage();

interface Topics {
  id: number;
  name: string;
  articleNum: number;
};

type homeDataType = {
  currentArticleList: Article[],
  groupList: Topics[],
  total: number,
};

const homeData = reactive<homeDataType>({
  currentArticleList: [{
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 12,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 11,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 122,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 111,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 11,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 122,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 111,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 11,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 122,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
  {
    author: 1,
    authorName: 'takune',
    commentsNum: 12,
    id: 122,
    favoritesNum: 15,
    title: 'Hello World',
    updateTime: '2022-01-02 13:00:00',
  },
],
  groupList: [
  {
    id: 1,
    name: '计算机',
    articleNum: 10,
  },
  {
    id: 2,
    name: '二次元',
    articleNum: 8,
  },
  {
    id: 3,
    name: '生活区',
    articleNum: 101,
  },
  {
    id: 4,
    name: '舞蹈区',
    articleNum: 123,
  },
  {
    id: 5,
    name: '哲学区',
    articleNum: 114,
  },
  {
    id: 6,
    name: '视频区',
    articleNum: 90,
  },
  {
    id: 7,
    name: '游戏区',
    articleNum: 1,
  },
],
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

function tagClick(id: number) {
  console.log(id);
}

function toGroup(id: number) {
  console.log(`to group ${id}`);
}

onMounted(() => {
  init();
})

</script>

<style scoped lang="scss">
.home {
  width: 60%;
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

.sideContent {
  margin-top: 20px;
  margin-right: 25px;

  .sideCard {
    background-color: $github-card-background;
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    max-width: 250px;

    .title {
      font-size: 19px;
      line-height: 19px;
      color: white;
      font-weight: bold;
    }

    .content {
      margin-top: 20px;
      font-size: 16px;
      line-height: 20px;
      color: $github-header-text;

      .groupItem {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        transition: all .3s;
        padding: 5px;
        cursor: pointer;

        &:hover{
          padding-left: 10px;
          padding-right: 10px;
          background-color: rgb(56,56,56);
        }
      }
    }

    .wordContent {
      margin-top: 20px;
      height: 250px;
    }
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
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $scrollbar-color;
  }
}
</style>