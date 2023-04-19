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