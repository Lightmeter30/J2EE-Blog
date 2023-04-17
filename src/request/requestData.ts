//一般情况下，接口类型会放到一个文件
// 下面两个TS接口，表示要传的参数

// 登录接口中请求体数据格式 url: user/login
export interface ReqLogin{
  username: string
  password: string
}

export interface ReqRegister {
  username: string
  password1: string
  password2: string
}