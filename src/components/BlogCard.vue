<script setup lang="ts">
import { Person, Time, Star, ChatboxEllipses, Pencil, Trash } from '@vicons/ionicons5';
import { useMessage, useDialog } from 'naive-ui';
import { RequestDeleteArticle, RequestDeleteFavorites } from '@/request/requestData';
import { deleteArticleAPI, deleteArticleFromCollectAPI } from '@/request/api';
import { Article } from '@/request/responseData';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const dialog = useDialog();
const message = useMessage();
const userState = useUserStore();
interface ArticleCard {
  cardType: number; // 1代表普通状态, 2代表可编辑删除状态,3代表收藏夹状态
  author: number;
  authorName: string;
  commentsNum: number;
  description?: string; // 只在卡片展示需要
  favoritesNum: number; 
  id: number;
  title: string;
  updateTime: string;
  CommentOrderNum?: number; // 只在某一个博客的内容界面需要
};
const props = defineProps<ArticleCard>();

function toBlogView() {
  // console.log('toBlogView');
  const newPage = router.resolve({ path: '/blog', query: { id: props.id } });
  window.open(newPage.href, '_blank');
}

function toPersonView() {
  console.log('toPersonView');
  router.push({ path: '/space/home', query: { id: props.author } });
}

function toEdit() {
  // console.log('toEdit');

  const nowPage = router.resolve({ path: '/edit', query: { id: props.id, type: '810' } });
  window.open(nowPage.href, '_blank');
}

const removeArticle = () => {
  dialog.warning({
    title: '警告',
    content: '此操作将删除该文章且不可挽回,是否确认删除?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const data: RequestDeleteArticle = {
        id: props.id
      }
      const res = await deleteArticleAPI(data, userState);
      if (res.data.status === 0) {
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


function removeFromCollect() {
  dialog.warning({
    title: '警告',
    content: '此操作将从当前收藏夹中移除该文章,是否确认移除?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const data: RequestDeleteFavorites = {
        id: props.id
      }
      const res = await deleteArticleFromCollectAPI(data, userState);
      if (res.data.status === 0) {
        message.success('移除收藏夹成功');
      } else {
        message.error(res.data.message);
      }
    },
  })
};

</script>

<template>
  <div class="blogCard">
    <div class="title">
      <span @click="toBlogView()"><b>{{ title }}</b></span>
    </div>
    <div class="description">
      {{ description }}
    </div>
    <!-- Ordinal article -->
    <div class="foot" v-if="props.cardType === 1">
      <span class="author" @click="toPersonView()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Person />
          </n-icon></span> {{ authorName }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span> 更新于{{ updateTime }}</span>
      &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <Star />
          </n-icon></span> 收藏 : {{ favoritesNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <ChatboxEllipses />
          </n-icon></span> 评论 : {{ commentsNum }}</span>
    </div>
    <!-- Edit article -->
    <div class="foot" v-else-if="props.cardType === 2">
      <span class="author" @click="toPersonView()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Person />
          </n-icon></span> {{ authorName }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span> 更新于{{ updateTime }}</span>
      &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <Star />
          </n-icon></span> 收藏 : {{ favoritesNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <ChatboxEllipses />
          </n-icon></span> 评论 : {{ commentsNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="toEdit()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Pencil />
          </n-icon></span> 编辑</span> &nbsp;<b>|</b>&nbsp;
      <span class="author" @click="removeArticle()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Trash />
          </n-icon></span> 删除</span>
    </div>
    <!-- Favorite Article -->
    <div class="foot" v-else-if="props.cardType === 3">
      <span class="author" @click="toPersonView()"><span style="position: relative; top: 1.6px;"><n-icon>
            <Person />
          </n-icon></span> {{ authorName }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon><Time /></n-icon></span> 更新于{{ updateTime }}</span>
      &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <Star />
          </n-icon></span> {{ favoritesNum }}</span> &nbsp;<b>|</b>&nbsp;
      <span><span style="position: relative; top: 1.6px;"><n-icon>
            <ChatboxEllipses />
          </n-icon></span> {{ commentsNum }}</span>
      <span class="author" @click="removeFromCollect"><span style="position: relative; top: 1.6px;"><n-icon>
            <Trash />
          </n-icon></span> 移除收藏</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blogCard {
  background: url('@/assets/img/card.png') right bottom no-repeat $github-card-background;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  min-width: 600px;

  &:hover {
    background: url('@/assets/img/card.png') right bottom no-repeat $github-card-hover;
  }

  .title {
    font-size: 22px;
    color: $github-header-text;

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
}
</style>