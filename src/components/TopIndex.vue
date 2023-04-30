<script setup lang="ts">
import { Search, LogOut } from "@vicons/ionicons5"
import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import { useUserStore } from '@/stores/user'
const userState = useUserStore();
const router = useRouter();
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOut)
  }
];
let searchText = ref('');

function search() {
  console.log('search')
  console.log(searchText);
}
function handleSelect(key: string | number) {
  console.log(key);
};
function routeTo(key: number) {
  // 1: homepage 2: personal 3: login
  if (key === 1) {
    router.push('/');
  } else if (key === 2) {
    router.push('/space/home');
  } else if (key === 3) {
    router.push('/edit');
  } else if (key === 4) {
    router.push('/login');
  }
}
</script>

<template>
  <div class="topIndex">
    <div class="index">
      <span @click="routeTo(1)"><b>博客主页</b></span>
      <span @click="routeTo(2)" style="margin-left: 10px;"><b>个人主页</b></span>
      <span @click="routeTo(3)" style="margin-left: 10px;"><b>写博客</b></span>
    </div>
    <div class="search">
      <n-input round v-model:value="searchText" placeholder="请输入关键词">
        <template #suffix>
          <n-icon class="searchButton" @click="search()">
            <Search />
          </n-icon>
        </template>
      </n-input>
    </div>
    <div class="info">
      <div class="myInfo">
        <n-dropdown :options="options" @select="handleSelect">
          <n-avatar round :src="userState.avatar" />
        </n-dropdown>
      </div>
      <div v-show="false" @click="routeTo(4)" class="login">登录/注册</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topIndex {
  position: fixed;
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: space-between;
  background-color: white;
  z-index: 999;

  .index {
    margin-left: 10px;

    span {
      color: $cloud-1-hex;
      @include text-hover;
    }
  }

  .search {
    width: 30%;
  }

  .info {
    width: auto;
    margin-right: 10px;

    .myInfo {
      position: relative;
      top: 4px;
      cursor: pointer;
    }

    .login {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: $miku-fans-theme;
      }
    }
  }
}

.searchButton {
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
</style>