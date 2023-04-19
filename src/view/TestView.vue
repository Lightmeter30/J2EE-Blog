<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import MdEditor from 'md-editor-v3';
const text = ref('# hello\n```c \
#include<stdio.h> \n\
int main(){  \n\
    printf("hello world!"); \n\
} \n\
```');
</script>

<template>
  <div style="display: center; width: 80%">
    <MdEditor v-model="text" :preview-only="true"></MdEditor>
  </div>
</template>