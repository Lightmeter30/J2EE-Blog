<script setup lang="ts">
import { AddCircle, CloudUpload } from "@vicons/ionicons5";
import { FavoriteFolder } from '@/request/responseData';
import { useUserStore } from '@/stores/user';
import { getArticlesFromCollectAPI, addCollectAPI, deleteCollectAPI, getUserAllCollectAPI } from "@/request/api";
import { RequestGetFolderFavorites, RequestAddFavoriteFolder, RequestDeleteFavoriteFolder } from "@/request/requestData";
import { Favorite } from "@/request/responseData";
import { darkTheme } from "naive-ui";

let collect: HTMLElement;
const newCollect = ref('');
const showModal = ref(false);
const userStore = useUserStore();
const message = useMessage();
const dialog = useDialog();
type list = {
  collectList: FavoriteFolder[],
  articleList: Favorite[],
};
const List: list = {
  collectList: [],
  articleList: [],
}

const folder = reactive(List);

let total = ref(114);
function changePage(page: number) {
  console.log(`to page ${page}`);
}

function showDialog() {
  showModal.value = true;
}

function changeSelectCollect(value: number) {
  collect.classList.remove('selectedCollect');
  collect.classList.add('collectHover');
  collect = document.getElementById(`folder${value}`) as HTMLElement;
  collect.classList.remove('collectHover');
  collect.classList.add('selectedCollect');
  // change collect now

}

async function getArticlesFromCollect(collectId: number) {
  const data: RequestGetFolderFavorites = {
    folderId: collectId
  };
  const res = await getArticlesFromCollectAPI(data, userStore);
  if (res.data.status == 0) {
    // TODO: test API
    console.log(res.data.data);
  } else {
    message.error(res.data.message);
  }
}

async function addCollect() {
  const data: RequestAddFavoriteFolder = {
    name: newCollect.value,
  }
  const res = await addCollectAPI(data, userStore);
  if (res.data.status === 0) {
    message.success('新建收藏夹成功');
    const newFolder: FavoriteFolder = {
      id: res.data.data,
      name: newCollect.value,
      articleNum: 0,
      userId: userStore.userId
    }
    folder.collectList.push(newFolder);
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
        List.collectList.splice(index, 1);
        message.success('删除成功');
      } else {
        message.error(res.data.message);
      }
    },
    onNegativeClick: () => {
      message.error('取消');
    }
  })
};

const getAllFolders = async () => {
  const res = await getUserAllCollectAPI(userStore);
  if (res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
    folder.collectList = res.data.data;
  } else {
    message.error(res.data.message);
  }
};

onMounted(() => {
  // collect = document.getElementById(`folder1`) as HTMLElement;
  // collect.classList.remove('collectHover');
  // collect.classList.add('selectedCollect');
  getAllFolders();
});

</script>

<template>
  <div class="spaceCollect">
    <div class="sideIndex">
      <div class="addCollect" @click="showDialog">
        <n-icon style="position: relative; top: 2px;">
          <AddCircle />
        </n-icon> 新建收藏夹
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
      <CollectList v-for="(item, key) in folder.collectList" :index="key" :id="item.id" :name="item.name"
        :articleNum="item.articleNum" @select-me="changeSelectCollect" @delete-me="removeCollect" />
    </div>
    <div class="content">
      <div class="collectContent">
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
        <blog-card></blog-card>
      </div>
      <div class="collectFoot">
        <n-config-provider :theme="darkTheme">
          <n-pagination :on-update:page="changePage" :item-count="total" show-quick-jumper>
            <template #goto>
              跳至
            </template>
          </n-pagination>
        </n-config-provider>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceCollect {
  background-color: $github-background;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  margin-bottom: 40px;

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
      background-color: $cloud-1-hex;
      opacity: 0.9;
    }
  }

  .content {
    width: 80%;
    padding-left: 10px;

    .collectContent {}

    .collectFoot {
      background-color: $github-card-background;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
    }
  }

}
</style>