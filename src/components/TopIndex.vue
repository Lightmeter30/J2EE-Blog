<script setup lang="ts">
import { Search, LogOut } from "@vicons/ionicons5"
import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon, darkTheme } from 'naive-ui'
import { useUserStore } from '@/stores/user';
import { useSearchStore } from "@/stores/search";
const userState = useUserStore();
const dialog = useDialog();
const message = useMessage();
const router = useRouter();
const searchStore = useSearchStore();
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}


const groupList = [
  {
    key: 1,
    label: '计算机',
    articleNum: 10,
  },
  {
    key: 2,
    label: '二次元',
    articleNum: 8,
  },
  {
    key: 3,
    label: '生活区',
    articleNum: 101,
  },
  {
    key: 4,
    label: '舞蹈区',
    articleNum: 123,
  },
  {
    key: 5,
    label: '哲学区',
    articleNum: 114,
  },
  {
    key: 6,
    label: '视频区',
    articleNum: 90,
  },
  {
    key: 7,
    label: '游戏区',
    articleNum: 1,
  },
];

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOut)
  }
];
let searchText = ref('');

async function search() {
  // console.log('search')
  if (router.currentRoute.value.path === '/search') {
    searchStore.goSearch(searchText.value);
  } else {
    searchStore.goSearch(searchText.value);
    router.push('/search');
  }
}
function handleSelect(key: string | number) {
  if (key === 'logout') {
    dialog.warning({
      title: '警告',
      content: '是否确认注销账号?',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        userState.logout();
        router.push('/');
        // message.success('退出登录');
      },
    })
  }
};

function toGroup(key: string | number) {
  router.push({path: '/group', query: {id: key}});
};

function routeTo(key: number) {
  // 1: homepage 2: personal 3: login
  if (key === 1) {
    router.push('/');
  } else if (key === 2) {
    router.push({ path: '/space/home', query: { id: userState.userId } });
  } else if (key === 3) {
    router.push({ path: '/edit', query: { type: '114514' } });
  } else if (key === 4) {
    router.push('/login');
  }
}
</script>

<template>
  <div class="topIndex">
    <div class="index">
      <span @click="routeTo(1)"><b>博客主页</b></span>
      <span style="margin-left: 10px;">
          <n-dropdown @select="toGroup" :options="groupList">
            <b>博客分组</b>
          </n-dropdown>
      </span>
      <span v-show="userState.isLogin" @click="routeTo(2)" style="margin-left: 10px;"><b>个人主页</b></span>
      <span v-show="userState.isLogin" @click="routeTo(3)" style="margin-left: 10px;"><b>写博客</b></span>
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
      <div class="myInfo" v-if="userState.isLogin">
          <n-dropdown :options="options" @select="handleSelect">
            <n-avatar round :src="userState.staticHead + userState.avatar" />
          </n-dropdown>
      </div>
      <div v-else @click="routeTo(4)" class="login">登录/注册</div>
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
  background-color: $github-head;
  z-index: 10;

  .index {
    margin-left: 10px;

    span {
      color: $github-header-text;
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
      color: $github-header-text;

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
    color: $miku-fans-theme;
  }
}
</style>