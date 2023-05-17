<script setup lang="ts">
import { AddCircle, CloudUpload } from "@vicons/ionicons5";
import { useUserStore } from '@/stores/user';
import { getArticlesFromCollectAPI, addCollectAPI, deleteCollectAPI, getUserAllCollectAPI, getArticleByListAPI, getOtherBriefInfosAPI } from "@/request/api";
import { RequestGetFolderFavorites, RequestAddFavoriteFolder, RequestDeleteFavoriteFolder, RequestGetByIdList, RequestGetOtherBriefInfos } from "@/request/requestData";
import { FavoriteFolder, Article } from "@/request/responseData";
import { darkTheme } from "naive-ui";

let collect: HTMLElement;
let Delete: HTMLElement;
const newCollect = ref('');
const showModal = ref(false);
const loading = ref(true);
const userStore = useUserStore();
const message = useMessage();
const dialog = useDialog();

type collectDataType = {
  currentArticleList: Article[],
  collectFolderList: FavoriteFolder[],
  total: number,
};

const collectData = reactive<collectDataType>({
  currentArticleList: [],
  collectFolderList: [],
  total: 1,
});
function changePage(page: number) {
  console.log(`to page ${page}`);
}

function showDialog() {
  showModal.value = true;
}

function changeSelectCollect(id: number, index: number) {
  if (collect === undefined) {
    collect = document.getElementById(`folder0`) as HTMLElement;
    Delete = document.getElementById(`delete0`) as HTMLElement;
  }
  collect.classList.remove('selectedCollect');
  collect.classList.add('collectHover');
  collect = document.getElementById(`folder${index}`) as HTMLElement;
  collect.classList.remove('collectHover');
  collect.classList.add('selectedCollect');

  Delete.classList.remove('selectDelete');
  Delete.classList.add('delete');
  Delete = document.getElementById(`delete${index}`) as HTMLElement;
  Delete.classList.remove('delete');
  Delete.classList.add('selectDelete');
  // change collect now
  getArticlesFromCollect(id);
}

async function getArticlesFromCollect(collectId: number) {
  const data: RequestGetFolderFavorites = {
    folderId: collectId
  };
  const res = await getArticlesFromCollectAPI(data, userStore);
  if (res.data.status == 0) {
    // TODO: test API
    console.log(res.data.data);
    const favorites = res.data.data;
    const articleNum: number[] = [];
    const favoriteID: number[] = [];
    for( let i = 0; i < favorites.length; i++) {
      articleNum[i] = favorites[i].articleId;
      favoriteID[i] = favorites[i].id;
    }
    getArticles(articleNum, favoriteID);
  } else {
    message.error(res.data.message);
  }
}

async function getArticles(ids: number[], favoriteID: number[]) {
  const data: RequestGetByIdList = {
    ids: ids
  }
  const res = await getArticleByListAPI(data, userStore);
  if(res.data.status === 0) {
    collectData.currentArticleList = res.data.data;
    const ids: number[] = [];
    for(let i = 0; i < collectData.currentArticleList.length; i++) {
      collectData.currentArticleList[i].favoritesNum = favoriteID[i];
      ids.push(collectData.currentArticleList[i].author);
    }
    // TODO: 添加用户名
    getBriefInfo(ids);
  }
}

async function getBriefInfo(ids: number[]) {
  const data: RequestGetOtherBriefInfos = {
    ids: ids
  };
  const res = await getOtherBriefInfosAPI(data, userStore);
  if(res.data.status === 0) {
    const temp = res.data.data;
    for(let i = 0; i < temp.length; i++) {
      collectData.currentArticleList[i].authorName = temp[i].name;
    }
    loading.value = false;
  } else {
    message.error(res.data.message)
  }
}

async function addCollect() {
  if (newCollect.value === '') {
    message.error('收藏夹名字不能为空');
    return;
  }
  const data: RequestAddFavoriteFolder = {
    name: newCollect.value,
  }
  const res = await addCollectAPI(data, userStore);
  if (res.data.status === 0) {
    message.success('新建收藏夹成功');
    const newFolder: FavoriteFolder = {
      id: res.data.data,
      name: newCollect.value,
      favoritesNum: 0,
      userId: userStore.userId
    }
    collectData.collectFolderList.push(newFolder);
  } else {
    message.error(res.data.message);
  }
}

function removeCollect(id: number, index: number) {
  dialog.warning({
    title: '警告',
    content: '此操作将删除该收藏夹且不可挽回,是否确认删除?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const data: RequestDeleteFavoriteFolder = {
        id: id
      }
      const res = await deleteCollectAPI(data, userStore);
      if (res.data.status === 0) {
        // TODO: test API
        collectData.collectFolderList.splice(index, 1);
        message.success('删除成功');
      } else {
        message.error(res.data.message);
      }
    },
  })
};

const getAllFolders = async () => {
  const res = await getUserAllCollectAPI(userStore);
  if (res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
    collectData.collectFolderList = res.data.data;
    console.log(`folder${collectData.collectFolderList[0].id}`);
    // collect = document.getElementById(`folder0`) as HTMLElement;
    // collect.classList.remove('collectHover');
    // collect.classList.add('selectedCollect');
    getArticlesFromCollect(collectData.collectFolderList[0].id);
  } else {
    message.error(res.data.message);
  }
};

onMounted(() => {
  getAllFolders();
});

</script>

<template>
  <div class="spaceCollect">
    <div class="loading" v-if="loading">
      <n-spin :size="150" stroke="#39c5bb" />
    </div>
    <div class="container" v-else>
      <div class="sideIndex">
        <div class="addCollect" @click="showDialog">
          <n-icon style="position: relative; top: 2px;">
            <AddCircle />
          </n-icon> 新建收藏夹
        </div>
        <CollectList v-for="(item, key) in collectData.collectFolderList" :index="key" :id="item.id" :name="item.name"
          :articleNum="item.favoritesNum" @select-me="changeSelectCollect" @delete-me="removeCollect" />
      </div>
      <div class="content" v-if="collectData.currentArticleList.length === 0">
        <div class="empty">
          <img  style="height: 300px;margin-top: 100px;" src="@/assets/img/null-search.svg" />
          <div>勇敢的少年啊快去收藏博客!</div>
        </div>
      </div>
      <div class="content" v-else>
        <div class="collectContent">
          <blog-card v-for="item in collectData.currentArticleList" :author="item.author" :author-name="(item.authorName as string)"
            :card-type="3"
            :description="item.description" :favorites-num="item.favoritesNum" :id="item.id" :title="item.title"
            :update-time="item.updateTime" :comments-num="item.commentsNum" :favorite-id="item.favoritesNum"></blog-card>
        </div>
        <div class="collectFoot" v-show="collectData.total !== 1">
          <n-config-provider :theme="darkTheme">
            <n-pagination :on-update:page="changePage" :item-count="collectData.total" show-quick-jumper>
              <template #goto>
                跳至
              </template>
            </n-pagination>
          </n-config-provider>
        </div>
      </div>
      <n-config-provider :theme="darkTheme">
        <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
          <template #header>
            <div>新建收藏夹</div>
          </template>
          <div>
            <n-form ref="formRef">
              <n-form-item label="收藏夹名">
                <n-input v-model:value="newCollect" />
              </n-form-item>
            </n-form>
          </div>
          <template #action>
            <div>
              <n-button color="#39c5bb" @click="addCollect()">
                <template #icon>
                  <n-icon>
                    <cloud-upload />
                  </n-icon>
                </template>
                提交
              </n-button>
            </div>
          </template>
        </n-modal>
      </n-config-provider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceCollect {
  background-color: $github-background;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 40px;
  min-height: 550px;

  .container {
    display: flex;
  }

  .sideIndex {
    width: 20%;
    background-color: $github-card-background;
    color: $github-header-text;
    border-radius: 5px;
  }

  .addCollect {
    padding: 10px;
    font-size: medium;
    cursor: pointer;

    &:hover {
      background-color: $github-card-hover;
      opacity: 0.9;
    }
  }

  .content {
    width: 80%;
    padding-left: 10px;

    .collectContent {}

    .empty {
      font-size: 20px;
      color: $github-header-text;
      text-align: center;
    }

    .collectFoot {
      background-color: $github-card-background;
      min-width: 620px;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
    }
  }

}

.loading {
  @include center;
  position: relative;
  top: 200px;
}
</style>