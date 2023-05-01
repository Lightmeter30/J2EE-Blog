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
  avatar: string;
  birthday: string;
  description: string;
  email: string;
  name: string;
  sex: boolean; // 0女 1男
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
  commentsNum: number;
  content: string;
  description: string;
  favoritesNum: number;
  id: number;
  title: string;
  updateTime: string;
  CommentOrderNum: number;
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