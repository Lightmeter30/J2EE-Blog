import axios from "./setAxios";
import * as requestTypes from "./requestData";
import * as responseTypes from "./responseData";

// Res是返回的参数，T是泛型，需要自己定义，返回对数统一管理***
type Res<T> = Promise<ItypeAPI<T>>;
// 一般情况下响应数据返回的这三个参数，
// 但不排除后端返回其它的可能性，
interface ItypeAPI<T> {
  data: T,//请求的数据，用泛型
}

// 数据封装函数
function setData<T extends object>(data: T):FormData {
  const Data = new FormData();
  for(const [key, value] of Object.entries(data)) {
    Data.append(key, value as any);
  }
  return Data;
}

/**
 * 用于注册时发送邮箱验证码
 * 
 * url: user/getVerifyCode
 * 
 * test ok
 */
export const getVerifyCodeAPI = (data: requestTypes.RequestGetVerifyCode): Res<responseTypes.ResponseGetVerifyCode> => {
  const Data = setData(data);
  return axios.post("user/getVerifyCode", Data);
}

/**
 * 用于用户注册
 * 
 * url: user/register
 * 
 * test ok
 */

export const registerAPI = (data: requestTypes.RequestRegister): Res<responseTypes.ResponseRegister> => {
  const Data = setData(data);
  return axios.post("user/register", Data);
}

/**
 * 用于用户登录
 * 
 * url: user/login
 * 
 * test ok
 */

export const loginAPI = (data: requestTypes.RequestLogin): Res<responseTypes.ResponseLogin> => {
  const Data = setData(data);
  return axios.post("user/login", Data);
}

/**
 * 用于获取用户信息
 * 
 * url: user/getInfo
 * 
 * test ok
 */

export const getUserInfoAPI = (userState: any): Res<responseTypes.ResponseGetInfo> => {
  return axios.post("user/getInfo", undefined, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}


/**
 * 用于更改用户信息
 * 
 * url: user/updateInfo
 * 
 * test ok
 */

export const updateUserInfoAPI = (data: requestTypes.RequestUpdateInfo, userState: any): Res<responseTypes.ResponseUpdateInfo> => {
  const Data = setData(data);
  return axios.post("user/updateInfo", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于更改用户头像
 * 
 * url: user/updateAvatar
 * 
 * test ok
 */

export const updateUserAvatarAPI = (data: requestTypes.RequestUpdateAvatar, userState: any): Res<responseTypes.ResponseUpdateAvatar> => {
  const Data = setData(data);
  return axios.post("user/updateAvatar", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于更改用户密码
 * 
 * url: user/updatePassword
 * 
 * test ok
 */

export const updateUserPasswordAPI = (data: requestTypes.RequestUpdatePassword, userState: any): Res<responseTypes.ResponseUpdatePassword> => {
  const Data = setData(data);
  return axios.post("user/updatePassword", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于添加文章
 * 
 * url: article/add
 * 
 * test ok
 */

export const addArticleAPI = (data: requestTypes.RequestAddArticle, userState: any): Res<responseTypes.ResponseAddArticle> => {
  const Data = setData(data);
  return axios.post("article/add", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于删除文章
 * 
 * url: article/delete
 * 
 * test
 */

export const deleteArticleAPI = (data: requestTypes.RequestDeleteArticle, userState: any): Res<responseTypes.ResponseDeleteArticle> => {
  const Data = setData(data);
  return axios.post("article/delete", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于更新文章
 * 
 * url: article/update
 * 
 * test
 */

export const updateArticleAPI = (data: requestTypes.RequestUpdateArticle, userState: any): Res<responseTypes.ResponseUpdateArticle> => {
  const Data = setData(data);
  return axios.post("article/update", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于获取某一篇文章信息
 * 
 * url: article/get
 * 
 * test ok
 */

export const getArticleAPI = (data: requestTypes.RequestGetArticle, userState: any): Res<responseTypes.ResponseGetArticle> => {
  const Data = setData(data);
  return axios.post("article/get", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于获取文章总页数
 * 
 * url: article/getPageNum
 * 
 * test
 */


/**
 * 用于获取某一页的所有文章
 * 
 * url: article/getPageArticles
 * 
 * test
 */

export const getPageArticlesAPI = (data: requestTypes.RequestGetPageArticles, userState: any): Res<responseTypes.ResponseGetPageArticles> => {
  const Data = setData(data);
  return axios.post("article/getPageArticles", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 获取某用户文章的分页数量
 * 
 * url: article/getUserPageNum
 * 
 * test
 */

export const getUserPageNumAPI = (data: requestTypes.RequestGetUserPageNum, userState: any): Res<responseTypes.ResponseGetUserPageNum> => {
  const Data = setData(data);
  return axios.post("article/getUserPageNum", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 获取获取某用户某页的文章
 * 
 * url: article/getUserPage
 * 
 * test
 */

export const getUserPageAPI = (data: requestTypes.RequestGetUserPage, userState: any): Res<responseTypes.ResponseGetUserPage> => {
  const Data = setData(data);
  return axios.post("article/getUserPage", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于模糊搜索, 直接请求第一页，返回结果中有总页数
 * 
 * url: article/pageFuzzySearch
 * 
 * test
 */

export const pageFuzzySearchAPI = (data: requestTypes.RequestPageFuzzySearch, userState: any): Res<responseTypes.ResponsePageFuzzySearch> => {
  const Data = setData(data);
  return axios.post("article/pageFuzzySearch", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于上传文章图片
 * 
 * url: article/uploadImg
 * 
 * test ok
 */

export const uploadImgAPI = (data: requestTypes.RequestUploadImg, userState: any): Res<responseTypes.ResponseUploadImg> => {
  const Data = setData(data);
  return axios.post("article/uploadImg", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}