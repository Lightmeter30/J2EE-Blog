<script setup lang="ts">
import { Person, Time, Star, ChatboxEllipses, Pencil, Trash, PricetagsSharp, Albums, } from '@vicons/ionicons5';
import { useMessage, useDialog } from 'naive-ui';
import { RequestDeleteArticle, RequestDeleteFavorites } from '@/request/requestData';
import { deleteArticleAPI, deleteArticleFromCollectAPI } from '@/request/api';
import { Article, Theme, Label } from '@/request/responseData';
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
  favoriteId?: number; // 收藏夹中某一收藏的id,在删除时调用
  topic: Theme;
  tags: Label[];
};

const isDelete = ref(false);
const props = defineProps<ArticleCard>();
const emits = defineEmits(['removeCollect']);


function toBlogView() {
  if (!userState.isLogin) {
    message.warning('只有登录用户才能查看博客内容!');
    return;
  }
  const newPage = router.resolve({ path: '/blog', query: { id: props.id } });
  window.open(newPage.href, '_blank');
}

function toPersonView() {
  if (!userState.isLogin) {
    message.warning('只有登录用户才能查看作者界面!');
    return;
  }
  const newPage = router.resolve({ path: '/space/home', query: { id: props.author } });
  window.open(newPage.href, '_blank');
}

function toEdit() {
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
        message.success('删除成功', { duration: 1200 });
      } else {
        message.error(res.data.message, { duration: 1200 });
      }
    },
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
        id: props.favoriteId as number,
      }
      const res = await deleteArticleFromCollectAPI(data, userState);
      if (res.data.status === 0) {
        emits('removeCollect');
        isDelete.value = true;
        message.success('移除收藏夹成功', { duration: 1200 });
      } else {
        message.error(res.data.message, { duration: 1200 });
      }
    },
  })
};

function toTopic() {
  const nowPage = router.resolve({ path: '/group', query: { id: props.topic.id } });
  window.open(nowPage.href, '_blank');
}

function toTags(id: number) {
  const nowPage = router.resolve({ path: '/tags', query: { id: id } });
  window.open(nowPage.href, '_blank');
}

</script>

<template>
  <div class="blogCard" v-show="!isDelete">
    <div class="title">
      <span @click="toBlogView()"><b>{{ title }}</b></span>
    </div>
    <div class="description">
      <n-ellipsis :line-clamp="2" :tooltip="false" >
        {{ description }}
      </n-ellipsis>
    </div>
    <div class="tags">
      <span class="author topic" @click="toTopic">
        <n-icon style="position: relative; top: 3px;padding-right: 4px;">
          <Albums />
        </n-icon>
        <span>{{ topic.name }}</span></span> &nbsp;
      <span v-show="tags.length !== 0">
        <b>|</b>&nbsp;
        <n-icon style="position: relative; top: 3px;padding-right: 8px;">
          <PricetagsSharp />
        </n-icon>
        <span v-for="(item, index) in tags" class="tagItem">
          <span class="name" @click="toTags(item.id)">{{ item.name }}</span><span class="split"
            v-show="index !== tags.length - 1">·</span>
        </span>
      </span>
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
          </n-icon></span> {{ commentsNum }}</span> &nbsp;<b>|</b>&nbsp;
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
    width: calc(100% - 170px);
    // max-height: 52px;
  }

  .tags {
    // padding-top: 5px;
    font-size: 14px;
    color: $cloud-1-hex;
    line-height: 14px;
    width: calc(100% - 170px);

    .tagItem {
      .name {
        cursor: pointer;
        font-weight: bold;

        &:hover {
          color: $miku-fans-theme;
          text-decoration-line: underline;
        }
      }

      .split {
        font-weight: bold;
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
    // font-weight: bold;
  }

  .author {
    @include text-hover;
  }
}

.topic {
  font-weight: bold;
}
</style>