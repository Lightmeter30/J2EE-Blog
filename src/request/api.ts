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
  for(const key in data) {
    Data.append(key,data[key] as any);
  }
  return Data;
}

/**
 * 用于注册时发送邮箱验证码
 * user/getVerifyCode
 */
export const getVerifyCodeAPI = (data: requestTypes.RequestGetVerifyCode): Res<responseTypes.ResponseGetVerifyCode> => {
  const Data = setData(data);
  return axios.post("user/getVerifyCode", Data);
}

/**
 * 用于用户注册
 * user/register
 */

export const registerAPI = (data: requestTypes.RequestRegister): Res<responseTypes.ResponseRegister> => {
  const Data = setData(data);
  return axios.post("user/register", Data);
}

/**
 * 用于用户登录
 * user/login
 */

export const loginAPI = (data: requestTypes.RequestLogin): Res<responseTypes.ResponseLogin> => {
  const Data = setData(data);
  return axios.post("user/login", Data);
}

/**
 * 用于获取用户信息
 * user/getInfo
 */

export const getUserInfoAPI = (): Res<responseTypes.ResponseGetInfo> => {
  return axios.post("user/getInfo");
}


/**
 * 用于更改用户信息
 * user/updateInfo
 */

export const updateUserInfoAPI = (data: requestTypes.RequestUpdateInfo): Res<responseTypes.ResponseUpdateInfo> => {
  const Data = setData(data);
  return axios.post("user/updateInfo", Data);
}

/**
 * 用于更改用户头像
 * user/updateAvatar
 */

export const updateUserAvatarAPI = (data: requestTypes.RequestUpdateAvatar): Res<responseTypes.ResponseUpdateAvatar> => {
  const Data = setData(data);
  return axios.post("user/updateAvatar", Data);
}

/**
 * 用于更改用户密码
 * user/updatePassword
 */

export const updateUserPasswordAPI = (data: requestTypes.RequestUpdatePassword): Res<responseTypes.ResponseUpdatePassword> => {
  const Data = setData(data);
  return axios.post("user/updatePassword", Data);
}

