<script setup lang="ts">
import { Folder } from "@vicons/ionicons5";
type collect = {
  index: number,
  id: number,
  name: string,
  articleNum: number,
};

const props = defineProps<collect>();

const emits = defineEmits(['selectMe', 'deleteMe']);

function selectMe() {
  emits('selectMe', props.id, props.index);
}

function deleteMe() {
  emits('deleteMe', props.id, props.index);
}

onMounted(() => {
  console.log(props.index);
  if (props.index === 0) {
    const collect = document.getElementById(`folder0`) as HTMLElement;
    collect.classList.remove('collectHover');
    collect.classList.add('selectedCollect');
  }
})
</script>

<template>
  <div class="collectList collectHover" :id="'folder' + index" @click="selectMe()">
    <div class="title">
      <span>
        <n-icon style="position: relative; top: 2px;">
          <Folder />
        </n-icon>
        {{ name }}
      </span>
    </div>
    <div class="articleNum"><span>{{ articleNum }}</span></div>
  </div>
</template>

<style scoped lang="scss">
.collectList {
  padding: 10px;
  font-size: medium;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

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