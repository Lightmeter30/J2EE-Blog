<script setup lang="ts">
import {useUserStore} from '@/stores/user';
import {faker} from '@faker-js/faker';
import { Bookmark, Book, Person, Archive } from '@vicons/ionicons5';
const userState = useUserStore();
const router = useRouter();
const user =  {
  name: 'takune',
  description: '都什么年代了，还在当传统二次元。',
  avatar: faker.image.avatar(),
  blogNum: 114,
  fansNum: 514,
  attention: 10,
}

function routeTo(key: number) {
  // 1: homepage 2: personal 3: login
  if(key === 1) {
    //
  }
}

</script>

<template>
  <div class="personalView">
    <div class="head">
      <div class="infoList" >
        <div class="avatar" ><n-avatar round :size="55" :src="user.avatar" /></div>
        <div class="info" >
          <span class="name" ><b>{{ user.name }}</b></span><br/>
          <span class="description">{{ user.description }}</span>
        </div>
      </div>
    </div>
    <div class="headIndex">
      <div class="index">
      <span @click="routeTo(1)"><n-icon style="position: relative; top: 2px;"><Book/></n-icon> <b>博客</b></span>
      <span @click="routeTo(2)" style="margin-left: 15px;"><n-icon style="position: relative; top: 2px;"><Archive/></n-icon> <b>草稿箱</b></span>
      <span @click="routeTo(3)" style="margin-left: 15px;"><n-icon style="position: relative; top: 2px;"><Bookmark/></n-icon> <b>收藏夹</b></span>
      <span @click="routeTo(4)" style="margin-left: 15px;"><n-icon style="position: relative; top: 2px;"><Person/></n-icon> <b>个人信息</b></span>
    </div>
    <div class="infoBox">
      <div class="boxContent" id="attention">
        <div class="title">关注数</div>
        <div class="content">{{ user.attention }}</div>
      </div>
      <div class="boxContent" id="fans">
        <div class="title">粉丝数</div>
        <div class="content">{{ user.fansNum }}</div>
      </div>
      <div style="color: #ACAAAB;" id="blog">
        <div class="title">博客数</div>
        <div class="content">{{ user.blogNum }}</div>
      </div>
    </div>
    </div>
    <div class="Content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .personalView {
    width: 80%;
    height: auto;
    position: relative;
    left: 10%;

    .head {
      height: 150px;
      background-color: wheat;
      padding: 20px;

      .infoList {
        margin-top: 100px;
        display: flex;

        .info {
          margin-left: 10px;
          
          .name {
            font-size: 20px;
            color: $miku-fans-theme;
          }

          .description {
            color: $cloud-1-hex;
            font-size: 12px;
          }
        }
      }
    }

    .headIndex {
      background-color: white;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .index {

        span {
          position: relative;
          top: 12px;
          font-size: medium;
          color: $cloud-1-hex;
          @include text-hover;
        }
      }
    
      .infoBox {
        display: flex;
        justify-content: space-around;
        width: 180px;

        .boxContent {
          color: $cloud-1-hex;
          @include text-hover;

        }
      }
    }

    .Content {
      margin-top: 20px;
    }
  }
</style>