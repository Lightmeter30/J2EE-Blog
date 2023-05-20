<script setup lang="ts">
import MdEditor, { ToolbarNames } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { FormRules } from "naive-ui";
// import { CloudUploadOutline } from "@vicons/ionicons5"
import { darkTheme } from "naive-ui";
import { RequestAddArticle, RequestGetTheme, RequestGetLabels, RequestUploadImg, RequestUpdateArticle, RequestGetArticle, RequestAddDraft, RequestUpdateDraft, RequestGetDraft, RequestDeleteDraft } from '@/request/requestData';
import { getNowTime } from '@/utils/validate';
import { useUserStore } from '@/stores/user';
import { updateArticleAPI, getArticleThemeAPI, addArticleAPI, getArticleLabelsAPI, getArticleAPI, uploadImgAPI, addDraftAPI, updateDraftAPI, getDraftAPI, publishDraftAPI, getDraftThemeAPI, getDraftLabelsAPI, deleteDraftAPI } from '@/request/api';

let text = ref('');
const router = useRouter();
const NormalToolbar = MdEditor.NormalToolbar;
const message = useMessage();
const userState = useUserStore();
let article = ref(0); // 0 is new, 1 is draft, 2 is old article 
interface blogType {
  title: string,
  description: string,
  Group: number,
  tags: string[],
  draftID: number,
}
const blog = reactive<blogType>({
  title: '',
  description: '',
  Group: 1,
  tags: [],
  draftID: -1, // 如果说新建了草稿,则会通过后端获取其ID,否则默认为-1
});

const groupOptions = [
  {
    value: 1,
    label: '生活',
  },
  {
    value: 2,
    label: '技术',
  },
  {
    value: 3,
    label: '工作'
  },
  {
    value: 4,
    label: '理财',
  },
  {
    value: 5,
    label: '育儿'
  },
  {
    value: 6,
    label: '设计',
  },
  {
    value: 7,
    label: '产品'
  },
  {
    value: 8,
    label: '创业'
  },
  {
    value: 9,
    label: '读书'
  },
  {
    value: 10,
    label: '旅行'
  },
  {
    value: 11,
    label: '影视'
  },
  {
    value: 12,
    label: '音乐'
  }
]
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
  if (blog.title.length === 0 || blog.description.length === 0 || text.value.length === 0)
    return true;
  else
    return false;
}

async function save() {
  if (isNull()) {
    message.error('文章标题,简介或内容不能为空!', { duration: 1200 });
    return;
  }
  if (article.value === 0) {
    // it's a new article
    addDraft();
    article.value = 1;
  } else if (article.value === 1 || article.value === 3) {
    // it's a draft article
    updateDraft();
  } else if (article.value === 2) {
    // it's a old article
    // TODO: 
    addDraft();
    article.value = 3;
  }
};

const addArticle = async () => {
  const data: RequestAddArticle = {
    title: blog.title,
    content: text.value,
    updateTime: getNowTime(),
    description: blog.description,
    themeId: blog.Group,
    labelNames: blog.tags
  }
  const res = await addArticleAPI(data, userState);
  if (res.data.status === 0) {
    // router.replace({path: '/blog', query: {code: res.data.code}});
    console.log(res);
    router.replace({path: '/blog', query: {id: res.data.data}});
    message.success('发布成功!', { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

const publishDraft = async () => {
  addArticle();
  deleteDraft();
};

const deleteDraft = () => {
  const data: RequestDeleteDraft = {
    id: blog.draftID,
  }
  deleteDraftAPI(data, userState);
};

const updateArticle = async () => {
  const data: RequestUpdateArticle = {
    id: Number(router.currentRoute.value.query.id),
    title: blog.title,
    content: text.value,
    updateTime: getNowTime(),
    description: blog.description,
    themeId: blog.Group,
    labelNames: blog.tags
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
    themeId: blog.Group,
    labelNames: blog.tags
  };
  const res = await addDraftAPI(data, userState);
  if (res.data.status === 0) {
    // TODO: API test
    message.success('已保存到草稿箱!', { duration: 1200 });
    blog.draftID = res.data.data;
    // message.success(res.data.message);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

async function updateDraft() {
  const data: RequestUpdateDraft = {
    id: blog.draftID,
    title: blog.title,
    content: text.value,
    updateTime: getNowTime(),
    description: blog.description,
    themeId: blog.Group,
    labelNames: blog.tags
  };
  const res = await updateDraftAPI(data, userState);
  if (res.data.status === 0) {
    console.log(res);
    message.success('已保存到草稿箱!', { duration: 1200 });
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
};

const upload = () => {
  if (isNull()) {
    message.error('文章标题,简介或内容不能为空!', { duration: 1200 });
    return;
  }
  if (article.value === 0) {
    addArticle();
  } else if(article.value === 1){
    addArticle();
    deleteDraft();
  } else if (article.value === 2) {
    updateArticle();
  } else if (article.value === 3) {
    // TODO: 此时应该先更新文章,再删除对应的草稿
    updateArticle();
    deleteDraft();
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
    getGroupAndTags(Number(router.currentRoute.value.query.id), 2);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}
// id表示要查询的文章/草稿ID;type=1为草稿,type=2为文章
const getGroupAndTags = async (id: number, type: number) => {
  if (type === 1) {
    const data: RequestGetTheme = {
      id: id,
    }
    const res = await getDraftThemeAPI(data, userState);
    if (res.data.status === 0) {
      blog.Group = res.data.data.id;
    } else {
      message.error(res.data.message);
    }
    const data1: RequestGetLabels = {
      id: id
    };
    const res1 = await getDraftLabelsAPI(data1, userState);
    if (res1.data.status === 0) {
      const labels = res1.data.data;
      for (let i = 0; i < labels.length; i++) {
        blog.tags[i] = labels[i].name;
      }
    } else {
      message.error(res.data.message);
    }
  } else if (type === 2) {
    const data: RequestGetTheme = {
      id: id,
    }
    const res = await getArticleThemeAPI(data);
    if (res.data.status === 0) {
      blog.Group = res.data.data.id;
    } else {
      message.error(res.data.message);
    }
    const data1: RequestGetLabels = {
      id: id
    };
    const res1 = await getArticleLabelsAPI(data1);
    if (res1.data.status === 0) {
      const labels = res1.data.data;
      for (let i = 0; i < labels.length; i++) {
        blog.tags[i] = labels[i].name;
      }
    } else {
      message.error(res.data.message);
    }
  }
};

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
    getGroupAndTags(blog.draftID, 1);
  } else {
    message.error(res.data.message, { duration: 1200 });
  }
}

onMounted(() => {
  //  114514 is the new(0), 1919 is the draft(1), 810 is the old(2)
  if (router.currentRoute.value.query.type === '114514') {
    article.value = 0;
  } else if (router.currentRoute.value.query.type === '1919') {
    article.value = 1;
    blog.draftID = Number(router.currentRoute.value.query.id);
    getDraftInfo();
  } else if (router.currentRoute.value.query.type === '810') {
    article.value = 2;
    getArticleInfo();
  }
});

</script>

<template>
  <div class="editContainer">
    <div class="editTitle">
      <NForm :rules="ruleBlog">
        <NFormItemRow label="标题" path="title">
          <NInput maxlength="20" placeholder="请输入文章标题(限20字)" v-model:value="blog.title" />
        </NFormItemRow>
        <NFormItemRow label="简介" path="description">
          <NInput maxlength="50" placeholder="请输入简介(限50字)" v-model:value="blog.description" />
        </NFormItemRow>
      </NForm>
      <n-config-provider :theme="darkTheme">
        <div class="tagAndGroup">
          <div class="group">
            <div>博客分组<span style="color: #d03050;"> *</span></div>
            <n-select v-model:value="blog.Group" :options="groupOptions" />
          </div>
          <div class="tags">
            <div>文章标签</div>
            <n-dynamic-tags v-model:value="blog.tags" />
          </div>
        </div>

      </n-config-provider>
    </div>
    <div class="editContent">
      <MdEditor theme="dark" v-model="text" :toolbars="(toolbar as ToolbarNames[])" :show-code-row-number="true" @onUploadImg="onUploadImg">
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
