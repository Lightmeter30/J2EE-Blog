<script setup lang="ts">
import { Folder } from "@vicons/ionicons5";
type collect = {
  id: number,
  name: string,
  articleNum: number,
};

const props = defineProps<collect>();

const emits = defineEmits(['selectMe']);

function selectMe() {
  emits('selectMe', props.id);
}
</script>

<template>
  <div class="collectList collectHover" :id="'folder' + id" @click="selectMe()">
    <div class="title" >
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
    background-color: $cloud-1-hex;
  }
}

.selectedCollect {
  color: white;
  background-color: $miku-fans-theme;
}
</style>