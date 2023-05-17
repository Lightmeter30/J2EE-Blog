<script setup lang="ts">
import { Person, Time, Star, ChatboxEllipses, Pencil, Trash,PricetagsSharp, Albums } from '@vicons/ionicons5';
import { useMessage, useDialog } from 'naive-ui';
import {  RequestDeleteDraft } from '@/request/requestData';
import {  deleteDraftAPI } from '@/request/api';
import { Draft } from '@/request/responseData';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const dialog = useDialog();
const message = useMessage();
const userState = useUserStore();

interface draftDataType {
  author: number;
  description: string;
  id: number;
  title: string;
  updateTime: string;
};

const props = defineProps<draftDataType>();

const tags = [
  {
    id: 1,
    name: 'vue'
  },
  {
    id: 2,
    name: 'html'
  },
  {
    id: 3,
    name: 'css'
  },
  {
    id: 4,
    name: 'SQL'
  },
  {
    id: 5,
    name: 'python'
  },
];

function toEdit() {
  console.log('toEdit');
  router.push({ path: '/edit', query: { id: props.id, type: '1919' } });
}

function removeDraft() {
  dialog.warning({
    title: '警告',
    content: '此操作将删除该草稿且不可挽回,是否确认删除?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const data: RequestDeleteDraft = {
        id: props.id
      }
      const res = await deleteDraftAPI(data, userState);
      if(res.data.status === 0) {
        message.success('删除成功', {duration: 1200});
      } else {
        message.error(res.data.message, {duration: 1200});
      }
    },
  })
};

</script>

<template>
  <div class="blogCard">
    <div class="title">
      <span @click="toEdit()"><b>{{ title }}</b></span>
    </div>
    <div class="description">
      {{ description }}
    </div>
    <div class="tags">
      <span class="topic">
        <n-icon style="position: relative; top: 3px;padding-right: 4px;">
          <Albums />
        </n-icon>
        <span>Computer Science</span></span> &nbsp;
      <span v-show="tags.length !== 0" >
        <b>|</b>&nbsp;
        <n-icon style="position: relative; top: 3px;padding-right: 8px;">
          <PricetagsSharp />
        </n-icon>
        <span v-for="(item, index) in tags" class="tagItem">
          <span class="name">{{ item.name }}</span><span class="split" v-show="index !== tags.length - 1">·</span>
        </span>
      </span>
    </div>
    <!-- draft -->
    <div class="foot">
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span> 编辑于{{ updateTime }}</span>
      &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="toEdit()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Pencil />
          </n-icon></span> 编辑</span> &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="removeDraft()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Trash />
          </n-icon></span> 删除</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blogCard {
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  min-width: 600px;
  background: url('@/assets/img/card.png') right bottom no-repeat $github-card-background;

  &:hover {
    background: url('@/assets/img/card.png') right bottom no-repeat $github-card-hover;
  }
  .title {
    font-size: 22px;
    color: $github-header-text;
    width: calc(100% - 170px);

    span {
      @include text-hover;
    }
  }

  .description {
    color: $cloud-1-hex;
    font-size: medium;
    width: calc(100% - 170px);
  }

  .tags {
    padding-top: 5px;
    font-size: 14px;
    color: $cloud-1-hex;
    line-height: 14px;
    width: calc(100% - 170px);
    font-weight: bold;

    .tagItem {

      .split {
        padding-left: 4px;
        padding-right: 4px;
        position: relative;
        top: 0.6px;
      }
    }
  }

  .foot {
    margin-top: 10px;
    color: $cloud-1-hex;
    line-height: normal;

    .author {
      @include text-hover;
    }
  }
}
</style>