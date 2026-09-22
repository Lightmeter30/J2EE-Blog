# J2EE-Blog

基于 Vue 3 + TypeScript + Vite 构建的博客平台前端，提供文章浏览、Markdown 写作、草稿箱、收藏夹、评论与用户关注等完整社交化博客能力。

## 项目背景

本仓库是一个前后端分离的博客系统前端工程，作为 J2EE 课程实践项目的组成部分，用于验证前端工程化能力与后端 REST 接口的对接流程。

项目采用独立的前端与后端仓库拆分方式：本仓库仅包含浏览器端应用，全部业务数据通过 HTTP 接口向后端服务请求获取。后端服务以统一前缀暴露接口，前端通过 `axios` 实例集中管理请求地址与超时策略，请求体与响应体的数据结构在 TypeScript 类型文件中统一定义，以保证接口契约可读、可校验。

当前仓库未包含后端服务实现。

## 功能特性

### 用户与鉴权

- 邮箱注册：支持向邮箱发送验证码后完成注册，注册成功后自动登录
- 邮箱登录：使用邮箱与密码登录
- 登录状态持久化：用户 ID、Token、昵称、头像等状态通过 Pinia 持久化存储
- 退出登录：带二次确认弹窗
- 个人信息管理：修改昵称、性别、生日、个人简介
- 头像上传：支持 `png` / `jpeg` / `jpg` 格式
- 修改密码：校验旧密码后更新

### 文章

- 首页文章流：分页展示全部文章，展示标题、简介、作者、更新时间、收藏数、评论数、所属主题与标签
- 文章详情：Markdown 渲染展示正文，展示作者信息卡片与博客简介
- 文章编辑：基于 `md-editor-v3` 的 Markdown 编辑器，工具栏涵盖标题、加粗、斜体、下划线、删除线、上下标、引用、有序/无序列表、任务列表、行内代码、代码块、链接、图片、表格、KaTeX 公式、撤销重做、全屏与目录
- 文章配图上传：编辑器内上传图片，返回相对路径后拼接静态资源域名展示
- 文章删除：带二次确认弹窗
- 博客分组：内置 12 个分组（生活、技术、工作、理财、育儿、设计、产品、创业、读书、旅行、影视、音乐）
- 文章标签：支持动态增删标签
- 主题 / 标签聚合页：按主题或标签分页浏览文章
- 关键词模糊搜索：支持跨页检索与空结果占位提示

### 草稿箱

- 编辑器内一键保存到草稿箱，支持草稿内容更新
- 草稿分页列表，可直接进入编辑或删除
- 草稿发布为文章：发布成功后自动清理对应草稿
- 从既有文章编辑时保存草稿的流转支持

### 收藏夹

- 新建收藏夹、删除收藏夹（删除时一并清除其中的收藏）
- 文章详情页弹窗中可查看当前用户全部收藏夹，并逐个执行收藏 / 移除收藏
- 收藏夹内文章分页浏览，支持单条移除收藏

### 互动

- 文章评论：发表留言（限 100 字）与评论列表展示
- 用户关注 / 取消关注：在文章详情页作者卡片、个人主页与用户列表中均可操作
- 关注列表与粉丝列表浏览

### 个人主页

- 个人主页统一路由 `/space`，包含博客、草稿箱、收藏夹、个人信息四个自有板块，以及关注、粉丝两个数据入口
- 他人主页可查看其公开的博客列表与基本信息
- 侧边栏组件复用：站内简介、博客分组导航、热门标签词云（基于 ECharts 与 `echarts-wordcloud`，点击标签跳转标签页）、登录用户信息卡片

### 界面

- 基于 Naive UI 的深色主题，通过 `GlobalThemeOverrides` 统一覆写组件样式
- 顶部固定导航栏：博客主页、博客分组下拉、个人主页、写博客、搜索框、用户头像下拉
- 阅读进度返回顶部按钮、分页跳转、加载态与空状态占位

## 技术栈

### 运行时依赖

| 依赖 | 版本 | 用途 |
| --- | --- | --- |
| `vue` | ^3.2.47 | 核心框架，使用 `<script setup>` 单文件组件 |
| `vue-router` | ^4.1.6 | 路由，History 模式 |
| `pinia` | ^2.0.34 | 状态管理 |
| `pinia-plugin-persistedstate` | ^3.1.0 | 状态持久化 |
| `naive-ui` | ^2.34.3 | UI 组件库 |
| `axios` | ^1.3.5 | HTTP 请求 |
| `md-editor-v3` | ^2.11.2 | Markdown 编辑器与预览渲染 |
| `echarts` | ^5.4.2 | 图表底层库 |
| `echarts-wordcloud` | ^2.1.0 | 热门标签词云 |
| `hover.css` | ^2.3.2 | 悬停动画样式 |
| `@faker-js/faker` | ^7.6.0 | 开发期模拟数据 |

### 开发依赖

| 依赖 | 版本 | 用途 |
| --- | --- | --- |
| `vite` | ^4.2.0 | 构建与开发服务器 |
| `@vitejs/plugin-vue` | ^4.1.0 | Vue 单文件组件支持 |
| `typescript` | ^4.9.3 | 类型系统 |
| `vue-tsc` | ^1.2.0 | 构建前类型检查 |
| `sass` | ^1.62.0 | SCSS 预处理 |
| `sass-loader` | ^13.2.2 | SCSS 加载 |
| `less` | ^4.1.3 | Less 预处理 |
| `unplugin-auto-import` | ^0.15.3 | 自动导入 Vue / Vue Router / Naive UI API |
| `unplugin-vue-components` | ^0.24.1 | 组件自动注册，配合 `NaiveUiResolver` |
| `@vicons/ionicons5` | ^0.12.0 | 图标库 |

### 工程约定

- 路径别名 `@` 指向 `src`
- 全局注入 `src/styles/_variables.scss` 与 `src/styles/_mixins.scss`，各组件样式可直接使用其中的颜色变量与混入
- 自动生成的类型声明文件为 `src/auto-import.d.ts` 与 `src/components.d.ts`

## 项目结构

```text
J2EE-Blog/
├── index.html                  # 应用入口 HTML
├── package.json                # 依赖与脚本定义
├── tsconfig.json               # TypeScript 编译配置
├── tsconfig.node.json          # 构建工具侧 TS 配置
├── vite.config.ts              # Vite 配置：插件、别名、SCSS 全局注入
├── public/
│   └── vite.svg
└── src/
    ├── main.ts                 # 应用启动：注册路由与 Pinia
    ├── App.vue                 # 根组件：全局主题覆写与布局容器
    ├── vite-env.d.ts
    ├── auto-import.d.ts        # 自动导入类型声明（生成）
    ├── components.d.ts         # 组件自动注册类型声明（生成）
    ├── 后端看.txt               # 与后端协作的接口约定说明
    ├── assets/img/             # 背景图、卡片底图、占位图、站点图标
    ├── components/
    │   ├── TopIndex.vue        # 顶部导航栏
    │   ├── SideContent.vue     # 通用侧边栏容器
    │   ├── BlogCard.vue        # 文章卡片（普通/可编辑/收藏夹三种形态）
    │   ├── DraftCard.vue       # 草稿卡片
    │   ├── UserCard.vue        # 用户信息卡片
    │   ├── CollectList.vue     # 收藏夹列表项
    │   ├── CommentList.vue     # 评论列表项
    │   ├── TagsCloud.vue       # 热门标签词云
    │   ├── userList.vue        # 用户列表项
    │   └── svg/                # 登录页装饰性 SVG 组件
    ├── request/
    │   ├── setAxios.ts         # axios 实例：baseURL 与超时配置
    │   ├── api.ts              # 接口封装函数集合
    │   ├── requestData.ts      # 请求体类型定义
    │   └── responseData.ts     # 响应体类型定义
    ├── router/
    │   └── index.ts            # 路由表
    ├── stores/
    │   ├── user.ts             # 用户状态（含持久化）
    │   └── search.ts           # 搜索关键词状态
    ├── styles/
    │   ├── _variables.scss     # 颜色变量
    │   └── _mixins.scss        # 常用混入
    ├── utils/
    │   └── validate.ts         # 表单校验正则与时间格式化
    └── view/
        ├── HomeView.vue        # 首页
        ├── LoginView.vue       # 登录 / 注册
        ├── EditView.vue        # 文章编辑器
        ├── BlogView.vue        # 文章详情
        ├── GroupView.vue       # 主题聚合
        ├── TagsView.vue        # 标签聚合
        ├── SearchView.vue      # 搜索结果
        ├── PersonalView.vue    # 个人主页外壳
        └── space/
            ├── SpaceHome.vue        # 用户的博客列表
            ├── SpaceDraft.vue       # 草稿箱
            ├── SpaceCollect.vue     # 收藏夹
            ├── SpaceChangeInfo.vue  # 个人信息与密码
            ├── SpaceFollowed.vue    # 关注列表
            └── SpaceFans.vue        # 粉丝列表
```

## 本地开发与构建

### 环境要求

- Node.js（建议 16 及以上）
- 仓库同时提交了 `package-lock.json` 与 `yarn.lock`，可任选 npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产产物

```bash
npm run build
```

该命令先执行 `vue-tsc` 进行类型检查，再执行 `vite build` 输出静态产物。

### 本地预览构建结果

```bash
npm run preview
```

## 页面与路由说明

路由使用 `createWebHistory` 模式。

| 路径 | 路由名 | 页面 | 说明 |
| --- | --- | --- | --- |
| `/` | `home` | `HomeView` | 首页全站文章流，分页浏览 |
| `/login` | `login` | `LoginView` | 登录与注册（同一页面内 Tab 切换） |
| `/edit` | `edit` | `EditView` | 文章 / 草稿编辑器 |
| `/search` | `search` | `SearchView` | 关键词搜索结果 |
| `/group` | `group` | `GroupView` | 按主题聚合的文章列表 |
| `/tags` | `tags` | `TagsView` | 按标签聚合的文章列表 |
| `/blog` | `blog` | `BlogView` | 文章详情、评论、收藏 |
| `/space` | `space` | `PersonalView` | 个人主页外壳，以下为其子路由 |
| `/space/home` | `spaceHome` | `SpaceHome` | 用户的博客列表 |
| `/space/attention` | `spaceAttention` | `SpaceFollowed` | 当前用户的关注列表 |
| `/space/fans` | `spaceFans` | `SpaceFans` | 当前用户的粉丝列表 |
| `/space/info` | `spaceInfo` | `SpaceChangeInfo` | 个人信息、头像与密码修改 |
| `/space/collect` | `spaceCollect` | `SpaceCollect` | 收藏夹管理 |
| `/space/draft` | `spaceDraft` | `SpaceDraft` | 草稿箱 |

### 页面间的参数约定

页面之间通过查询参数传递上下文，主要约定如下：

| 页面 | 参数 | 含义 |
| --- | --- | --- |
| `/blog` | `id` | 文章 ID |
| `/space/*` | `id` | 目标用户 ID |
| `/group` | `id` | 主题（分组）ID |
| `/tags` | `id` | 标签 ID |
| `/edit` | `id` | 待编辑的文章或草稿 ID |
| `/edit` | `type` | 编辑模式：`114514` 新建文章、`1919` 编辑草稿、`810` 编辑已发布文章 |

`PersonalView` 会依据当前用户 ID 与查询参数中的用户 ID 是否一致，决定是否展示草稿箱、收藏夹与个人信息入口，他人主页仅展示博客列表。

### 页面访问控制

路由表本身未配置全局导航守卫（`router.beforeEach` 为空实现）。需要登录的前端交互采用组件内校验方式，未登录用户点击文章卡片或作者卡片时会收到提示，无法跳转至 `/blog` 与 `/space/home`。

## 与后端接口约定

### 请求配置

前端通过 `src/request/setAxios.ts` 创建统一的 `axios` 实例：

- `baseURL` 配置为后端 API 的地址前缀（形如 `http(s)://<后端地址>/api/`），代码中为硬编码常量，实际部署时需按环境替换
- 请求超时时间为 `80000` 毫秒
- 默认携带 Cookie 与请求 / 响应拦截器当前均被注释，未启用

接口请求与响应拦截器、Token 自动注入均未启用，鉴权信息由各接口函数显式传入请求头。

### 鉴权方式

需要登录的接口以下述形式在请求头中携带身份信息，而非标准的 `Authorization` 头：

| 请求头 | 说明 |
| --- | --- |
| `id` | 当前用户 ID（取自 Pinia 用户状态） |
| `token` | 登录接口返回的 Token |

### 请求与响应格式

- 除少数无参接口外，请求体采用 `FormData` 提交。`api.ts` 中的 `setData` 辅助函数将对象逐字段 `append` 到 `FormData` 中，数组类型字段以原值追加，由后端负责解析
- 图片上传同样以 `FormData` 提交，字段名分别为 `articleImg`（文章配图）与 `avatar`（用户头像）
- 响应体统一为 `{ data: ... }` 结构，其中 `data.status === 0` 表示业务成功，非 0 时通过 `data.message` 展示错误信息

### 接口清单

接口按模块分组，路径均相对于 `baseURL`，方法均为 `POST`。标注为「需鉴权」的接口会携带上述 `id` 与 `token` 请求头。

#### 用户 `user/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `user/getVerifyCode` | 获取邮箱注册验证码 | 否 |
| `user/register` | 用户注册 | 否 |
| `user/login` | 用户登录，返回用户 ID 与 Token | 否 |
| `user/getInfo` | 获取当前用户信息 | 是 |
| `user/getOtherInfo` | 获取指定用户信息 | 是 |
| `user/getOtherBriefInfos` | 按 ID 列表获取用户名与头像等简要信息 | 是 |
| `user/getUserNames` | 按 ID 列表获取用户名 | 否 |
| `user/updateInfo` | 修改用户资料 | 是 |
| `user/updateAvatar` | 修改用户头像 | 是 |
| `user/updatePassword` | 修改用户密码 | 是 |

#### 文章 `article/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `article/add` | 新增文章 | 是 |
| `article/delete` | 删除文章 | 是 |
| `article/update` | 更新文章 | 是 |
| `article/get` | 获取单篇文章 | 是 |
| `article/getPageNum` | 获取首页文章总页数 | 否 |
| `article/getPageArticles` | 获取指定页的文章 | 否 |
| `article/getUserPageNum` | 获取某用户的文章页数 | 是 |
| `article/getUserPage` | 获取某用户指定页的文章 | 是 |
| `article/pageFuzzySearch` | 关键词模糊搜索，返回当前页文章与总页数 | 是 |
| `article/uploadImg` | 上传文章配图 | 是 |
| `article/getTheme` | 获取文章所属主题 | 否 |
| `article/getThemeByIds` | 按文章 ID 列表获取主题列表 | 否 |
| `article/getLabels` | 获取文章标签 | 否 |
| `article/getLabelsByIds` | 按文章 ID 列表获取标签列表 | 否 |
| `article/getThemeArticlePageNum` | 获取某主题下的文章页数 | 否 |
| `article/getPageThemeArticleIds` | 获取某主题指定页的文章 ID 列表 | 否 |
| `article/getLabelArticlePageNum` | 获取某标签下的文章页数 | 否 |
| `article/getPageLabelArticleIds` | 获取某标签指定页的文章 ID 列表 | 否 |
| `article/getByIdList` | 按文章 ID 列表获取文章详情 | 否 |

#### 标签 `label/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `label/getHotLabels` | 获取热门标签，用于词云展示 | 否 |

#### 评论 `comment/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `comment/getArticleComments` | 获取文章评论列表 | 是 |
| `comment/add` | 新增评论 | 是 |
| `comment/delete` | 删除评论 | 是 |

#### 草稿 `draft/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `draft/add` | 新增草稿，返回草稿 ID | 是 |
| `draft/delete` | 删除草稿 | 是 |
| `draft/update` | 更新草稿 | 是 |
| `draft/get` | 获取草稿详情 | 是 |
| `draft/getUserPageNum` | 获取草稿总页数 | 是 |
| `draft/getUserPage` | 获取指定页的草稿 | 是 |
| `draft/publishDraft` | 将草稿发布为文章 | 是 |
| `draft/getTheme` | 获取草稿所属主题 | 是 |
| `draft/getThemeByIds` | 按草稿 ID 列表获取主题列表 | 是 |
| `draft/getLabels` | 获取草稿标签 | 是 |
| `draft/getLabelsByIds` | 按草稿 ID 列表获取标签列表 | 是 |

#### 收藏 `favorite/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `favorite/add` | 将文章加入收藏夹 | 是 |
| `favorite/getFolderFavorites` | 获取收藏夹下的收藏 | 是 |
| `favorite/delete` | 删除单条收藏 | 是 |
| `favorite/checkArticleInFolders` | 查询文章是否已在当前用户各收藏夹中 | 是 |
| `favorite/getFolderFavoritesPageNum` | 获取收藏夹的分页数 | 是 |
| `favorite/getPageFolderFavorites` | 获取收藏夹指定页的收藏 | 是 |

#### 收藏夹 `favoriteFolder/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `favoriteFolder/add` | 新建收藏夹 | 是 |
| `favoriteFolder/getUserFolders` | 获取当前用户全部收藏夹 | 是 |
| `favoriteFolder/delete` | 删除收藏夹及其中的收藏 | 是 |

#### 关注 `follow/`

| 接口 | 说明 | 鉴权 |
| --- | --- | --- |
| `follow/add` | 关注用户 | 是 |
| `follow/getUserFollowed` | 获取当前用户的关注列表 | 是 |
| `follow/getUserFollower` | 获取当前用户的粉丝列表 | 是 |
| `follow/delete` | 取消关注 | 是 |

### 数据模型要点

- 用户信息包含昵称、头像、个人简介、性别、生日、文章数、关注数、粉丝数、默认收藏夹 ID 以及当前登录用户是否已关注该用户
- 文章包含作者 ID、标题、简介、正文、更新时间、收藏数与评论数
- 收藏记录由收藏关系 ID 与嵌套的文章信息组成，便于在收藏夹中直接渲染文章卡片
- 用户头像与文章配图返回相对路径，展示时需拼接静态资源域名（用户状态中已配置该域名前缀）

### 协作说明

仓库内的 `src/后端看.txt` 记录了前后端分工约定：接口的数据结构定义统一收敛在 `src/request` 目录，`requestData.ts` 定义请求体格式，`responseData.ts` 定义响应体中 `data` 字段的格式，接口变更需同步更新对应的类型定义文件。

## 说明

- 本项目为课程实践项目，代码中保留了若干开发期注释与 `TODO` 标记，部分接口的联调状态以 `api.ts` 中的注释为准
- 需要登录才能使用的功能依赖后端服务的可用性，本地独立运行前端无法完成完整的接口验证
- 部分交互依赖直接操作 DOM 类名实现高亮态切换，列表为空或数据未返回时可能存在空值访问的边界情况
- 仓库未声明许可证
