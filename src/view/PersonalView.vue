<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { Bookmark, Book, Person, Archive, AddCircle, RemoveCircle } from '@vicons/ionicons5';
import { onMounted } from 'vue';
import { DataGetInfo } from '@/request/responseData';
import { RequestAddFollow, RequestDeleteFollow, RequestGetOtherInfo } from '@/request/requestData';
import { getUserInfoAPI, deleteUserFromFollowAPI, addUserToFollowAPI, getOtherInfoAPI } from '@/request/api';
import { darkTheme } from 'naive-ui';
const userState = useUserStore();
const router = useRouter();
const message = useMessage();
const user: DataGetInfo = reactive({
  name: 'NAN',
  description: '',
  avatar: '',
  articleNum: 0,
  followerNum: 0,
  followedNum: 0,
  birthday: '2001-01-08',
  defaultFavoriteFolder: 1,
  email: 'takune@163.com',
  sex: true,
  followed: false,
});


function routeTo(key: number) {
  // 1: homepage 2: personal 3: login
  if (key === 1) {
    router.replace({ path: '/space/home', query: { id: router.currentRoute.value.query.id } });
    document.getElementById('selectedBar')?.classList.remove('indexHome', 'indexDraft','indexCollect', 'indexInfo');
    setTopIndex('indexHome');
  } else if (key === 2) {
    router.replace({ path: '/space/draft', query: { id: router.currentRoute.value.query.id } });
    document.getElementById('selectedBar')?.classList.remove('indexHome', 'indexDraft','indexCollect', 'indexInfo');
    setTopIndex('indexDraft');
  } else if (key === 3) {
    router.replace({ path: '/space/collect', query: { id: router.currentRoute.value.query.id } });
    document.getElementById('selectedBar')?.classList.remove('indexHome', 'indexDraft','indexCollect', 'indexInfo');
    setTopIndex('indexCollect');
  } else if (key === 4) {
    router.replace({ path: '/space/info', query: { id: router.currentRoute.value.query.id } });
    document.getElementById('selectedBar')?.classList.remove('indexHome', 'indexDraft','indexCollect', 'indexInfo');
    setTopIndex('indexInfo');
  } else if (key === 5) {
    router.replace({ path: '/space/attention', query: { id: router.currentRoute.value.query.id } });
    document.getElementById('selectedBar')?.classList.remove('indexHome', 'indexDraft','indexCollect', 'indexInfo');
    setTopIndex('attention');
  } else if (key === 6) {
    router.replace({ path: '/space/fans', query: { id: router.currentRoute.value.query.id } });
    document.getElementById('selectedBar')?.classList.remove('indexHome', 'indexDraft','indexCollect', 'indexInfo');
    setTopIndex('fans');
  }
}

function setTopIndex(id: string) {
  document.getElementsByClassName('selectedIndexColor')?.item(0)?.classList.remove('selectedIndexColor');
  document.getElementById(id)?.classList.add('selectedIndexColor');
  document.getElementById('selectedBar')?.classList.add(id);
}

async function addAttention() {
  const data: RequestAddFollow = {
    followed: Number(router.currentRoute.value.query.id)
  };
  const res = await addUserToFollowAPI(data, userState);
  if (res.data.status === 0) {
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
  if (res.data.status === 0) {
    message.success('取消关注');
  } else {
    message.error(res.data.message);
  }
}

function addOrRemoveAttention(key: number) {
  console.log('addAttention', key);
  if (key === 1) {
    addAttention();
  } else if (key === 2) {
    removeAttention();
  }
}

const getUserInfo = async () => {
  const data: RequestGetOtherInfo = {
    id: Number(router.currentRoute.value.query.id),
  }
  const res = await getOtherInfoAPI(data, userState);
  // 获取个人信息
  if (res.data.status === 0) {
    user.articleNum = res.data.data.articleNum;
    user.name = res.data.data.name;
    user.avatar = userState.staticHead + res.data.data.avatar;
    user.description = res.data.data.description;
    user.followedNum = res.data.data.followedNum;
    user.followerNum = res.data.data.followerNum;
    user.followed = res.data.data.followed;
  }
}

onMounted(() => {
  const way = router.currentRoute.value.path;
  if(way === '/space/home') {
    document.getElementById('indexHome')?.classList.add('selectedIndexColor');
    document.getElementById('selectedBar')?.classList.add('indexHome');
  } else if(way === '/space/draft') {
    document.getElementById('indexDraft')?.classList.add('selectedIndexColor');
    document.getElementById('selectedBar')?.classList.add('indexDraft');
  } else if( way === '/space/collect') {
    document.getElementById('indexCollect')?.classList.add('selectedIndexColor');
    document.getElementById('selectedBar')?.classList.add('indexCollect');
  } else if( way === '/space/info') {
    document.getElementById('indexInfo')?.classList.add('selectedIndexColor');
    document.getElementById('selectedBar')?.classList.add('indexInfo');
  } else if( way === '/space/attention') {
    document.getElementById('attention')?.classList.add('selectedIndexColor');
  } else if( way === '/space/fans') {
    document.getElementById('fans')?.classList.add('selectedIndexColor');
  }
  // console.log(router.currentRoute.value.query.id);
  getUserInfo();
})

</script>

<template>
  <div class="scrollMe">
    <div class="personalView">
      <div class="head">
        <div class="infoList">
          <div class="avatar"><n-avatar round :size="55" :src="user.avatar" /></div>
          <div class="info">
            <span class="name"><b>{{ user.name }}</b></span><br />
            <span class="description">{{ user.description }}</span>
          </div>
          <div v-show="Number(router.currentRoute.value.query.id) !== userState.userId" class="attentionButton">
            <n-button v-if="user.followed" color="#C70002" @click="addOrRemoveAttention(2)" block>
              <template #icon>
                <n-icon>
                  <remove-circle />
                </n-icon>
              </template>
              取消关注
            </n-button>
            <n-button v-else @click="addOrRemoveAttention(1)" color="#39c5bb" block>
              <template #icon>
                <n-icon>
                  <add-circle />
                </n-icon>
              </template>
              关注
            </n-button>
          </div>
        </div>
      </div>
      <div class="headIndex">
        <div class="index">
          <span id="indexHome" @click="routeTo(1)"><n-icon style="position: relative; top: 2px;">
              <Book />
            </n-icon> <b>博客</b></span>
          <span v-show="Number(router.currentRoute.value.query.id) === userState.userId" id="indexDraft"
            @click="routeTo(2)" style="margin-left: 15px;"><n-icon style="position: relative; top: 2px;">
              <Archive />
            </n-icon> <b>草稿箱</b></span>
          <span v-show="Number(router.currentRoute.value.query.id) === userState.userId" id="indexCollect" @click="routeTo(3)" style="margin-left: 15px;"><n-icon
              style="position: relative; top: 2px;">
              <Bookmark />
            </n-icon> <b>收藏夹</b></span>
          <span v-show="Number(router.currentRoute.value.query.id) === userState.userId" id="indexInfo"
            @click="routeTo(4)" style="margin-left: 15px;"><n-icon style="position: relative; top: 2px;">
              <Person />
            </n-icon> <b>个人信息</b></span>
        </div>
        <div class="infoBox">
          <div v-if="Number(router.currentRoute.value.query.id) === userState.userId" class="boxContent" id="attention" @click="routeTo(5)">
            <div class="title">关注数</div>
            <div class="content">{{ user.followedNum }}</div>
          </div>
          <div v-else style="color: rgba(255,255,255,0.7);">
            <div class="title">关注数</div>
            <div class="content">{{ user.followedNum }}</div>
          </div>
          <div v-if="Number(router.currentRoute.value.query.id) === userState.userId" class="boxContent" id="fans" @click="routeTo(6)">
            <div class="title">粉丝数</div>
            <div class="content">{{ user.followerNum }}</div>
          </div>
          <div v-else style="color: rgba(255,255,255,0.7);" id="blog">
            <div class="title">粉丝数</div>
            <div class="content">{{ user.followerNum }}</div>
          </div>
          <div style="color: rgba(255,255,255,0.7);" id="blog">
            <div class="title">博客数</div>
            <div class="content">{{ user.articleNum }}</div>
          </div>
        </div>
        <div id="selectedBar"></div>
      </div>
      <div class="Content">
        <RouterView></RouterView>
      </div>
      <n-config-provider :theme="darkTheme">
        <n-back-top :right="'3%'" />
      </n-config-provider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personalView {
  width: 70%;
  min-width: 840px;
  height: auto;
  position: relative;
  left: 15%;

  .head {
    height: 128px;
    background-image: url('@/assets/img/personal.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0;
    padding: 20px;

    .infoList {
      margin-top: 78px;
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
    position: relative;
    background-color: $github-head;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .index {
      color: $github-header-text;

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
      color: $github-header-text;
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
}

.scrollMe {
  height: 95%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: $scrollbar-color $github-background;
  background: url('@/assets/img/personalBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0;
  opacity: 0.85;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $scrollbar-color;
  }
}

#selectedBar {
  position: absolute;
  bottom: 0;
  height: 4px;
  background-color: $miku-fans-theme;
  transition: all .3s;
}

.indexHome {
  left: 8px;
  width: 59px;
}

.indexDraft {
  left: 78px;
  width: 74px;
}

.indexCollect {
  left: 163px;
  width: 72px;
}

.indexInfo {
  left: 246px;
  width: 90px;
}
</style>