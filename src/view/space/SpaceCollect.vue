<script setup lang="ts">
import { AddCircle,CloudUpload } from "@vicons/ionicons5";
import {FavoriteFolder} from '@/request/responseData';
import { useUserStore } from '@/stores/user';

let collect: HTMLElement;
const newCollect = ref('');
const showModal = ref(false);
const userStore = useUserStore();
const message = useMessage();
type list = {
  collectList: FavoriteFolder[],
};
const List: list = {
  collectList: [],
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

function addCollect() {
  const data: FavoriteFolder = {
    id: 114,
    name: newCollect.value,
    articleNum: 0,
    userId: userStore.userId,
  }
  folder.collectList.push(data);
  newCollect.value = '';
  showModal.value = false;
}

onMounted(() => {
  collect = document.getElementById(`folder1`) as HTMLElement;
  collect.classList.remove('collectHover');
  collect.classList.add('selectedCollect');
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
      <CollectList v-for="item in folder.collectList" :id="item.id" :name="item.name" :articleNum="item.articleNum"
        @select-me="changeSelectCollect" />
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
        <n-pagination :on-update:page="changePage" :item-count="total" show-quick-jumper>
          <template #goto>
            跳至
          </template>
        </n-pagination>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceCollect {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  display: flex;

  .sideIndex {
    width: 20%;
    background-color: rgb(244, 245, 247);
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
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
    }
  }

}</style>