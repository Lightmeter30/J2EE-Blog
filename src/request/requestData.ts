//一般情况下，接口类型会放到一个文件
// 下面两个TS接口，表示要传的参数

// 8080端口

// /api/user/getVerifyCode
// 用于注册时发送邮箱验证码
export interface RequestGetVerifyCode {
  email: string
}

// /api/user/register
// 用于用户注册
export interface RequestRegister {
  name: string,
  password: string,
  email: string,
  verifyCode: string
}

// /api/user/login
// 用于用户登录
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