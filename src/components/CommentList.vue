<script setup lang="ts">
import { faker } from '@faker-js/faker';

const comment = {
  id: 1,
  name: faker.name.firstName(),
  avatar: faker.image.avatar(),
  time: faker.date.birthdate(),
  comment: '114,514,1919810,你是一个一个,114,514,1919810,你是一个一个114,514,1919810,你是一个一个',
}

function toPersonalPage() {
  console.log('to PersonalPage');
}
</script>

<template>
  <div class="commentList">
    <div class="commentHead">
      <div class="avatar">
        <n-avatar round :size="60" :src="comment.avatar" />
      </div>
      <div class="info" >
        <span class="name" @click="toPersonalPage()" ><b>{{ comment.name }}</b></span><br/>
        <span class="sub" >{{ comment.time }} {{ comment.id }}楼</span>
      </div>
    </div>
    <div class="commentContent">
      {{ comment.comment }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .commentList {
    background-color: $github-card-background;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
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