<script setup lang="ts">
import { addUserToFollowAPI, deleteUserFromFollowAPI } from '@/request/api';
import { RequestAddFollow, RequestDeleteFollow } from '@/request/requestData';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { faker } from '@faker-js/faker';
import { AddCircle, RemoveCircle } from '@vicons/ionicons5';

const userState = useUserStore();
const message = useMessage();
const authorInfo = {
  url: faker.image.avatar(),
  name: faker.name.firstName(),
  id: 1,
  blog: 10,
  fans: 114,
  attention: 514,
  isAttention: false,
}

function toPersonalPage() {
  console.log('toPersonalPage');
}

async function addAttention() {
  const data: RequestAddFollow = {
    followed: Number(router.currentRoute.value.query.id)
  };
  const res = await addUserToFollowAPI(data, userState);
  if(res.data.status === 0) {
    message.success('关注成功', {duration: 1200});
  } else {
    message.error(res.data.message, {duration: 1200});
  }
}

async function removeAttention() {
  const data: RequestDeleteFollow = {
    followed: Number(router.currentRoute.value.query.id)
  };
  const res = await deleteUserFromFollowAPI(data, userState);
  if(res.data.status === 0) {
    message.success('取消关注', {duration: 1200});
  } else {
    message.error(res.data.message, {duration: 1200});
  }
}

function addOrRemoveAttention(key: number) {
  console.log('addAttention', key);
  if(key === 1) {
    addAttention();
  } else if(key === 2) {
    removeAttention();
  }
}
</script>

<template>
  <div class="userCard">
    <div class="avatar">
      <n-avatar size="100" round :src="authorInfo.url" />
    </div>
    <div class="name">
      <n-popover trigger="hover" placement="bottom" >
        <template #trigger>
          <span @click="toPersonalPage()">
            <b>{{ authorInfo.name }}</b>
          </span>
        </template>
        <span>{{ authorInfo.name }}的个人主页</span>
      </n-popover>
    </div>
    <div class="userInfo">
      <div class="info">
        <div class="title">
          粉丝
        </div>
        <div class="number">
          {{ authorInfo.fans }}
        </div>
      </div>
      <div class="info">
        <div class="title">
          博客
        </div>
        <div class="number">
          {{ authorInfo.blog }}
        </div>
      </div>
      <div class="info">
        <div class="title">
          关注
        </div>
        <div class="number">
          {{ authorInfo.attention }}
        </div>
      </div>
    </div>
    <div class="attention">
      <n-button v-if="!authorInfo.isAttention" @click="addOrRemoveAttention(1)" color="#39c5bb" block>
        <template #icon>
          <n-icon>
            <add-circle />
          </n-icon>
        </template>
        关注
      </n-button>
      <n-button v-else color="#39c5bb" @click="addOrRemoveAttention(2)" block>
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