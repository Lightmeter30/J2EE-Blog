<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

let text = ref('');
const toolbar = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog'
];
function setText() {
  text.value = '# hello\n```c \
#include<stdio.h> \n\
int main(){  \n\
    printf("hello world!"); \n\
} \n\
```'
}
</script>

<template>
  <div class="editContainer">
    <div class="editTitle"></div>
    <div class="editContent">
      <MdEditor 
      v-model="text" 
      :toolbars="toolbar" 
      :show-code-row-number="true"
      ></MdEditor>
    </div>
    <n-button @click="setText()" >set</n-button>
  </div>
</template>

<style scoped lang="scss">
.editContainer{

  .editTitle{}

  .editContent{}

  .editSubmit{}
}
</style>
