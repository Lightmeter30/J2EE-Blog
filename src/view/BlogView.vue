<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import MdEditor from 'md-editor-v3';
import { useUserStore } from '@/stores/user';
import { Send, Person, Time, Star, Close, PricetagsSharp, Albums, Balloon } from '@vicons/ionicons5';
import { getArticleAPI, getArticleThemeAPI, getArticleLabelsAPI, getArticleCommentsAPI, getUserAllCollectAPI, addArticleCommentAPI, addArticleToCollectAPI, getOtherInfoAPI, getOtherBriefInfosAPI } from '@/request/api';
import { RequestGetArticle, RequestGetTheme, RequestGetLabels, RequestGetOtherBriefInfos, RequestGetOtherInfo, RequestGetArticleComments, RequestAddComment, RequestAddFavorite } from '@/request/requestData';
import { getNowTime } from '@/utils/validate';
import { FavoriteFolder, Article, Comment, DataGetInfo, Theme, Label } from '@/request/responseData';
import { darkTheme } from 'naive-ui';

// const blog = {
//   title: 'typescript/javascript学习笔记',
//   description: '这是我学习typescript/javascript的学习笔记，其中以typescript为主，同时会介绍一点javascript里面会有的知识点',
//   author: faker.name.firstName(),
//   time: '2022-05-01 12:11:11',
//   collectNum: 114,
//   commentNum: 10,
//   comment: [],
// }

// const folder = reactive(List);
type blogDataType = {
  blog: Article,
  cardInfo: DataGetInfo,
  collectList: FavoriteFolder[],
  commentList: Comment[],
  topic: Theme,
  tags: Label[]
};
const blogData = reactive<blogDataType>({
  blog: {
    author: 0,
    authorName: '',
    commentsNum: 0,
    content: '',
    favoritesNum: 0,
    id: 0,
    title: '',
    updateTime: '',
    CommentOrderNum: 0,
  },
  cardInfo: {
    articleNum: 0,
    avatar: '',
    birthday: '',
    defaultFavoriteFolder: 0,
    description: '',
    email: '',
    followedNum: 0,
    followerNum: 0,
    name: '',
    sex: false, // 0女 1男
    followed: false
  },
  collectList: [],
  commentList: [],
  topic: {
    id: 1,
    name: '',
  },
  tags: []
});
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const message = useMessage();
// const blogContent = ref('');
const myComment = ref('');
const showModal = ref(false);

async function comment() {
  console.log('comment', myComment);
  const data: RequestAddComment = {
    articleId: Number(router.currentRoute.value.query.id),
    time: getNowTime(),
    content: myComment.value
  };
  const res = await addArticleCommentAPI(data, userStore);
  if (res.data.status === 0) {
    // TODO: API test
    console.log(res.data.data);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

function showDialog() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  console.log('closeModal');
}

function toTheme() {
  const newPage = router.resolve({ path: '/group', query: { id: blogData.topic.id } });
  window.open(newPage.href, '_blank');
}

function toTags(id: number) {
  const newPage = router.resolve({ path: '/tags', query: { id: id } });
  window.open(newPage.href, '_blank');
}

async function addBlogToCollect(collectID: number, collectName: string) {
  console.log(collectID);
  const data: RequestAddFavorite = {
    articleId: Number(router.currentRoute.value.query.id),
    folderId: collectID
  };
  const res = await addArticleToCollectAPI(data, userStore);
  if (res.data.status === 0) {
    message.success(`成功添加到${collectName}!`, { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

async function getComments() {
  const data: RequestGetArticleComments = {
    articleId: Number(router.currentRoute.value.query.id)
  };
  const res = await getArticleCommentsAPI(data, userStore);
  if (res.data.status === 0) {
    // TODO: API test
    // console.log(res.data.data);
    blogData.commentList = res.data.data;
    const ids: number[] = [];
    for (const item of res.data.data) {
      ids.push(item.id);
    }
    getBriefInfo(ids);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

async function getBriefInfo(ids: number[]) {
  const data: RequestGetOtherBriefInfos = {
    ids: ids
  };
  const res = await getOtherBriefInfosAPI(data, userStore);
  if (res.data.status === 0) {
    const temp = res.data.data;
    for (let i = 0; i < temp.length; i++) {
      blogData.commentList[i].avatar = temp[i].avatar;
      blogData.commentList[i].userName = temp[i].name;
    }
  } else {
    message.error(res.data.message)
  }
}

const getArticle = async () => {
  const data: RequestGetArticle = {
    id: Number(router.currentRoute.value.query.id)
  }
  const res = await getArticleAPI(data, userStore);
  if (res.data.status === 0) {
    blogData.blog = res.data.data;
    getGroupAndTags(Number(router.currentRoute.value.query.id));
    getUserCardInfo();
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

const getUserCardInfo = async () => {
  const data: RequestGetOtherInfo = {
    id: blogData.blog.author,
  };
  const res = await getOtherInfoAPI(data, userStore);
  if (res.data.status === 0) {
    blogData.cardInfo = res.data.data;
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

const getAllFolders = async () => {
  const res = await getUserAllCollectAPI(userStore);
  if (res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
    blogData.collectList = res.data.data;
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

const getGroupAndTags = async (id: number) => {
  const data: RequestGetTheme = {
    id: id,
  }
  const res = await getArticleThemeAPI(data);
  if (res.data.status === 0) {
    blogData.topic = res.data.data;
  } else {
    message.error(res.data.message);
  }
  const data1: RequestGetLabels = {
    id: id
  };
  const res1 = await getArticleLabelsAPI(data1);
  if (res1.data.status === 0) {
    blogData.tags = res1.data.data;
  } else {
    message.error(res.data.message);
  }
};

function goPersonalPage(id: number) {
  const newPage = router.resolve({ path: '/space/home', query: { id: id } });
  window.open(newPage.href, '_blank');
}



onMounted(() => {
  getArticle();
  getComments();
  getAllFolders();
})
</script>
<template>
  <div class="scrollMe">
    <div class="blogContent">
      <div class="card">
        <user-card :id="blogData.blog.author" :attention="blogData.cardInfo.followedNum"
          :blog="blogData.cardInfo.articleNum" :fans="blogData.cardInfo.followerNum" :name="blogData.cardInfo.name"
          :is-attention="(blogData.cardInfo.followed as boolean)" :url="blogData.cardInfo.avatar"></user-card>
        <div class="sideCard">
          <div class="sideCardTitle">
            <n-icon color="#C70002" style="position: relative; top: 3px;"><Balloon/></n-icon>
            博客简介
          </div>
          <div class="sideCardContent">
            {{ blogData.blog.description }}
          </div>
        </div>
      </div>
      <div class="content">
        <div class="titleContent">
          <h1 style="margin: 0;">{{ blogData.blog.title }}</h1>
          <div class="titleInfo">
            <span @click="goPersonalPage(blogData.blog.author)" class="author"><span
                style="position: relative; top: 1.6px;"><n-icon>
                  <Person />
                </n-icon></span> {{ blogData.cardInfo.name }}</span> <!-- TODO: change author to authorName -->
            <span style="margin-left: 10px;"><span
                style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span>
              更新于{{ blogData.blog.updateTime }}</span>
            <span class="author" @click="showDialog" style="margin-left: 10px;"><span
                style="position: relative; top: 1.6px;"><n-icon>
                  <Star />
                </n-icon></span> 收藏 : {{ blogData.blog.favoritesNum }}</span> <br />
            <span @click="toTheme" class="author topic">
              <n-icon style="position: relative; top: 3px;padding-right: 4px;">
                <Albums />
              </n-icon>
              <span>{{ blogData.topic.name }}</span></span> &nbsp;
            <span v-show="blogData.tags.length !== 0">
              <b>|</b>&nbsp;
              <n-icon style="position: relative; top: 3px;padding-right: 8px;">
                <PricetagsSharp />
              </n-icon>
              <span v-for="(item, index) in blogData.tags" class="tagItem" @click="toTags(item.id)">
                <span class="name">{{ item.name }}</span><span class="split"
                  v-show="index !== blogData.tags.length - 1">·</span>
              </span>
            </span>
          </div>
        </div>
        <MdEditor theme="dark" v-model="blogData.blog.content" :preview-only="true"></MdEditor>
        <div class="comment">
          <h1>留言</h1>
          <comment-list v-for="item in blogData.commentList" :article-id="item.articleId" :content="item.content"
            :id="item.id" :order-num="item.orderNum" :time="item.time" :user-id="item.userId" :avatar="item.avatar"
            :user-name="item.userName"></comment-list>
          <div class="myComment">
            <div class="myAvatar">
              <n-avatar round :size="60" :src="userStore.staticHead + userStore.avatar" />
            </div>
            <div class="myInput">
              <n-input v-model:value="myComment" type="textarea" placeholder="请输入你的留言(限100字)" show-count
                maxlength="100"></n-input>
            </div>
            <div class="mySubmit">
              <n-button color="#39c5bb" @click="comment">
                <template #icon>
                  <n-icon>
                    <Send />
                  </n-icon>
                </template>
                发布</n-button>
            </div>
          </div>
        </div>
      </div>
      <n-config-provider :theme="darkTheme">
        <n-modal v-model:show="showModal">
          <n-card style="width: 500px;" title="收藏" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
              <div class="modalClose" @click="closeModal()">
                <n-icon size="large">
                  <Close />
                </n-icon>
              </div>
            </template>
            <div class="collectList">
              <div v-for="item in blogData.collectList">
                <div class="collectItem">
                  <div class="title">
                    <span>
                      {{ item.name }}
                    </span>
                  </div>
                  <div class="collectButton">
                    <n-button color="#39c5bb" @click="addBlogToCollect(item.id, item.name)">
                      收藏
                    </n-button>
                  </div>
                </div>
                <div style="height: 1px;background-color: rgb(32,32,32)"></div>
              </div>
            </div>
            <!-- <template #footer>
          尾部
        </template> -->
          </n-card>
        </n-modal>
      </n-config-provider>
      <n-config-provider :theme="darkTheme">
        <n-back-top :right="'1.3%'" />
      </n-config-provider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blogContent {
  position: relative;
  left: 5%;
  width: 90%;
  // background-color: $cloud-0-hex;
  height: auto;
  display: flex;
  justify-content: space-around;

  .card {
    position: relative;
    left: -20px;
    padding-top: 40px;

    .sideCard {
      background-color: $github-card-background;
      margin-top: 20px;
      padding: 20px;
      border-radius: 10px;
      max-width: 250px;

      .sideCardTitle {
        font-size: 19px;
        line-height: 19px;
        color: white;
        font-weight: bold;
      }

      .sideCardContent {
        margin-top: 20px;
        font-size: 16px;
        line-height: 20px;
        color: $github-header-text;
      }
    }
  }

  .titleContent {
    padding-left: 20px;
    padding-right: 20px;

    h1 {
      color: $github-header-text;
    }

    .titleInfo {
      margin-top: 10px;
      padding: 15px;
      // background-color: rgb(248, 248, 248);
      background-color: $github-card-background;
      color: $cloud-1-hex;

      .tagItem {
        .name {
          cursor: pointer;
          font-weight: bold;

          &:hover {
            color: $miku-fans-theme;
            text-decoration-line: underline;
          }
        }

        .split {
          font-weight: bold;
          padding-left: 4px;
          padding-right: 4px;
          position: relative;
          top: 0.6px;
        }
      }

      .author {
        @include text-hover;
      }
    }
  }

  .content {
    position: relative;
    top: 40px;
    width: 75%;
    min-width: 800px;
    padding: 20px;
    background-color: rgb(0, 1, 2);
    border-radius: 1rem;
    min-height: 560px;
    margin-bottom: 80px;
    /* may change */

    .comment {
      padding: 20px;

      h1 {
        color: $cloud-1-hex;
      }

      .myComment {
        display: flex;
        background-color: $github-card-background;
        padding: 20px;
        border-radius: 5px;

        .myAvatar {
          margin-right: 35px;
          margin-top: 10px;
        }

        .myInput {
          width: 70%;
          margin-right: 20px;
        }

        .mySubmit {
          @include center;
          width: 15%;
        }
      }
    }
  }
}

.modalClose {
  cursor: pointer;
  height: 18px;
  border-radius: 1px;

  &:hover {
    background-color: $cloud-1-hex;
    color: white;
  }
}

.collectList {
  .collectItem {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    font-size: medium;


    .title {
      @include center;
    }

    &:hover {
      background-color: $github-card-hover;
    }
  }
}

.scrollMe {
  height: 95%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: $scrollbar-color $github-background;
  background: url('@/assets/img/blog.jpg');
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

.topic {
  font-weight: bold;
}
</style>