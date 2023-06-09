//一般情况下，接口类型会放到一个文件
// 下面两个TS接口，表示要传的参数


// /api/user/getVerifyCode
// 用于注册时发送邮箱验证码
// test ok
export interface RequestGetVerifyCode {
  email: string
}

// /api/user/register
// 用于用户注册
// test ok
export interface RequestRegister {
  name: string,
  password: string,
  email: string,
  verifyCode: string
}

// /api/user/login
// 用于用户登录
// test ok
export interface RequestLogin {
  email: string,
  password: string
}

// 以下请求均需要请求头
export interface RequestHeader {
  id: number,
  token: string
}

// /api/user/getInfo
// 用于获取用户信息
// 请求体中无参数

// /api/user/getOtherInfo
// 用于获取其他用户信息
export interface RequestGetOtherInfo {
  id: number
}

// /api/user/getOtherBriefInfos
// 用于获取用户id列表对应的用户名、头像
export interface RequestGetOtherBriefInfos {
  ids: number[]
}

// /api/user/getUserNames
// 用于获取id列表对应的用户名
export interface RequestGetUserNames {
  ids: number[]
}

// /api/user/updateInfo
// 用于更改用户信息
export interface RequestUpdateInfo{
  name: string,
  birthday: string,  // yyyy-MM-dd
  description: string,
  sex: number
}

// /api/user/updateAvatar
// 用于修改用户头像
export interface RequestUpdateAvatar{
  avatar: any //  file
}

// /api/user/updatePassword
// 用于修改用户密码
export interface RequestUpdatePassword{
  oldPassword: string,
  newPassword: string
}

// /api/article/add
// 用于添加文章
export interface RequestAddArticle{
  title: string,
  content: string,
  updateTime: string  // yyyy-MM-dd HH:mm:ss
  description?: string,
  themeId: number,
  labelNames: string[]
}

// /api/article/delete
// 用于删除文章
export interface RequestDeleteArticle {
  id: number
}

// /api/article/update
// 用于更新文章
export interface RequestUpdateArticle {
  id: number,
  title: string,
  content: string,
  updateTime: string  // yyyy-MM-dd HH:mm:ss
  description?: string,
  themeId: number,
  labelNames: string[]
}

// /api/article/get
// 用于查询某一文章
export interface RequestGetArticle {
  id: number
}

// /api/article/getPageNum
// 获取文章总页数

// /api/article/getPageArticles
// 获取某页的文章
export interface RequestGetPageArticles {
  currentPage: number
}

// /api/article/getUserPageNum
// 用于获取某用户文章的分页数量
export interface RequestGetUserPageNum {
  userId: number
}

// /api/article/getUserPage
// 用于获取某用户某页的文章
export interface RequestGetUserPage {
  userId: number,
  currentPage: number
}

// /api/article/pageFuzzySearch
// 用于模糊搜索
// 直接请求第一页，返回结果中有总页数
export interface RequestPageFuzzySearch {
  currentPage: number, // 用户第一次点击搜索，设置当前页为1即可
  search: string  // 搜索内容
}

// /api/article/uploadImg
// 用于上传文章图片
export interface RequestUploadImg {
  articleImg: any
}

// /api/article/getTheme
// 用于获取文章主题
export interface RequestGetTheme {
  id: number
}

// /api/article/getThemeByIds
// 用于获取文章id列表对应的主题列表
export interface RequestGetThemeByIds {
  ids: number[]
}

// /api/article/getLabels
// 用于获取文章标签
export interface RequestGetLabels {
  id: number
}

// /api/article/getLabelsByIds
// 用于获取文章id列表对应的标签列表
export interface RequestGetLabelsByIds {
  ids: number[]
}

// /api/label/getHotLabels
// 用于获取热门标签
// 请求体中无参数

// /api/article/getThemeArticlePageNum
// 用于获取某主题的文章的页数
export interface RequestGetThemeArticlePageNum {
  themeId: number
}

// /api/article/getPageThemeArticleIds
// 用于获取某主题某页的文章的id列表
export interface RequestGetPageThemeArticleIds {
  themeId: number,
  currentPage: number
}

// /api/article/getLabelArticlePageNum
// 用于获取某标签的文章的页数
export interface RequestGetLabelArticlePageNum {
  labelId: number
}

// /api/article/getPageLabelArticleIds
// 用于获取某标签某页的文章的id列表
export interface RequestGetLabelArticleIds{
  labelId: number,
  currentPage: number
}

// /api/article/getByIdList
// 用于获取文章id列表对应的文章信息
export interface RequestGetByIdList {
  ids: number[]
}

// /api/comment/getArticleComments
// 用于获取文章评论
export interface RequestGetArticleComments {
  articleId: number
}

// /api/comment/add
// 用于添加评论
export interface RequestAddComment {
  articleId: number;
  content: string;
  time: string; // yyyy-MM-dd HH:mm:ss
}

// /api/comment/delete
// 用于删除评论
export interface RequestDeleteComment {
  id: number
}

// /api/draft/add
// 用于添加草稿
export interface RequestAddDraft {
  title: string,
  description: string,
  content: string,
  updateTime: string  // yyyy-MM-dd HH:mm:ss
  themeId: number,
  labelNames: string[]
}

// /api/draft/delete
// 用于删除草稿
export interface RequestDeleteDraft {
  id: number
}

// /api/draft/update
// 用于更改草稿
export interface RequestUpdateDraft {
  id: number,
  title: string,
  description: string,
  content: string,
  updateTime: string  // yyyy-MM-dd HH:mm:ss
  themeId: number,
  labelNames: string[]
}

// /api/draft/get
// 用于获取某个草稿信息
export interface RequestGetDraft {
  id: number
}

// /api/draft/getUserPageNum
// 用于获取某用户文章页数
export interface RequestGetUserPageNum {
  userId: number
}

// /api/draft/getUserPage
// 用于获取用户某页文章
export interface RequestGetUserPage {
  currentPage: number
}

// /api/draft/publishDraft
// 用于将草稿发布为文章
export interface RequestPublishDraft {
  id: number,
  updateTime: string  // yyyy-MM-dd HH:mm:ss
}

// /api/draft/getTheme
// 用于获取某草稿的主题
export interface RequestGetTheme {
  id: number
}

// /api/draft/getThemeByIds
// 用于获取草稿id列表对应的主题列表
export interface RequestGetThemeByIds {
  ids: number[]
}

// /api/draft/getLabels
// 用于获取草稿id列表对应的标签列表
export interface RequestGetLabels {
  id: number
}

// /api/draft/getLabelsByIds
// 用于获取草稿id列表对应的标签列表
export interface RequestGetLabelsByIds {
  ids: number[]
}

// /api/favorite/add
// 用于添加一个收藏
export interface RequestAddFavorite {
  articleId: number,
  folderId: number
}

// /api/favorite/getFolderFavorites
// 用于获取某一收藏文件夹下的收藏
export interface RequestGetFolderFavorites {
  folderId: number
}

// /api/favorite/delete
// 用于删除一个收藏
export interface RequestDeleteFavorites {
  id: number
}

// /api/favorite/checkArticleInFolders
// 用于获取某文章是否在当前用户收藏夹中
export interface RequestCheckArticleInFolders {
  articleId: number
}

// /api/favorite/getFolderFavoritesPageNum
// 用于获取某收藏夹的分页数量
export interface RequestGetFolderFavoritesPageNum {
  folderId: number
}

// /api/favorite/getPageFolderFavorites
// 用于获取某收藏夹某页的收藏
export interface RequestGetPageFolderFavorites {
  folderId: number,
  currentPage: number
}

// /api/favoriteFolder/add
// 用于新建一个收藏文件夹
export interface RequestAddFavoriteFolder {
  name: string
}

// /api/favoriteFolder/getUserFolders
// 用于获取用户所有收藏文件夹
// 请求体中无参数

// /api/favoriteFolder/delete
// 用于删除一个收藏文件夹，一并删除其中的收藏
export interface RequestDeleteFavoriteFolder {
  id: number
}

// /api/follow/add
// 用于添加一个关注
export interface RequestAddFollow {
  followed: number  // 被关注者
}

// /api/follow/getUserFollowed
// 用于获取用户的关注列表
// 请求体中无参数

// /api/follow/getUserFollower
// 用于获取用户的粉丝列表
// 请求体中无参数

// /api/follow/delete
// 用于取消关注
export interface RequestDeleteFollow {
  id: number  // 被关注者的id
}