<script setup lang="ts">
import { AmericanFootballSharp, Albums, PricetagsSharp } from '@vicons/ionicons5';
import { Label, DataGetInfo } from '@/request/responseData';
import { useUserStore } from '@/stores/user';
import { getUserInfoAPI, getHotTagsAPI } from '@/request/api';
const userState = useUserStore();
const message = useMessage();
const router = useRouter();
interface Topics {
  id: number;
  name: string;
};


type sideContentType = {
  groupList: Topics[],
  tagList: Label[],
  cardInfo: DataGetInfo
}

const sideContentData = reactive<sideContentType>({
  groupList: [
  {
    id: 1,
    name: '生活',
  },
  {
    id: 2,
    name: '技术',
  },
  {
    id: 3,
    name: '工作'
  },
  {
    id: 4,
    name: '理财',
  },
  {
    id: 5,
    name: '育儿' 
  },
  {
    id: 6,
    name: '设计',
  },
  {
    id: 7,
    name: '产品'
  },
  {
    id: 8,
    name: '创业'
  },
  {
    id: 9,
    name: '读书'
  },
  {
    id: 10,
    name: '旅行'
  },
  {
    id: 11,
    name: '影视'
  },
  {
    id: 12,
    name: '音乐'
  }
],
  tagList: [],
  cardInfo: {
    articleNum: 0,
    avatar: '',
    birthday: '',
    defaultFavoriteFolder: 0,
    description: '',
    email: '',
    followedNum: 0,
    followerNum: 0,
    name: '',
    sex: false, // 0女 1男
    followed: false
  },
});

function tagClick(id: number) {
  console.log(id);
  router.push({path: "/tags", query:{ id: id }});
}

function toGroup(id: number) {
  console.log(`to group ${id}`);
  router.push({path: "/group", query:{ id: id }});
}

const getUserCardInfo = async () => {
  const res = await getUserInfoAPI(userState);
  if (res.data.status === 0) {
    sideContentData.cardInfo = res.data.data;
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

async function getHotTags() {
  const res = await getHotTagsAPI(); 
  if(res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
  } else {
    console.log(res.data);
  }
}

onMounted(() => {
  if(userState.isLogin) getUserCardInfo();
  getHotTags();
});
</script>

<template>
  <div class="sideContent">
    <user-card v-show="userState.isLogin" :id="userState.userId" :attention="sideContentData.cardInfo.followedNum" :blog="sideContentData.cardInfo.articleNum" :fans="sideContentData.cardInfo.followerNum" :name="sideContentData.cardInfo.name" :is-attention="(sideContentData.cardInfo.followed as boolean)" :url="sideContentData.cardInfo.avatar" ></user-card>
    <div class="sideCard">
      <div class="title">
        <n-icon color="#C70002" style="position: relative; top: 3px;"><american-football-sharp /></n-icon>
        本站简介
      </div>
      <div class="content">
        欢迎来到<span style="color: #39c5bb;">ヽ(*ﾟдﾟ)ノBlog!</span> 你可以在本博客网站上创建属于自己的账号,
        用博客分享自己学习上的心得和生活上的趣事。若遇到任何技术性问题，欢迎联系站长。
      </div>
    </div>
    <div class="sideCard">
      <div class="title">
        <n-icon color="#6FA802" style="position: relative; top: 3px;">
          <albums />
        </n-icon>
        博客分组
      </div>
      <div class="content">
        <div v-for="item in sideContentData.groupList" @click="toGroup(item.id)" class="groupItem">
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="sideCard" style="margin-bottom: 20px;" >
      <div class="title">
        <n-icon color="#CFD0CF" style="position: relative; top: 3px;">
          <PricetagsSharp />
        </n-icon>
        热门标签
      </div>
      <div class="wordContent">
        <TagsCloud @tag-click="tagClick" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sideContent {
  margin-top: 20px;
  .sideCard {
    background-color: $github-card-background;
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    max-width: 250px;

    .title {
      font-size: 19px;
      line-height: 19px;
      color: white;
      font-weight: bold;
    }

    .content {
      margin-top: 20px;
      font-size: 16px;
      line-height: 20px;
      color: $github-header-text;

      .groupItem {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        transition: all .3s;
        padding: 5px;
        cursor: pointer;

        &:hover {
          padding-left: 10px;
          padding-right: 10px;
          background-color: rgb(56, 56, 56);
        }
      }
    }

    .wordContent {
      margin-top: 20px;
      height: 250px;
    }
  }
}</style>