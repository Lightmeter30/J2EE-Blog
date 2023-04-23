<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import MdEditor from 'md-editor-v3';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { Send } from '@vicons/ionicons5';
// import {faker} from "@faker-js/faker";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const message = useMessage();
const blogContent = ref('123');
const myComment = ref('');
function comment () {
  console.log('comment', myComment);
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
            <n-input v-model:value="myComment" type="textarea" placeholder="请输入你的留言" maxlength="100"></n-input>
          </div>
          <div class="mySubmit">
            <n-button color="#39c5bb" @click="comment" >
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
}</style>