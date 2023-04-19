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


// 这下面写API就好了
export const loginAPI = (data: requestTypes.RequestLogin): Res<responseTypes.ResLogin> => {
  const Data = setData(data);
  return axios.post("user/login", Data);
}

