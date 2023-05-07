<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import MdEditor from 'md-editor-v3';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { Send, Person, Time, Star, Close } from '@vicons/ionicons5';
import { faker } from '@faker-js/faker';
// import {faker} from "@faker-js/faker";
const blog = {
  title: 'typescript/javascript学习笔记',
  description: '这是我学习typescript/javascript的学习笔记，其中以typescript为主，同时会介绍一点javascript里面会有的知识点',
  author: faker.name.firstName(),
  time: faker.date.past(),
  collectNum: 114,
  commentNum: 10,
}
type collect = {
  id: number,
  name: string,
  blogNum: number,
};

const collectList: Array<collect> = reactive([
  {
    id: 1,
    name: '默认收藏夹',
    blogNum: 12,
  },
  {
    id: 2,
    name: '美女',
    blogNum: 19,
  },
  {
    id: 3,
    name: '好看的',
    blogNum: 121,
  },
  {
    id: 10,
    name: '我喜欢的',
    blogNum: 0,
  },
]);
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const message = useMessage();
const blogContent = ref('123');
const myComment = ref('');
const showModal = ref(false);

function comment() {
  console.log('comment', myComment);
}

function showDialog() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function addBlogToCollect(collectID: number) {
  console.log(collectID);
}

onMounted(() => {
  console.log('onMounted');
})
</script>
<template>
  <div class="blogContent">
    <div class="card">
      <user-card></user-card>
    </div>
    <div class="content">
      <div class="titleContent">
        <h1 style="margin: 0;" >{{ blog.title }}</h1>
        <div class="titleInfo">
          <span class="author"><span style="position: relative; top: 1.6px;"><n-icon>
                <Person />
              </n-icon></span> {{ blog.author }}</span>
          <span style="margin-left: 10px;"><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span>
            更新于{{ blog.time }}</span>
          <span class="author" @click="showDialog" style="margin-left: 10px;"><span
              style="position: relative; top: 1.6px;"><n-icon>
                <Star />
              </n-icon></span> 收藏本文</span>
        </div>
      </div>
      <MdEditor v-model="blogContent" :preview-only="true"></MdEditor>
      <div class="comment">
        <h1>留言</h1>
        <comment-list></comment-list>
        <comment-list></comment-list>
        <comment-list></comment-list>
        <div class="myComment">
          <div class="myAvatar">
            <n-avatar round :size="60" :src="userStore.avatar" />
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
          <div v-for="item in collectList" >
            <div class="collectItem">
              <div class="title">
                <span>
                  {{ item.name }}
                </span>
              </div>
              <div class="collectButton">
                <n-button color="#39c5bb" @click="addBlogToCollect(item.id)" >
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

    .titleInfo {
      margin-top: 10px;
      padding: 15px;
      background-color: rgb(248,248,248);
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
    background-color: #fff;
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
        background-color: $cloud-0-hex;
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
</style>