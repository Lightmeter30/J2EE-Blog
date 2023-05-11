<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { faker } from '@faker-js/faker';
import { Bookmark, Book, Person, Archive, AddCircle, RemoveCircle } from '@vicons/ionicons5';
import { onMounted } from 'vue';
import { DataGetInfo } from '@/request/responseData';
import { RequestAddFollow, RequestDeleteFollow } from '@/request/requestData';
import { getUserInfoAPI, deleteUserFromFollowAPI ,addUserToFollowAPI } from '@/request/api';
import { messageDark } from 'naive-ui';
const userState = useUserStore();
const router = useRouter();
const message = useMessage();
const user: DataGetInfo = reactive({
  name: 'takune',
  description: '',
  avatar: '',
  articleNum: 114,
  followerNum: 514,
  followedNum: 10,
  birthday: '2001-01-08',
  defaultFavoriteFolder: 1,
  email: 'takune@163.com',
  sex: true,
});


function routeTo(key: number) {
  // 1: homepage 2: personal 3: login
  if (key === 1) {
    router.replace({path: '/space/home', query: { id: router.currentRoute.value.query.id}});
    setTopIndex('indexHome');
  } else if (key === 2) {
    router.replace({path: '/space/draft', query: { id: router.currentRoute.value.query.id}});
    setTopIndex('indexDraft');
  } else if (key === 3) {
    router.replace({path: '/space/collect', query: { id: router.currentRoute.value.query.id}});
    setTopIndex('indexCollect');
  } else if (key === 4) {
    router.replace({path: '/space/info', query: { id: router.currentRoute.value.query.id}});
    setTopIndex('indexInfo');
  } else if (key === 5) {
    router.replace({path: '/space/attention', query: { id: router.currentRoute.value.query.id}});
    setTopIndex('attention');
  } else if (key === 6) {
    router.replace({path: '/space/fans', query: { id: router.currentRoute.value.query.id}});
    setTopIndex('fans');
  }
}

function setTopIndex(id: string) {
  document.getElementsByClassName('selectedIndexColor')?.item(0)?.classList.remove('selectedIndexColor');
  document.getElementById(id)?.classList.add('selectedIndexColor');
}

async function addAttention() {
  const data: RequestAddFollow = {
    followed: Number(router.currentRoute.value.query.id)
  };
  const res = await addUserToFollowAPI(data, userState);
  if(res.data.status === 0) {
    message.success('关注成功');
  } else {
    message.error(res.data.message);
  }
}

async function removeAttention() {
  const data: RequestDeleteFollow = {
    followed: Number(router.currentRoute.value.query.id)
  };
  const res = await deleteUserFromFollowAPI(data, userState);
  if(res.data.status === 0) {
    message.success('取消关注');
  } else {
    message.error(res.data.message);
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

const getUserInfo = async () => {
  const res = await getUserInfoAPI(userState);
  // 获取个人信息
  if(res.data.status === 0) {
    user.articleNum = res.data.data.articleNum;
    user.name = res.data.data.name;
    user.avatar =  userState.staticHead + res.data.data.avatar;
    user.description = res.data.data.description;
    user.followedNum = res.data.data.followedNum;
    user.followerNum = res.data.data.followerNum;
  }
}

onMounted(() => {
  document.getElementById('indexHome')?.classList.add('selectedIndexColor');
  // console.log(router.currentRoute.value.query.id);
  getUserInfo();
})

</script>

<template>
  <div class="personalView">
    <div class="head">
      <div class="infoList">
        <div class="avatar"><n-avatar round :size="55" :src="user.avatar" /></div>
        <div class="info">
          <span class="name"><b>{{ user.name }}</b></span><br />
          <span class="description">{{ user.description }}</span>
        </div>
        <div v-show="Number(router.currentRoute.value.query.id) !== userState.userId" class="attentionButton">
          <n-button v-if="true" @click="addOrRemoveAttention(1)" color="#39c5bb" block>
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
    </div>
    <div class="headIndex">
      <div class="index">
        <span id="indexHome" @click="routeTo(1)"><n-icon style="position: relative; top: 2px;">
            <Book />
          </n-icon> <b>博客</b></span>
        <span v-show="Number(router.currentRoute.value.query.id) === userState.userId" id="indexDraft" @click="routeTo(2)" style="margin-left: 15px;"><n-icon
            style="position: relative; top: 2px;">
            <Archive />
          </n-icon> <b>草稿箱</b></span>
        <span id="indexCollect" @click="routeTo(3)" style="margin-left: 15px;"><n-icon
            style="position: relative; top: 2px;">
            <Bookmark />
          </n-icon> <b>收藏夹</b></span>
        <span v-show="Number(router.currentRoute.value.query.id) === userState.userId" id="indexInfo" @click="routeTo(4)" style="margin-left: 15px;"><n-icon style="position: relative; top: 2px;">
            <Person />
          </n-icon> <b>个人信息</b></span>
      </div>
      <div class="infoBox">
        <div class="boxContent" id="attention" @click="routeTo(5)">
          <div class="title">关注数</div>
          <div class="content">{{ user.followedNum }}</div>
        </div>
        <div class="boxContent" id="fans" @click="routeTo(6)">
          <div class="title">粉丝数</div>
          <div class="content">{{ user.followerNum }}</div>
        </div>
        <div style="color: #ACAAAB;" id="blog">
          <div class="title">博客数</div>
          <div class="content">{{ user.articleNum }}</div>
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
    background-image: url('@/assets/img/personal.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0;
    padding: 20px;

    .infoList {
      margin-top: 100px;
      display: flex;

      .info {
        margin-left: 10px;
        width: 30%;

        .name {
          font-size: 20px;
          color: #fffff5;
        }

        .description {
          color: #fffff5;
          font-size: 12px;
        }
      }

      .attentionButton {
        margin-left: 57%;
        position: relative;
        top: 15px;
      }
    }
  }

  .headIndex {
    background-color: white;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .index {
      color: $cloud-1-hex;

      span {
        position: relative;
        top: 12px;
        font-size: medium;
        @include text-hover;
      }
    }

    .infoBox {
      display: flex;
      justify-content: space-around;
      width: 180px;
      color: $cloud-1-hex;
      font-weight: bold;

      .boxContent {
        @include text-hover;

      }
    }
  }

  .Content {
    margin-top: 10px;
  }
}

.selectedIndexColor {
  color: $miku-fans-theme;
}</style>