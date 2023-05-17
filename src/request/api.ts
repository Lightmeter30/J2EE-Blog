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
* */
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
* */

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
* */

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
* */

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
* */

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
* */

export const updateUserAvatarAPI = (data: requestTypes.RequestUpdateAvatar, userState: any): Res<responseTypes.ResponseUpdateAvatar> => {
  const Data = setData(data);
  return axios.post("user/updateAvatar", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于获取其他用户信息
 * 
 * url: user/getOtherInfo
 * 
 * 
* */

export const getOtherInfoAPI = (data: requestTypes.RequestGetOtherInfo, userState: any): Res<responseTypes.ResponseGetOtherInfo> => {
  const Data = setData(data);
  return axios.post("user/getOtherInfo", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于获取对应id列表的用户名，头像，简介等
 * 
 * url: user/getOtherBriefInfos
 * 
 * 
* */

export const getOtherBriefInfosAPI = (data: requestTypes.RequestGetOtherBriefInfos, userState: any): Res<responseTypes.ResponseGetOtherBriefInfos> => {
  const Data = setData(data);
  return axios.post("user/getOtherBriefInfos", Data, { headers: {
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
* */

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
 **/

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
 **/

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
 **/

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
* */

export const getArticleAPI = (data: requestTypes.RequestGetArticle, userState: any): Res<responseTypes.ResponseGetArticle> => {
  const Data = setData(data);
  return axios.post("article/get", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于首页文章的总页数
 * 
 * url: article/getPageNum
 * 
 * test
* */

export const getHomePageNumAPI = (): Res<responseTypes.ResponseGetPageNum> => {
  return axios.post("article/getPageNum"); 
}

/**
 * 用于获取首页某一页的所有文章
 * 
 * url: article/getPageArticles
 * 
 * test
* */

export const getHomePageArticlesAPI = (data: requestTypes.RequestGetPageArticles): Res<responseTypes.ResponseGetPageArticles> => {
  const Data = setData(data);
  return axios.post("article/getPageArticles", Data); 
}

/**
 * 获取某用户文章的分页数量
 * 
 * url: article/getUserPageNum
 * 
 * test
* */

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
* */

export const getUserPageArticlesAPI = (data: requestTypes.RequestGetUserPage, userState: any): Res<responseTypes.ResponseGetUserPage> => {
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
* */

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
* */

export const uploadImgAPI = (data: requestTypes.RequestUploadImg, userState: any): Res<responseTypes.ResponseUploadImg> => {
  const Data = setData(data);
  return axios.post("article/uploadImg", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于获取文章评论
 * 
 * url: comment/getArticleComments
 * 
 * test ok
* */

export const getArticleCommentsAPI = (data: requestTypes.RequestGetArticleComments, userState: any): Res<responseTypes.ResponseGetArticleComments> => {
  const Data = setData(data);
  return axios.post("comment/getArticleComments", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于添加评论
 * 
 * url: comment/add
 * 
 * test ok
* */

export const addArticleCommentAPI = (data: requestTypes.RequestAddComment, userState: any): Res<responseTypes.ResponseAddComment> => {
  const Data = setData(data);
  return axios.post("comment/add", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } }); 
}

/**
 * 用于删除评论
 * 
 * url: comment/delete
 *
 * ????
* */

export const deleteArticleCommentAPI = (data: requestTypes.RequestDeleteComment, userState: any): Res<responseTypes.ResponseDeleteComment> => {
  const Data = setData(data);
  return axios.post("comment/delete", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于添加草稿
 * 
 * url: draft/add
 * 
 * test
* */

export const addDraftAPI = (data: requestTypes.RequestAddDraft, userState: any): Res<responseTypes.ResponseAddDraft> => {
  const Data = setData(data);
  return axios.post("draft/add", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
* 用于删除草稿
 * 
 * url: draft/delete
 * 
 * test
* */

export const deleteDraftAPI = (data: requestTypes.RequestDeleteDraft, userState: any): Res<responseTypes.ResponseDeleteDraft> => {
  const Data = setData(data);
  return axios.post("draft/delete", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于更改草稿
 * 
 * url: draft/update
 * 
 * test
* */

export const updateDraftAPI = (data: requestTypes.RequestUpdateDraft, userState: any): Res<responseTypes.ResponseUpdateDraft> => {
  const Data = setData(data);
  return axios.post("draft/update", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于获取某个草稿的信息
 * 
 * url: draft/get
 * 
 *  test
* */

export const getDraftAPI = (data: requestTypes.RequestGetDraft, userState: any): Res<responseTypes.ResponseGetDraft> => {
  const Data = setData(data);
  return axios.post("draft/get", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于获取某用户草稿页数
 * 
 * url: draft/getUserPageNum
 * 
 * test ok
* */

export const getUserDraftPageNumAPI = (data: requestTypes.RequestGetUserPageNum, userState: any): Res<responseTypes.ResponseGetUserDraftPageNum> => {
  const Data = setData(data);
  return axios.post("draft/getUserPageNum", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 获取用户某页草稿
 * 
 * url: draft/getUserPage
 * 
 *  test ok
* */

export const getUserDraftPageAPI = (data: requestTypes.RequestGetUserPage, userState: any): Res<responseTypes.ResponseGetUserDraftPage> => {
  const Data = setData(data);
  return axios.post("draft/getUserPage", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 添加一篇文章到指定收藏夹
 * 
 * url: favorite/add
 * 
 *  test ok
* */

export const addArticleToCollectAPI = (data: requestTypes.RequestAddFavorite, userState: any): Res<responseTypes.ResponseAddFavorite> => {
  const Data = setData(data);
  return axios.post("favorite/add", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 获取某一文件夹下的所有文章
 * 
 * url: favorite/getFolderFavorites
 * 
 * test
* */

export const getArticlesFromCollectAPI = (data: requestTypes.RequestGetFolderFavorites, userState: any): Res<responseTypes.ResponseGetFolderFavorites> => {
  const Data = setData(data);
  return axios.post("favorite/getFolderFavorites", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
* 删除指定收藏夹下的指定文章
 * 
 * url: favorite/delete
 * 
 * test
* */

export const deleteArticleFromCollectAPI = (data: requestTypes.RequestDeleteFavorites, userState: any): Res<responseTypes.ResponseDeleteFavorite> => {
  const Data = setData(data);
  return axios.post("favorite/delete", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于新建收藏夹
 * 
 * url: favoriteFolder/add
 * 
 * test ok
* */

export const addCollectAPI = (data: requestTypes.RequestAddFavoriteFolder, userState: any): Res<responseTypes.ResponseAddFavoriteFolder> => {
  const Data = setData(data);
  return axios.post("favoriteFolder/add", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于获取某个用户的所有收藏夹
 * 
 * url: favoriteFolder/getUserFolders
 * 
 *  test ok
* */

export const getUserAllCollectAPI = (userState: any): Res<responseTypes.ResponseGetUserFolders> => {
  return axios.post("favoriteFolder/getUserFolders", undefined, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 删除一个收藏夹,并且删除其中所有的收藏
 * 
 * url: favoriteFolder/delete
 * 
 * test ok
**/

export const deleteCollectAPI = (data: requestTypes.RequestDeleteFavoriteFolder, userState: any): Res<responseTypes.ResponseDeleteFavoriteFolder> => {
  const Data = setData(data);
  return axios.post("favoriteFolder/delete", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于将某个用户添加到自己的关注列表中
 * 
 * url: follow/add
 * 
 * test
* */

export const addUserToFollowAPI = (data: requestTypes.RequestAddFollow, userState: any): Res<responseTypes.ResponseAddFollow> => {
  const Data = setData(data);
  return axios.post("follow/add", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于获取当前用户的关注列表
 * 
 * url: follow/getUserFollowed
 * 
 * 
* */

export const getUserFollowListAPI = (userState: any): Res<responseTypes.ResponseGetUserFollowed> => {
  // const Data = setData(data);
  return axios.post("follow/getUserFollowed", undefined, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于取消关注某个用户
 * 
 * url: follow/delete
 * 
 * test
* */

export const deleteUserFromFollowAPI = (data: requestTypes.RequestDeleteFollow, userState: any): Res<responseTypes.ResponseDeleteFollow> => {
  const Data = setData(data);
  return axios.post("draft/add", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}

/**
 * 用于获取文章id列表对应的文章信息
 * 
 * url: article/getByIdList
 * 
 * test
* */

export const getArticleByListAPI = (data: requestTypes.RequestGetByIdList, userState: any): Res<responseTypes.ResponseGetByIdList> => {
  const Data = setData(data);
  return axios.post("article/getByIdList", Data, { headers: {
    id: userState.userId,
    token: userState.token
  } });
}