<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const router = useRouter();
const userState = useUserStore();
interface CommentType {
  articleId: number;
  content: string;
  id: number;
  orderNum: number;
  time: string;
  userId: number;
  avatar: string;
  userName: string;
}; 
const props = defineProps<CommentType>();
function toPersonalPage() {
  const newPage = router.resolve({ path: '/space/home', query: { id: props.userId } });
  window.open(newPage.href, '_blank');
}
</script>

<template>
  <div class="commentList">
    <div class="commentHead">
      <div class="avatar">
        <n-avatar round :size="60" :src="userState.staticHead + avatar" />
      </div>
      <div class="info" >
        <span class="name" @click="toPersonalPage()" ><b>{{ userName }}</b></span><br/>
        <span class="sub" >{{ orderNum }}楼 发布时间：{{ time }}</span>
      </div>
    </div>
    <div class="commentContent">
      {{ content }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .commentList {
    background-color: $github-card-background;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

    &:hover {
      background-color: $github-card-hover;
    }
    .commentHead {
      display: flex;
      height: 70px;

      .avatar {
        margin-right: 15px;
      }

      .info {
        margin-top: 5px;
        color: $cloud-1-hex;
        .name {
          font-size: large;
          @include text-hover;
        }
      }
    }

    .commentContent {
      margin-left: 75px;
      color: $github-header-text;
      font-size: medium;
    }
  }
</style>