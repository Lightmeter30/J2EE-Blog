<script setup lang="ts">
import { Folder, Trash } from "@vicons/ionicons5";
type collect = {
  index: number,
  id: number,
  name: string,
  articleNum: number,
};

const props = defineProps<collect>();

const isShowDelete = ref(false);

const emits = defineEmits(['selectMe', 'deleteMe']);

function selectMe() {
  emits('selectMe', props.id, props.index);
}

function deleteMe() {
  emits('deleteMe', props.id, props.index);
}

function showDelete() {
  if (props.index !== 0) {
    isShowDelete.value = true;
  }
};

function hideDelete() {
  if (props.index !== 0) {
    isShowDelete.value = false;
  }
};

onMounted(() => {
  // console.log(props.index);
  if (props.index === 0) {
    const collect = document.getElementById(`folder0`) as HTMLElement;
    const Delete = document.createElement(`delete0`) as HTMLElement;
    collect.classList.remove('collectHover');
    collect.classList.add('selectedCollect');
    Delete.classList.remove('delete');
    Delete.classList.add('selectDelete');
  }
});
</script>

<template>
  <div class="collectList collectHover" @mouseenter="showDelete" @mouseleave="hideDelete" :id="'folder' + index">
    <div class="title" @click="selectMe()">
      <span>
        <n-icon style="position: relative; top: 2px;">
          <Folder />
        </n-icon>
        {{ name }}
      </span>
    </div>
    <div class="delete" @click="deleteMe" v-show="isShowDelete" :id="'delete' + index">
      <n-icon>
        <Trash />
      </n-icon>
    </div>
    <div class="articleNum" v-show="!isShowDelete"><span>{{ articleNum }}</span></div>
  </div>
</template>

<style scoped lang="scss">
.collectList {
  padding: 10px;
  font-size: medium;
  display: flex;
  justify-content: space-between;
  position: relative;


  .title {
    cursor: pointer;
  }

  .delete {
    position: absolute;
    right: 8px;
    top: 12px;
    background-color: $github-card-hover;
    // z-index: 10;
    text-align: center;
    cursor: pointer;
  }

  .selectDelete {
    position: absolute;
    right: 8px;
    top: 12px;
    background-color: $miku-fans-theme;
    // z-index: 10;
    // width: 32px;
    text-align: center;
    cursor: pointer;
  }

}



.collectHover {
  &:hover {
    background-color: $github-card-hover;
    color: $github-header-text;
  }

}

.selectedCollect {
  color: white;
  background-color: $miku-fans-theme;

}
</style>