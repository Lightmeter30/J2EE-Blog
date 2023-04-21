<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { AddCircle, RemoveCircle } from '@vicons/ionicons5';

const authorInfo = {
  url: faker.image.avatar(),
  name: faker.name.firstName(),
  id: 1,
  blog: 10,
  fans: 114,
  attention: 514,
  isAttention: false,
}

function toPersonalPage(){
  console.log('toPersonalPage');
}

function addOrRemoveAttention(key: number){
  console.log('addAttention',key);
}
</script>

<template>
  <div class="userCard">
    <div class="avatar">
      <n-avatar size="100" round :src="authorInfo.url" />
    </div>
    <div class="name">
      <span @click="toPersonalPage()" >
        <b>{{ authorInfo.name }}</b>
      </span>
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
      <n-button v-if="!authorInfo.isAttention" @click="addOrRemoveAttention(1)" color="#39c5bb" block >
        <template #icon>
          <n-icon>
            <add-circle />
          </n-icon>
        </template>
        关注
      </n-button>
      <n-button v-else color="#39c5bb" @click="addOrRemoveAttention(2)" block >
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
  height: 350px;
  width: 250px;
  border-radius: 1rem;
  background-color: white;
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
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
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

}</style>