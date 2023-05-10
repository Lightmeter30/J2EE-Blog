<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { Person, Time, Star, ChatboxEllipses, Pencil, Trash } from '@vicons/ionicons5';
import { useMessage, useDialog } from 'naive-ui';
import { RequestDeleteArticle, RequestDeleteDraft } from '@/request/requestData';
import { deleteArticleAPI, deleteDraftAPI } from '@/request/api';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const dialog = useDialog();
const message = useMessage();
const userState = useUserStore();
const type: number = 3;
const blog = {
  id: 114514,
  title: 'typescript/javascript学习笔记',
  description: '这是我学习typescript/javascript的学习笔记，其中以typescript为主，同时会介绍一点javascript里面会有的知识点',
  author: faker.name.firstName(),
  time: faker.date.past(),
  collectNum: 114,
  commentNum: 10,
}

function toBlogView() {
  console.log('toBlogView');
  router.push({path: '/blog' ,query: {id: blog.id}});
}

function toPersonView() {
  console.log('toPersonView');
  router.push({path: '/space/home' ,query: {name: blog.author}});
}

function toEdit() {
  console.log('toEdit');
  router.push({ path: '/edit', query: { id: blog.id } });
}

const removeArticle = () => {
  dialog.warning({
    title: '警告',
    content: '此操作将删除该文章且不可挽回,是否确认删除?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const data: RequestDeleteArticle = {
        id: blog.id
      }
      const res = await deleteArticleAPI(data, userState);
      if(res.data.status === 0) {
        message.success('删除成功');
      } else {
        message.error(res.data.message);
      }
    },
    onNegativeClick: () => {
      message.error('取消');
    }
  })
}

function removeDarft() {
  dialog.warning({
    title: '警告',
    content: '此操作将删除该草稿且不可挽回,是否确认删除?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const data: RequestDeleteDraft = {
        id: blog.id
      }
      const res = await deleteDraftAPI(data, userState);
      if(res.data.status === 0) {
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

</script>

<template>
  <div class="blogCard">
    <div class="title">
      <span @click="toBlogView()"><b>{{ blog.title }}</b></span>
    </div>
    <div class="description">
      {{ blog.description }}
    </div>
    <!-- ordinal article -->
    <div class="foot" v-if="type === 1">
      <span class="author" @click="toPersonView()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Person />
          </n-icon></span> {{ blog.author }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span> 更新于{{ blog.time }}</span>
      &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <Star />
          </n-icon></span> {{ blog.collectNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <ChatboxEllipses />
          </n-icon></span> {{ blog.commentNum }}</span>
    </div>
    <!-- edit article -->
    <div class="foot" v-else-if="type === 2">
      <span class="author" @click="toPersonView()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Person />
          </n-icon></span> {{ blog.author }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span> 更新于{{ blog.time }}</span>
      &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <Star />
          </n-icon></span> {{ blog.collectNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <ChatboxEllipses />
          </n-icon></span> {{ blog.commentNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="toEdit()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Pencil />
          </n-icon></span> 编辑</span> &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="removeArticle()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Trash />
          </n-icon></span> 删除</span>
    </div>
    <!-- draft -->
    <div class="foot" v-else>
      <span class="author" @click="toPersonView()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Person />
          </n-icon></span> {{ blog.author }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span> 编辑于{{ blog.time }}</span>
      &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="toEdit()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Pencil />
          </n-icon></span> 编辑</span> &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="removeDarft()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Trash />
          </n-icon></span> 删除</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blogCard {
  background-color: rgb(244,245,247);;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;

  .title {
    font-size: 22px;

    span {
      @include text-hover;
    }
  }

  .description {
    color: $cloud-1-hex;
    font-size: medium;
  }

  .foot {
    margin-top: 10px;
    color: $cloud-1-hex;
    line-height: normal;

    .author {
      @include text-hover;
    }
  }
}</style>