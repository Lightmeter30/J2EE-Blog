<script setup lang="ts">
import { addUserToFollowAPI, deleteUserFromFollowAPI } from '@/request/api';
import { RequestAddFollow, RequestDeleteFollow } from '@/request/requestData';
import { useUserStore } from '@/stores/user';
import { AddCircle, RemoveCircle } from '@vicons/ionicons5';
import { darkTheme } from 'naive-ui';

interface userListType {
  id: number;
  name: string;
  description: string;
  avatar: string;
  isAttention: boolean;
};
const props = defineProps<userListType>();
const myIsAttention = ref(0);
const message = useMessage();
const userState = useUserStore();

function addOrRemoveAttention(key: number) {
  console.log('addAttention', key);
  if (key === 1) {
    addAttention();
  } else if (key === 2) {
    removeAttention();
  }
}

async function addAttention() {
  const data: RequestAddFollow = {
    followed: props.id,
  };
  const res = await addUserToFollowAPI(data, userState);
  if (res.data.status === 0) {
    message.success('关注成功', { duration: 1200 });
    myIsAttention.value = 1;
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
    myIsAttention.value = 2;
    message.success('取消关注', { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

</script>

<template>
  <div>
  <div class="userList">
    <div class="avatar">
      <n-avatar round :size="60" :src="userState.staticHead + avatar" />
    </div>
    <div class="title">
      <span class="name"><b>{{ name }}</b></span><br/>
      <span class="description">{{ description }}</span>
    </div>
    <div class="attention">
      <n-button v-if="(myIsAttention === 0 ? isAttention : myIsAttention === 1 )" color="#39c5bb" @click="addOrRemoveAttention(2)" >
        <template #icon>
          <n-icon>
            <remove-circle />
          </n-icon>
        </template>
        取消关注
      </n-button>
      <n-button v-else @click="addOrRemoveAttention(1)" color="#39c5bb" >
        <template #icon>
          <n-icon>
            <add-circle />
          </n-icon>
        </template>
        关注
      </n-button>
    </div>
  </div>
  <n-config-provider :theme="darkTheme">
  <n-divider></n-divider>
  </n-config-provider>
</div>
</template>

<style lang="scss" scoped>
  .userList {
    background-color: $github-background;
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