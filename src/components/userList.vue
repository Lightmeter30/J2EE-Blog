<script setup lang="ts">
import {faker} from '@faker-js/faker';
import { AddCircle, RemoveCircle } from '@vicons/ionicons5';

const user = reactive({
  name: faker.name.firstName(),
  description: '都什么年代了,还在当传统二次元',
  avatar:faker.image.avatar(),
  isAttention: true,
})

function addOrRemoveAttention(key: number) {
  console.log('add',key);
  if(key === 2) {
    user.isAttention = true;
  }
  else {
    user.isAttention = false;
  }
}

</script>

<template>
  <div>
  <div class="userList">
    <div class="avatar">
      <n-avatar round :size="60" :src="user.avatar" />
    </div>
    <div class="title">
      <span class="name"><b>{{ user.name }}</b></span><br/>
      <span class="description">{{ user.description }}</span>
    </div>
    <div class="attention">
      <n-button v-if="user.isAttention" @click="addOrRemoveAttention(1)" color="#39c5bb" >
        <template #icon>
          <n-icon>
            <add-circle />
          </n-icon>
        </template>
        关注
      </n-button>
      <n-button v-else color="#39c5bb" @click="addOrRemoveAttention(2)" >
        <template #icon>
          <n-icon>
            <remove-circle />
          </n-icon>
        </template>
        取消关注
      </n-button>
    </div>
  </div>
  <n-divider></n-divider>
</div>
</template>

<style lang="scss" scoped>
  .userList {
    background-color: white;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;

    .title {
      margin-top: 5px;
      margin-left: 15px;
      width: 85%;
      color: $cloud-1-hex;

      .name {
        font-size: large;
        @include text-hover;
      }

    }

    .attention {
      margin-top: 15px;
    }
  }
</style>