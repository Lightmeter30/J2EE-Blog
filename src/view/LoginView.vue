<template>
  <div class="login">
    <Login id="login-logo"/>
    <SignUp id="signup-logo"/>
    <div class="login-window">
      <div class="login-window-left">
      </div>
      <div class="login-window-right">
        <n-tabs
            class="card-tabs"
            default-value="signin"
            :value="tabValue"
            :on-update:value="updateTab"
            size="large"
            :animated="true"
            tab-style="color: white"
            justify-content="space-around"
            style="margin: 0 -4px"
            pane-style="padding-left: 4px; color: white; padding-right: 4px; box-sizing: border-box;"
        >
          <n-tab-pane name="signin" tab="登录">
            <div class="form">
              <n-form :rules="ruleLogin" content-style="width: 80%;">
                <n-form-item-row label="用户名" path="username">
                  <n-input type="username" placeholder="请输入用户名" v-model:value="login.username"/>
                </n-form-item-row>
                <n-form-item-row label="密码" path="passwd">
                  <n-input type="passwd" placeholder="请输入密码" v-model:value="login.password"/>
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block secondary strong @click="submitLogin"
                        style="background-color: rgba(242,182,4, 0.9);">
                登录
              </n-button>
            </div>
          </n-tab-pane>
          <n-tab-pane name="signup" tab="注册">
            <div class="form">
              <n-form :rules="ruleRegister">
                <n-form-item-row label="用户名" path="username">
                  <n-input type="username" placeholder="请输入用户名" v-model:value="register.username"/>
                </n-form-item-row>
                <n-form-item-row label="密码" path="passwd">
                  <n-input type="passwd" placeholder="请输入密码" v-model:value="register.password1"/>
                </n-form-item-row>
                <n-form-item-row label="重复密码" path="passwd2">
                  <n-input type="passwd" placeholder="请确认密码" v-model:value="register.password2"/>
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block secondary strong @click="submitRegister"
                        style="background-color: rgba(242,182,4, 0.9);">
                注册
              </n-button>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Login, SignUp} from '@/components/svg'
import {reg_username, reg_passwd, formatFeedback} from '@/utils/validate'
import type {ReqLogin, ReqRegister} from '@/request/requestData'
import { loginAPI } from '@/request/api'
import type {FormRules} from "naive-ui";
import {useUserStore} from '@/stores/user'
import {ref, type Ref, reactive} from 'vue'
import {useMessage} from "naive-ui"
import {useRoute, useRouter} from "vue-router";

const tabValue: Ref<string> = ref('signin')
const route = useRoute()
const router = useRouter()
const message = useMessage()
const userState = useUserStore()
const login = reactive<ReqLogin>({
  username: '',
  password: '',
})
const register = reactive<ReqRegister>({
  username: '',
  password1: '',
  password2: ''
})

const ruleLogin: FormRules = {
  username: {
    required: true,
    trigger: ['blur', 'input'],
    validator() {
      if (login.username.length === 0) {
        return new Error('用户名不能为空')
      } else {
        if (!reg_username.test(login.username)) {
          return new Error('必须同时包含字母和数字，以字母开头，长度为3-8')
        }
      }
    }
  },
  passwd: {
    required: true,
    trigger: ['focus', 'input'],
    validator() {
      if (login.password.length === 0) {
        return new Error('密码不能为空')
      } else {
        if (!reg_passwd.test(login.password)) {
          return new Error('密码至少同时包含字母和数字，且长度为8-18')
        }
      }
    }
  }
}
const ruleRegister: FormRules = {
  username: {
    required: true,
    trigger: ['focus', 'input'],
    validator() {
      if (register.username?.length === 0) {
        return new Error('用户名不能为空')
      } else {
        if (!reg_username.test(register.username)) {
          return new Error('必须同时包含字母和数字，以字母开头，长度为3-8')
        }
      }
    }
  },
  passwd: {
    required: true,
    trigger: ['focus', 'input'],
    validator() {
      if (register.password1.length === 0) {
        return new Error('密码不能为空')
      } else {
        if (!reg_passwd.test(register.password1)) {
          return new Error('密码至少同时包含字母和数字，且长度为8-18')
        }
      }
    }
  },
  passwd2: {
    required: true,
    trigger: ['focus', 'input'],
    validator() {
      if (register.password2.length === 0) {
        return new Error('请再次输入密码!')
      } else {
        if (register.password2 !== register.password1) {
          return new Error('前后输入密码不一致!')
        }
      }
    }
  }
}

const updateTab = (value: string) => {
  tabValue.value = value
  console.log(value)
}

const submitLogin = async () => {
  if (login.username.length === 0) {
    message.warning('用户名不能为空')
  } else if (login.password.length === 0) {
    message.warning('密码不能为空')
  } else {
    // const res: loginRes = await userState.login(login)
    // if (res.code === 20000) {
    //   await router.replace('/')
    // } else {
    //   message.error('该用户未注册')
    // }
    let res = await loginAPI(login);
    console.log(res.data.errno,res.data.msg,res.data.userid,res.data.username);
  }
}
const submitRegister = async () => {
  if (register.username.length === 0) {
    message.warning('用户名不能为空')
  } else if (register.password1.length === 0) {
    message.warning('密码不能为空')
  } else if (register.password2.length === 0) {
    message.warning('请再次输入密码')
  } else if (register.password1 !== register.password2) {
    message.warning('两次输入密码不一致')
  } else {
    // const res: registerRes = await userState.register(register)
    // if (res.code == 20000) {
    //   message.success(res.msg)
    //   tabValue.value = 'signin'
    //   login.username = register.username
    //   login.passwd = register.passwd
    // }
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  //color: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $Elements-Icy-Cocoon-1-rgba;
  position: relative;

  #login-logo {
    position: absolute;
    height: 350px;
    bottom: -60px;
    left: 0;
    width: 350px;
  }

  #signup-logo {
    position: absolute;
    height: 350px;
    top: 0;
    left: calc(100% - 280px);
    width: 350px;
  }

  &-window {
    z-index: 1;

    background-color: white;
    background-image: url('@/assets/img/cover.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0;

    //border: 2px solid $color-theme_Pro-3-1-hex;
    border-top: 1px solid $Elements-Icy-Cocoon-2-hex;
    border-right: 1px solid $Elements-Icy-Cocoon-3-hex;
    border-bottom: 1px solid $Elements-Icy-Cocoon-4-hex;
    border-left: 1px solid $Elements-Icy-Cocoon-5-hex;
    border-radius: 3px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.35);

    display: flex;

    &-left {
      width: 600px;
      height: 520px;
      overflow: hidden;
      position: relative;

      svg {
        position: absolute;
        height: 80%;
        bottom: -66px;
        left: 0;
        width: 80%;
      }
    }

    &-right {
      width: 360px;
      height: 520px;
      background-color: $Elements-Icy-Cocoon-1-rgba;

      display: flex;
      justify-content: center;
      align-items: center;


      .form {
        width: 80%;
        padding: 0 10%;
        text-align: center;
        box-sizing: content-box;
      }
    }

  }

  .n-button {
    color: $Elements-Icy-Cocoon-3-hex;
  }
}
</style>