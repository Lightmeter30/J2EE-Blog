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

// /api/user/logout