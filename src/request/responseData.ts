// 返回数据中data的格式

// /api/user/getVerifyCode
// 用于注册时发送邮箱验证码
// {
//    "status":0,
//    "code":20000,
//    "message":"send email verify code success..."
//  }
export interface ResponseGetVerifyCode {
  code: number;
  message: string;
  status: number;
}


// /api/user/register
// 用于用户注册
export interface ResponseRegister {
  code: number;
  message: string;
  status: number;
}

// /api/user/login
// 用于用户登录
// {
//   "status": 0,
//   "code": 40010,
//   "message": "user login success...",
//   "data": {
//     "userId": 1,
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjgxOTAzOTI2fQ.CEm5EwboITe8i8eoRk1QbBMwckdUses0isxgEffTTgc"
//   }
// }
export interface ResponseLogin {
  code: number;
  data: DataLogin;
  message: string;
  status: number;
}
export interface DataLogin {
  token: string;
  userId: number;
}

// /api/user/getInfo
// 用于获取用户信息
// {
//   "status": 0,
//   "code": 40050,
//   "message": "user get info success...",
//   "data": {
//    "name": "lerjiu",
//    "email": "20373822@buaa.edu.cn",
//    "birthday": "2002-11-30",
//    "description": "this my blog",
//    "sex": true,
//    "avatar": "1681907371442_avatar.jpg"
//   }
// }
export interface ResponseGetInfo {
  code: number;
  data: DataGetInfo;
  message: string;
  status: number;
}

export interface DataGetInfo {
  articleNum: number;
  avatar: string;
  birthday: string;
  defaultFavoriteFolder: number;
  description: string;
  email: string;
  followedNum: number;
  followerNum: number;
  name: string;
  sex: boolean; // 0女 1男
  followed?: boolean
}

// /api/user/getOtherInfo
// 用于获取其他用户信息
export interface ResponseGetOtherInfo {
  code: number;
  data: DataGetInfo;
  message: string;
  status: number;
}

// /api/user/getOtherBriefInfos
// 用于获取用户id列表对应的用户名、头像
export interface ResponseGetOtherBriefInfos {
  code: number;
  data: BriefInfo[];
  message: string;
  status: number;
}

export interface BriefInfo {
  avatar: string;
  name: string;
  description: string;
  followed: boolean;
}

// /api/user/getUserNames
// 用于获取id列表对应的用户名
export interface ResponseGetUserNames {
  code: number;
  data: string[];
  message: string;
  status: number;
}


// /api/user/updateInfo
// 用于更改用户信息
export interface ResponseUpdateInfo {
  code: number;
  message: string;
  status: number;
}

// /api/user/updateAvatar
// 用于修改用户头像
export interface ResponseUpdateAvatar {
  code: number;
  message: string;
  status: number;
  data: string;
}

// /api/user/updatePassword
// 用于修改用户密码
export interface ResponseUpdatePassword {
  code: number;
  message: string;
  status: number;
}

// /api/article/add
// 用于添加文章
export interface ResponseAddArticle {
  code: number;
  message: string;
  status: number;
  data: number,
}

// /api/article/delete
// 用于删除文章
export interface ResponseDeleteArticle {
  code: number;
  message: string;
  status: number;
}

// /api/article/update
// 用于更新文章
export interface ResponseUpdateArticle {
  code: number;
  message: string;
  status: number;
}

// /api/article/get
// 用于查询某一文章
export interface ResponseGetArticle {
  code: number;
  data: Article;
  message: string;
  status: number;
}
export interface Article {
  author: number;
  authorName?: string;
  commentsNum: number;
  content?: string;     // 只在某一个博客的内容界面需要
  description?: string; // 只在卡片展示需要
  favoritesNum: number; 
  id: number;
  title: string;
  updateTime: string;
  CommentOrderNum?: number; // 只在某一个博客的内容界面需要
}

// /api/article/getPageNum
// 获取文章总页数
export interface ResponseGetPageNum {
  code: number;
  data: number; // 页数
  message: string;
  status: number;
}

// /api/article/getPageArticles
// 获取某页的文章
export interface ResponseGetPageArticles {
  code: number;
  data: Article[];
  message: string;
  status: number;
}

// /api/article/getUserPageNum
// 用于获取某用户文章的分页数量
export interface ResponseGetUserPageNum {
  code: number;
  data: number; // 分页数量
  message: string;
  status: number;
}

// /api/article/getUserPage
// 用于获取某用户某页的文章
export interface ResponseGetUserPage {
  code: number;
  data: Article[];
  message: string;
  status: number;
}

// /api/article/pageFuzzySearch
// 用于模糊搜索
export interface ResponsePageFuzzySearch {
  code: number;
  data: DataPageFuzzySearch;
  message: string;
  status: number;
}

export interface DataPageFuzzySearch {
  pageArticles: Article[];
  pageNum: number;  //分页数量，最大50
}

// /api/article/uploadImg
// 用于上传文章图片
export interface ResponseUploadImg {
  code: number;
  data: string;   // 图片相对路径 /static/ + data
  message: string;
  status: number;
}

// /api/article/getTheme
// 用于获取文章主题
export interface ResponseGetTheme {
  code: number;
  data: Theme;
  message: string;
  status: number;
}

export interface Theme {
  id: number;
  name: string;
}

// /api/article/getThemeByIds
// 用于获取文章id列表对应的主题列表
export interface ResponseGetThemeByIds {
  code: number;
  data: Theme[];
  message: string;
  status: number;
}

// /api/article/getLabels
// 用于获取文章标签
export interface ResponseGetLabels {
  code: number;
  data: Label[];
  message: string;
  status: number;
}

export interface Label {
  value: number;
  id: number;
  name: string;
}

// /api/article/getLabelsByIds
// 用于获取文章id列表对应的标签列表
export interface ResponseGetLabelsByIds {
  code: number;
  data: Array<Label[]>;
  message: string;
  status: number;
}

// /api/label/getHotLabels
// 用于获取热门标签
export interface ResponseGetHotLabels {
  code: number;
  data: Label[];
  message: string;
  status: number;
}

// /api/article/getThemeArticlePageNum
// 用于获取某主题的文章的页数
export interface ResponseGetThemeArticlePageNum {
  code: number;
  data: number; // 页数
  message: string;
  status: number;
}

// /api/article/getPageThemeArticleIds
// 用于获取某主题某页的文章的id列表
export interface ResponseGetPageThemeArticleIds {
  code: number;
  data: number[]; // id列表
  message: string;
  status: number;
}

// /api/article/getLabelArticlePageNum
// 用于获取某标签的文章的页数
export interface ResponseGetLabelArticlePageNum {
  code: number;
  data: number; // 页数
  message: string;
  status: number;
}

// /api/article/getPageLabelArticleIds
// 用于获取某标签某页的文章的id列表
export interface ResponseGetPageLabelArticleIds {
  code: number;
  data: number[]; // id列表
  message: string;
  status: number;
}

// /api/article/getByIdList
// 用于获取文章id列表对应的文章信息
export interface ResponseGetByIdList {
  code: number;
  data: Article[];
  message: string;
  status: number;
}

// /api/comment/getArticleComments
// 用于获取文章评论
export interface ResponseGetArticleComments {
  code: number;
  data: Comment[];
  message: string;
  status: number;
}
export interface Comment {
  articleId: number;
  content: string;
  id: number;
  orderNum: number;
  time: string;
  userId: number;
  avatar: string;
  userName: string;
}

// /api/comment/add
// 用于添加评论
export interface ResponseAddComment {
  code: number;
  data: Comment;
  message: string;
  status: number;
}

// /api/comment/delete
// 用于删除评论
export interface ResponseDeleteComment {
  code: number;
  message: string;
  status: number;
}

// /api/draft/add
// 用于添加草稿
export interface ResponseAddDraft {
  code: number;
  message: string;
  status: number;
  data: number;
}

// /api/draft/delete
// 用于删除草稿
export interface ResponseDeleteDraft {
  code: number;
  message: string;
  status: number;
}

// /api/draft/update
// 用于更改草稿
export interface ResponseUpdateDraft {
  code: number;
  message: string;
  status: number;
}

// /api/draft/get
// 用于获取某个草稿信息
export interface ResponseGetDraft {
  code: number;
  data: Draft;
  message: string;
  status: number;
}
export interface Draft {
  author: number;
  content?: string;
  description: string;
  id: number;
  title: string;
  updateTime: string;
}

// /api/draft/getUserPageNum
// 用于获取某用户文章页数
export interface ResponseGetUserDraftPageNum {
  code: number;
  data: number;   // 页数
  message: string;
  status: number;
}

// /api/draft/getUserPage
// 用于获取用户某页文章
export interface ResponseGetUserDraftPage {
  code: number;
  data: Draft[];
  message: string;
  status: number;
}

// /api/draft/publishDraft
// 用于将草稿发布为文章
export interface ResponsePublishDraft {
  code: number;
  data: number;   // 文章id
  message: string;
  status: number;
}

// /api/draft/getTheme
// 用于获取某草稿的主题
export interface ResponseGetTheme {
  code: number;
  data: Theme;
  message: string;
  status: number;
}

// /api/draft/getThemeByIds
// 用于获取草稿id列表对应的主题列表
export interface ResponseGetThemeByIds {
  code: number;
  data: Theme[];
  message: string;
  status: number;
}

// /api/draft/getLabels
// 用于获取草稿id列表对应的标签列表
export interface ResponseGetLabels {
  code: number;
  data: Label[];
  message: string;
  status: number;
}

// /api/draft/getLabelsByIds
// 用于获取草稿id列表对应的标签列表
export interface ResponseGetLabelsByIds {
  code: number;
  data: Array<Label[]>;
  message: string;
  status: number;
}

// /api/favorite/add
// 用于添加一个收藏
export interface ResponseAddFavorite {
  code: number;
  data: number; // 收藏id
  message: string;
  status: number;
}

// /api/favorite/getFolderFavorites
// 用于获取某一收藏文件夹下的收藏
export interface ResponseGetFolderFavorites {
  code: number;
  data: Favorite[];
  message: string;
  status: number;
}
export interface Favorite {
  articleId: number;
  folderId: number;
  id: number;
  userId: number;
}

// /api/favorite/delete
// 用于删除一个收藏
export interface ResponseDeleteFavorite {
  code: number;
  message: string;
  status: number;
}

// /api/favorite/checkArticleInFolders
// 用于获取某文章是否在当前用户收藏夹中
export interface ResponseCheckArticleInFolders {
  code: number;
  data: number[];
  message: string;
  status: number;
}

// /api/favorite/getFolderFavoritesPageNum
// 用于获取某收藏夹的分页数量
export interface ResponseGetFolderFavoritesPageNum {
  code: number;
  data: number; // 分页数
  message: string;
  status: number;
}

// /api/favorite/getPageFolderFavorites
// 用于获取某收藏夹某页的收藏
export interface ResponseGetPageFolderFavorites {
  code: number;
  data: FavoriteArticle[];
  message: string;
  status: number;
}

export interface FavoriteArticle {
  article: Article;
  favorite: Favorite;
}

// /api/favoriteFolder/add
// 用于新建一个收藏文件夹
export interface ResponseAddFavoriteFolder {
  code: number;
  message: string;
  status: number;
  data: number;
}

// /api/favoriteFolder/getUserFolders
// 用于获取用户所有收藏文件夹
export interface ResponseGetUserFolders {
  code: number;
  data: FavoriteFolder[];
  message: string;
  status: number;
}
export interface FavoriteFolder {
  id: number;
  name: string;
  userId: number;
  favoritesNum: number;
}

// /api/favoriteFolder/delete
// 用于删除一个收藏文件夹，一并删除其中的收藏
export interface ResponseDeleteFavoriteFolder {
  code: number;
  status: number;
  message: string;
}

// /api/follow/add
// 用于添加一个关注
export interface ResponseAddFollow {
  code: number;
  status: number;
  message: string;
}

// /api/follow/getUserFollowed
// 用于获取用户的关注列表
export interface ResponseGetUserFollowed {
  code: number;
  data: number[];   // 关注用户的id列表
  message: string;
  status: number;
}

// /api/follow/getUserFollower
// 用于获取用户的粉丝列表
export interface ResponseGetUserFollower {
  code: number;
  data: number[];   // 粉丝用户的id列表
  message: string;
  status: number;
}

// /api/follow/delete
// 用于取消关注
export interface ResponseDeleteFollow {
  code: number;
  status: number;
  message: string;
}