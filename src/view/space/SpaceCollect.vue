<script setup lang="ts">
import { AddCircle, CloudUpload } from "@vicons/ionicons5";
import { useUserStore } from '@/stores/user';
import { addCollectAPI, deleteCollectAPI, getUserAllCollectAPI,  getArticleLabelListAPI, getArticleThemeListAPI, getUserNamesAPI, getFolderFavoritesPageNumAPI, getPageFolderFavoritesAPI } from "@/request/api";
import { RequestAddFavoriteFolder, RequestDeleteFavoriteFolder,  RequestGetLabelsByIds, RequestGetThemeByIds, RequestGetUserNames, RequestGetFolderFavoritesPageNum, RequestGetPageFolderFavorites } from "@/request/requestData";
import { FavoriteFolder, FavoriteArticle, Theme, Label } from "@/request/responseData";
import { darkTheme } from "naive-ui";

let collect: HTMLElement;
let Delete: HTMLElement;
const newCollect = ref('');
const showModal = ref(false);
const loading = ref(true);
const userStore = useUserStore();
const message = useMessage();
const dialog = useDialog();
const nowPage = ref(1);
let nowFolderID = -1;

type collectDataType = {
  currentArticleList: FavoriteArticle[],
  collectFolderList: FavoriteFolder[],
  total: number,
  topicList: Theme[],
  tagsList: Array<Label[]>,
};

const collectData = reactive<collectDataType>({
  currentArticleList: [],
  collectFolderList: [],
  total: 1,
  topicList: [],
  tagsList: [],
});
function changePage(page: number) {
  nowPage.value = page;
  getOnePage(page);
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
  nowPage.value = 1;
  nowFolderID = id;
  getFolderPageNum();
  getOnePage(nowPage.value);
}

async function getUserName(ids: number[], currentArticleList: FavoriteArticle[]) {
  const data: RequestGetUserNames = {
    ids: ids
  }
  const res = await getUserNamesAPI(data);
  if(res.data.status == 0) {
    const author = res.data.data;
    for(let i = 0; i < author.length; i++) {
      currentArticleList[i].article.authorName = author[i];
    }
  } else {
    console.error(res.data.message);
  }
}

async function getThemeList(ids: number[]) {
  const data: RequestGetThemeByIds = {
    ids: ids
  };
  const res = await getArticleThemeListAPI(data);
  if(res.data.status === 0) {
    collectData.topicList = res.data.data;
  } else {
    console.error(res.data.message);
  }
}

async function getLabelList(ids: number[]) {
  const data: RequestGetLabelsByIds = {
    ids: ids
  };
  const res = await getArticleLabelListAPI(data);
  if(res.data.status === 0) {
    collectData.tagsList = res.data.data;
  } else {
    console.error(res.data.message);
  }
}

async function getFolderPageNum() {
  const data: RequestGetFolderFavoritesPageNum = {
    folderId: nowFolderID,
  };
  const res = await getFolderFavoritesPageNumAPI(data, userStore);
  if(res.data.status === 0) {
    collectData.total = res.data.data;
  }
}

async function getOnePage(page:number) {
  const data: RequestGetPageFolderFavorites = {
    folderId: nowFolderID,
    currentPage: page,
  };
  const res = await getPageFolderFavoritesAPI(data, userStore);
  if(res.data.status === 0) {
    const currentArticleList = res.data.data
    const author: number[] = [];
    const ids: number[] = [];
    for(let i = 0; i < currentArticleList.length; i++) {
      author.push(currentArticleList[i].article.author);
      ids.push(currentArticleList[i].article.id);
    }
    // TODO: 添加用户名
    await getUserName(author, currentArticleList);
    await getThemeList(ids);
    await getLabelList(ids);
    collectData.currentArticleList = currentArticleList;
    loading.value = false;
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
    nowFolderID = collectData.collectFolderList[0].id;
    getFolderPageNum();
    getOnePage(1);
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
          <blog-card v-for="(item, index) in collectData.currentArticleList" :author="item.article.author" :author-name="(item.article.authorName as string)"
            :card-type="3"
            :description="item.article.description" :favorites-num="item.article.favoritesNum" :id="item.article.id" :title="item.article.title"
            :update-time="item.article.updateTime" :comments-num="item.article.commentsNum" :favorite-id="item.favorite.id" :tags="collectData.tagsList[index]" :topic="collectData.topicList[index]" ></blog-card>
        </div>
        <div class="collectFoot" v-show="collectData.total > 1">
          <n-config-provider :theme="darkTheme">
            <n-pagination v-model:page="nowPage" :on-update:page="changePage" :item-count="collectData.total" show-quick-jumper>
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