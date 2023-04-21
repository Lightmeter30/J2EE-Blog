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
  <div class="blogContent">
    <div class="card">
      <user-card></user-card>
    </div>
    <div class="content">
      <MdEditor v-model="text" :preview-only="true"></MdEditor>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blogContent {
  position: relative;
  left: 5%;
  width: 90%;
  display: flex;
  justify-content: space-around;
  .card {
    position: relative;
    top: 40px;
    left: 10px;
  }
  .content {
    position: relative;
    top: 40px;
    width: 75%;
    min-width: 800px;
    padding: 20px;
    background-color: #fff;
    border-radius: 1rem;
    min-height: 1600px;
    /* may change */
  }
}
</style>