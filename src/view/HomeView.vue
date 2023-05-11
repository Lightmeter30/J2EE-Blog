<template>
  <div class="scrollMe">
    <div class="home">
      <!-- <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div> -->
      <div class="homeContent">
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
      </div>
      <div class="homeFoot">
        <n-config-provider :theme="darkTheme">
          <n-pagination :on-update:page="changePage" :item-count="total" show-quick-jumper>
            <template #goto>
              跳至
            </template>
          </n-pagination>
        </n-config-provider>
      </div>
      <div style="height: 20px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPagination, messageDark } from 'naive-ui';
import { RequestGetPageArticles } from '@/request/requestData';
import { getHomePageArticlesAPI, getHomePageNumAPI } from '@/request/api';
import { darkTheme } from 'naive-ui';
// import 'hover.css';
// import { loginAPI } from '@/request/api';
// import { RequestLogin } from '@/request/requestData';
// import { reactive } from "vue";
const message = useMessage();
let total = ref(114);

const changePage = async (page: number) => {
  console.log(`to page ${page}`);
  const data: RequestGetPageArticles = {
    currentPage: page,
  }
  const res = await getHomePageArticlesAPI(data);
  if (res.data.status === 0) {
    // TODO: 接口对接
    console.log(res);
  } else {
    message.error(res.data.message);
  }
}

const init = async () => {
  const res = await getHomePageNumAPI();
  if (res.data.status === 0) {
    total.value = res.data.data;
    changePage(1);
  } else {
    message.error(res.data.message);
  }
};

onMounted(() => {
  init();
})

</script>

<style scoped lang="scss">
.home {
  width: 60%;
  position: relative;
  left: 20%;
  margin-top: 20px;
  margin-bottom: 20px;

  .homeContent {}

  .homeFoot {
    background-color: $github-card-background;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
}

.scrollMe {
  height: 95%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: $scrollbar-color $github-background;
  background: url('@/assets/img/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0;
  opacity: 0.8;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $scrollbar-color;
  }
}
</style>