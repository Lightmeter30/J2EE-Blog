<script setup lang="ts">
import { addUserToFollowAPI, deleteUserFromFollowAPI } from '@/request/api';
import { RequestAddFollow, RequestDeleteFollow } from '@/request/requestData';
import router from '@/router';
import { useUserStore } from '@/stores/user';
// import { faker } from '@faker-js/faker';
import { AddCircle, RemoveCircle, Home } from '@vicons/ionicons5';

const userState = useUserStore();
const message = useMessage();
interface authorInfo {
  url: string;
  name: string;
  id: number;
  blog: number;
  fans: number;
  attention: number;
  isAttention: boolean;
};


const props = defineProps<authorInfo>();

function toPersonalPage() {
  router.push({ path: '/space/home', query: { id: props.id } });
}

async function addAttention() {
  const data: RequestAddFollow = {
    followed: props.id,
  };
  const res = await addUserToFollowAPI(data, userState);
  if (res.data.status === 0) {
    message.success('关注成功', { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

async function removeAttention() {
  const data: RequestDeleteFollow = {
    followed: props.id,
  };
  const res = await deleteUserFromFollowAPI(data, userState);
  if (res.data.status === 0) {
    message.success('取消关注', { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

function addOrRemoveAttention(key: number) {
  console.log('addAttention', key);
  if (key === 1) {
    addAttention();
  } else if (key === 2) {
    removeAttention();
  }
}
</script>

<template>
  <div class="userCard">
    <div class="avatar">
      <n-avatar :size="130" round :src="userState.staticHead + url" />
    </div>
    <div class="name">
      <n-popover trigger="hover" placement="bottom">
        <template #trigger>
          <span @click="toPersonalPage()">
            <b>{{ name }}</b>
          </span>
        </template>
        <span>{{ name }}的个人主页</span>
      </n-popover>
    </div>
    <div class="userInfo">
      <div class="info">
        <div class="title">
          粉丝
        </div>
        <div class="number">
          {{ fans }}
        </div>
      </div>
      <div class="info">
        <div class="title">
          博客
        </div>
        <div class="number">
          {{ blog }}
        </div>
      </div>
      <div class="info">
        <div class="title">
          关注
        </div>
        <div class="number">
          {{ attention }}
        </div>
      </div>
    </div>
    <div v-if="id === userState.userId" class="attention">
      <n-button @click="toPersonalPage" color="#39c5bb" block>
        <template #icon>
          <n-icon>
            <home />
          </n-icon>
        </template>
        个人主页
      </n-button>
    </div>
    <div v-else class="attention">
      <n-button v-if="!isAttention" @click="addOrRemoveAttention(1)" color="#39c5bb" block>
        <template #icon>
          <n-icon>
            <add-circle />
          </n-icon>
        </template>
        关注
      </n-button>
      <n-button v-else color="#8E2C2D" @click="addOrRemoveAttention(2)" block>
        <template #icon>
          <n-icon>
            <remove-circle />
          </n-icon>
        </template>
        取消关注
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.userCard {
  text-align: center;
  height: 300px;
  width: 250px;
  border-radius: 1rem;
  background-color: $github-card-background;
  color: $cloud-1-hex;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  .avatar {
    height: auto;
    @include center;
  }

  .name {
    @include center;
    font-size: 22px;
    padding-top: 10px;

    span {
      @include text-hover;
    }
  }

  .userInfo {
    @include center;
    padding-top: 5px;

    .info {
      width: 80px;

      .title {
        font-size: 18px;
      }

      .number {
        font-size: 18px;
      }
    }
  }

  .attention {
    padding-top: 17px;
  }

}
</style>