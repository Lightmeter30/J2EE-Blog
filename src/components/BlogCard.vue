<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { Person, Time, Star, ChatboxEllipses  } from '@vicons/ionicons5';
const blog = {
  title: 'typescript/javascript学习笔记',
  description: '这是我学习typescript/javascript的学习笔记，其中以typescript为主，同时会介绍一点javascript里面会有的知识点',
  author: faker.name.firstName(),
  time: faker.date.past(),
  collectNum: 114,
  commentNum: 10,
}

function toBlogView() {
  console.log('toBlogView');
}

function toPersonView() {
  console.log('toPersonView');
}

</script>

<template>
  <div class="blogCard">
    <div class="title">
      <span @click="toPersonView()" ><b>{{ blog.title }}</b></span>
    </div>
    <div class="description">
      {{ blog.description }}
    </div>
    <div class="foot">
      <span class="author" @click="toPersonView()" ><span style="position: relative; top: 1.6px;"><n-icon><Person/></n-icon></span> {{ blog.author }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time/></n-icon></span> 更新于{{ blog.time }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Star/></n-icon></span> {{ blog.collectNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><ChatboxEllipses/></n-icon></span> {{ blog.commentNum }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .blogCard {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    .title {
      font-size: 22px;
      span {
        @include text-hover;
      }
    }

    .description {
      color: $cloud-1-hex;
      font-size: medium;
    }

    .foot {
      margin-top: 10px;
      color: $cloud-1-hex;
      line-height: normal;
      .author {
        @include text-hover;
      }
    }
  }
</style>