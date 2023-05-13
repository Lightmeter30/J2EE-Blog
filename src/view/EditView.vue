<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { FormRules } from "naive-ui";
// import { CloudUploadOutline } from "@vicons/ionicons5"
import { darkTheme } from "naive-ui";
import { RequestAddArticle, RequestUploadImg, RequestUpdateArticle, RequestGetArticle, RequestAddDraft, RequestUpdateDraft, RequestGetDraft } from '@/request/requestData';
import { getNowTime } from '@/utils/validate';
import { useUserStore } from '@/stores/user';
import { updateArticleAPI, addArticleAPI, getArticleAPI, uploadImgAPI, addDraftAPI, updateDraftAPI, getDraftAPI } from '@/request/api';

let text = ref('');
const router = useRouter();
const NormalToolbar = MdEditor.NormalToolbar;
const message = useMessage();
const userState = useUserStore();
let articleType: number = 0; // 0 is new, 1 is draft, 2 is old article 
const blog = reactive({
  title: '',
  description: '',
  Group: 0,
  content: '',
  tags: []
});

const groupOptions = [
  {
    label: '计算机',
    value: 0,
  },
  {
    label: '二次元',
    value: 1,
  },
  {
    label: '生活区',
    value: 2,
  },
  {
    label: '舞蹈区',
    value: 3,
  },
  {
    label: '哲学区',
    value: 4,
  },
  {
    label: '视频区',
    value: 5,
  },
  {
    label: '游戏区',
    value: 6,
  },
];
const ruleBlog: FormRules = {
  title: {
    required: true,
    trigger: ['focus', 'input'],
    validator() {
      if (blog.title.length === 0) {
        return new Error('请添加文章标题')
      }
    }
  },
  description: {
    required: true,
    trigger: ['focus', 'input'],
    validator() {
      if (blog.description.length === 0) {
        return new Error('请添加文章简介')
      }
    }
  },
}
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
  '-',
  0,
  1,
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'catalog'
];

function isNull(): boolean {
  if (blog.title.length === 0 || blog.description.length === 0 || blog.content.length === 0 || blog.tags.length === 0)
    return true;
  else
    return false;
}

async function save() {
  if (isNull()) {
    message.error('文章标题,简介,标签或内容不能为空!', { duration: 1200 });
    return;
  }
  if (articleType === 0) {
    // it's a new article
    addDraft();
    articleType = 1;
  } else if (articleType === 1) {
    // it's a draft article
    updateDraft();
  } else if (articleType === 2) {
    // it's a old article
    // TODO: 
  }
};

const addArticle = async () => {
  const data: RequestAddArticle = {
    title: blog.title,
    content: text.value,
    updateTime: getNowTime(),
    description: blog.description
  }
  const res = await addArticleAPI(data, userState);
  if (res.data.status === 0) {
    // router.replace({path: '/blog', query: {code: res.data.code}});
    console.log(res);
    message.success('发布成功!', { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

const updateArticle = async () => {
  const data: RequestUpdateArticle = {
    id: Number(router.currentRoute.value.query.id),
    title: blog.title,
    content: text.value,
    updateTime: getNowTime(),
    description: blog.description
  };
  const res = await updateArticleAPI(data, userState);
  if (res.data.status === 0) {
    console.log(res);
    message.success('发布成功!', { duration: 1200 });
    router.replace({ path: '/blog', query: { id: router.currentRoute.value.query.id } });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

async function addDraft() {
  const data: RequestAddDraft = {
    title: blog.title,
    content: text.value,
    description: blog.description,
    updateTime: getNowTime(),
  };
  const res = await addDraftAPI(data, userState);
  if (res.data.status === 0) {
    // TODO: API test
    message.success('已保存到草稿箱!', { duration: 1200 });
    // message.success(res.data.message);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

async function updateDraft() {
  const data: RequestUpdateDraft = {
    id: Number(router.currentRoute.value.query.id),
    title: blog.title,
    content: text.value,
    updateTime: getNowTime(),
    description: blog.description
  };
  const res = await updateDraftAPI(data, userState);
  if (res.data.status === 0) {
    console.log(res);
    message.success('发布成功!', { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

const upload = () => {
  if (isNull()) {
    message.error('文章标题,简介,标签或内容不能为空!', { duration: 1200 });
    return;
  }
  if (articleType === 0 || articleType === 1) {
    addArticle();
  } else {
    updateArticle();
  }
}

const onUploadImg = async (files: any, callback: any) => {
  const data: RequestUploadImg = {
    articleImg: files[0],
  };
  const res = await uploadImgAPI(data, userState);
  if (res.data.status === 0) {
    console.log(res.data);
    const url: Array<string> = [userState.staticHead + res.data.data];
    callback(url);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

const getArticleInfo = async () => {
  const data: RequestGetArticle = {
    id: Number(router.currentRoute.value.query.id)
  }
  const res = await getArticleAPI(data, userState);
  if (res.data.status === 0) {
    // TODO:
    blog.title = res.data.data.title;
    blog.description = res.data.data.description as string;
    text.value = res.data.data.content as string;
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

async function getDraftInfo() {
  const data: RequestGetDraft = {
    id: Number(router.currentRoute.value.query.id)
  }
  const res = await getDraftAPI(data, userState);
  if (res.data.status === 0) {
    // TODO:
    blog.title = res.data.data.title;
    blog.description = res.data.data.description;
    text.value = res.data.data.content as string;
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

onMounted(() => {
  //  114514 is the new(0), 1919 is the draft(1), 810 is the old(2)
  if (router.currentRoute.value.query.type === '114514') {
    articleType = 0;
  } else if (router.currentRoute.value.query.type === '1919') {
    articleType = 1;
    getDraftInfo();
  } else if (router.currentRoute.value.query.type === '810') {
    articleType = 2;
    getArticleInfo();
  }
});

</script>

<template>
  <div class="editContainer">
    <div class="editTitle">
      <NForm :rules="ruleBlog">
        <NFormItemRow label="标题" path="title">
          <NInput maxlength="10" placeholder="请输入文章标题" v-model:value="blog.title" />
        </NFormItemRow>
        <NFormItemRow label="简介" path="description">
          <NInput maxlength="30" placeholder="请输入简介" v-model:value="blog.description" />
        </NFormItemRow>
      </NForm>
      <n-config-provider :theme="darkTheme">
        <div class="tagAndGroup">
          <div class="group">
            <div>博客分组</div>
            <n-select v-model:value="blog.Group" :options="groupOptions" />
          </div>
          <div class="tags">
            <div>文章标签<span style="color: #d03050;" > *</span></div>
            <n-dynamic-tags v-model:value="blog.tags" />
          </div>
        </div>

      </n-config-provider>
    </div>
    <div class="editContent">
      <MdEditor theme="dark" v-model="text" :toolbars="toolbar" :show-code-row-number="true" @onUploadImg="onUploadImg">
        <template #defToolbars>
          <NormalToolbar title="保存到草稿箱" @onClick="save()">
            <template #trigger>
              <svg t="1682220624006" class="md-editor-icon" aria-hidden="true" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="10601" width="200" height="200">
                <path
                  d="M454.4 170.666667h113.066667c8.533333 0 14.933333 2.133333 19.2 8.533333s8.533333 12.8 8.533333 19.2v198.4h138.666667c8.533333 0 12.8 2.133333 14.933333 6.4 2.133333 4.266667 0 8.533333-4.266667 14.933333l-217.6 243.2c-4.266667 6.4-10.666667 8.533333-19.2 8.533334s-12.8-2.133333-19.2-8.533334l-215.466666-243.2c-4.266667-6.4-6.4-10.666667-4.266667-14.933333s6.4-6.4 14.933333-6.4h142.933334v-198.4c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-6.4 12.8-8.533333 19.2-8.533333z m-226.133333 512h569.6c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v142.933333h-625.066667v-142.933333c0-8.533333 2.133333-14.933333 8.533334-19.2 4.266667-6.4 10.666667-8.533333 19.2-8.533333z m482.133333 57.6v27.733333h57.6v-27.733333h-57.6z"
                  p-id="10602" fill="#707070"></path>
              </svg> </template>
          </NormalToolbar>
          <NormalToolbar title="发布" @onClick="upload()">
            <template #trigger>
              <svg class="md-editor-icon" aria-hidden="true" t="1682219906971" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2638" width="200" height="200">
                <path
                  d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m-2.072381 125.220571l222.890667 222.890667-51.712 51.712-135.070476-135.070476-0.024381 299.544381h-73.142858V436.394667l-134.119619 134.095238-51.712-51.712 222.890667-222.890667z"
                  p-id="2639" fill="#707070"></path>
              </svg>
            </template>
          </NormalToolbar>
        </template>
      </MdEditor>
    </div>
  </div>
</template>

<style scoped lang="scss">
.editContainer {
  width: 90%;
  margin-left: 5%;

  .editTitle {
    width: 50%;
    position: relative;
    left: 25%;
    padding-top: 40px;
  }

  .tagAndGroup {
    display: flex;
    color: rgba(255, 255, 255, 0.82);

    .group {
      width: 100px;
      margin-right: 40px;

      div {
        padding-bottom: 5px;
      }
    }

    .tags {
      width: auto;

      div {
        padding-bottom: 5px;
      }
    }
  }

  .editContent {}

  .editSubmit {}
}
</style>
