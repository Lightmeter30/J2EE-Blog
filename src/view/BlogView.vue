<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import MdEditor from 'md-editor-v3';
import { useUserStore } from '@/stores/user';
import { Send, Person, Time, Star, Close } from '@vicons/ionicons5';
import { getArticleAPI, getArticleCommentsAPI, getUserAllCollectAPI, addArticleCommentAPI, addArticleToCollectAPI } from '@/request/api';
import { RequestGetArticle, RequestGetArticleComments, RequestAddComment, RequestAddFavorite } from '@/request/requestData';
import { getNowTime } from '@/utils/validate';
import { FavoriteFolder, Article, Comment } from '@/request/responseData';
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
type blogDataType  = {
  blog: Article,
  collectList: FavoriteFolder[],
  commentList: Comment[],
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
  collectList: [],
  commentList: [],
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
    message.error(res.data.message);
  }
}

function showDialog() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

async function addBlogToCollect(collectID: number, collectName: string) {
  console.log(collectID);
  const data: RequestAddFavorite = {
    articleId: Number(router.currentRoute.value.query.id),
    folderId: collectID
  };
  const res = await addArticleToCollectAPI(data, userStore);
  if (res.data.status === 0) {
    message.success(`成功添加到收藏夹${collectName}!`);
  } else {
    message.error(res.data.message);
  }
}

async function getComments() {
  const data: RequestGetArticleComments = {
    articleId: Number(router.currentRoute.value.query.id)
  };
  const res = await getArticleCommentsAPI(data, userStore);
  if (res.data.status === 0) {
    // TODO: API test
    console.log(res.data.data);
  } else {
    message.error(res.data.message);
  }
};

const getArticle = async () => {
  const data: RequestGetArticle = {
    id: Number(router.currentRoute.value.query.id)
  }
  const res = await getArticleAPI(data, userStore);
  if (res.data.status === 0) {
    // blogContent.value = res.data.data.content;
    // blog.title = res.data.data.title;
    // blog.description = res.data.data.description;
    // blog.time = res.data.data.updateTime;
    // blog.collectNum = res.data.data.favoritesNum;
    blogData.blog = res.data.data;
  } else {
    message.error(res.data.message);
  }
};

const getAllFolders = async () => {
  const res = await getUserAllCollectAPI(userStore);
  if (res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
    blogData.collectList = res.data.data;
  } else {
    message.error(res.data.message);
  }
};

onMounted(() => {
  console.log('onMounted');
  getArticle();
  getComments();
  getAllFolders();
})
</script>
<template>
  <div class="scrollMe">
    <div class="blogContent">
      <div class="card">
        <user-card></user-card>
      </div>
      <div class="content">
        <div class="titleContent">
          <h1 style="margin: 0;">{{ blogData.blog.title }}</h1>
          <div class="titleInfo">
            <span class="author"><span style="position: relative; top: 1.6px;"><n-icon>
                  <Person />
                </n-icon></span> {{ blogData.blog.author }}</span>
            <span style="margin-left: 10px;"><span
                style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span>
              更新于{{ blogData.blog.updateTime }}</span>
            <span class="author" @click="showDialog" style="margin-left: 10px;"><span
                style="position: relative; top: 1.6px;"><n-icon>
                  <Star />
                </n-icon></span> 收藏本文</span>
          </div>
        </div>
        <MdEditor theme="dark" v-model="blogData.blog.content" :preview-only="true"></MdEditor>
        <div class="comment">
          <h1>留言</h1>
          <comment-list v-for="item in blogData.commentList" :article-id="item.articleId" :content="item.content" :id="item.id" :order-num="item.orderNum" :time="item.time" :user-id="item.userId" :avatar="item.avatar" :user-name="item.userName"></comment-list>
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
                <div style="height: 1px;background-color: rgb(240,240,245);"></div>
              </div>
            </div>
            <!-- <template #footer>
          尾部
        </template> -->
          </n-card>
        </n-modal>
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
      background-color: rgb(245, 246, 247);
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $scrollbar-color;
  }
}
</style>