<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import MdEditor from 'md-editor-v3';
import { onMounted } from 'vue';
// import {faker} from "@faker-js/faker";

const route = useRoute();
const router = useRouter();
const message = useMessage();
const text = ref('123');

onMounted(() => {
  console.log('onMounted');
})
</script>
<template>
  <div class="blogContent" >
    <MdEditor v-model="text" :preview-only="true"></MdEditor>
  </div>
</template>

<style scoped lang="scss">
.blogContent {
  
}
</style>