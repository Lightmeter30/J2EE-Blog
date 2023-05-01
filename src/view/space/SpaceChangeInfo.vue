<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { CloudUpload } from "@vicons/ionicons5";
import { RequestUpdatePassword, RequestUpdateInfo, RequestUpdateAvatar } from '@/request/requestData';
import { UploadCustomRequestOptions } from 'naive-ui';
import { clear } from 'console';
const message = useMessage();
const userState = useUserStore();
const showModal = ref(false);
const userInfo: RequestUpdateInfo = reactive({
  name: 'takune',
  sex: 1,
  description: '都什么年代了,还在当传统二次元',
  birthday: '2001-01-08',
});

const password = reactive({
  oldPassword: '',
  newPassword1: '',
  newPassword2: '',
})

function showDialog() {
  showModal.value = true;
}

function changePassword() {
  console.log("change password...");
  const data: RequestUpdatePassword = {
    newPassword: password.newPassword1,
    oldPassword: password.oldPassword,
  } 
  console.log(data);
}

function changeInfo() {
  console.log("Change info...");
}

const uploadAvatar = async ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress
}: UploadCustomRequestOptions) => {
  const avatar: RequestUpdateAvatar = {
    avatar: undefined,
  }
  // formData.append(file.name, file.file as File)
  avatar.avatar = file.file;
  console.log(114);
  console.log(avatar);
  // lyla
  //   .post(action as string, {
  //     withCredentials,
  //     headers: headers as Record<string, string>,
  //     body: formData,
  //     onUploadProgress: ({ percent }) => {
  //       onProgress({ percent: Math.ceil(percent) })
  //     }
  //   })
  //   .then(({ json }) => {
  //     message.success(JSON.stringify(json))
  //     onFinish()
  //   })
  //   .catch((error) => {
  //     message.success(error.message)
  //     onError()
  //   })
  onFinish(); // 清空列表
  return {
    uploadAvatar
  }
}

</script>

<template>
  <div class="spaceChangeInfo">
    <div class="avatar">
      <n-avatar round :src="userState.avatar" :size="100" />
    </div>
    <div class="Content">
      <div class="upload">
        <n-upload abstract accept="image/png, image/jpeg, image/jpg" :custom-request="uploadAvatar">
          <n-upload-trigger>
            <n-button color="#39c5bb">
              <template #icon>
                <n-icon>
                  <cloud-upload />
                </n-icon>
              </template>
              上传新头像
            </n-button>
          </n-upload-trigger>
        </n-upload>
      </div>
      <div class="formInfo">
        <div style="width: 400px;">
          <n-form ref="formRef">
            <n-form-item label="昵称">
              <n-input v-model:value="userInfo.name" />
            </n-form-item>
            <n-form-item label="个人简介">
              <n-input v-model:value="userInfo.description" />
            </n-form-item>
            <n-form-item label="性别">
              <n-radio-group v-model:value="userInfo.sex" name="radiogroup2">
                <n-radio-button :value="1">
                  保密
                </n-radio-button>
                <n-radio-button :value="2">
                  男
                </n-radio-button>
                <n-radio-button :value="3">
                  女
                </n-radio-button>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="生日">
              <n-date-picker v-model:formatted-value="userInfo.birthday" value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-form>
        </div>
      </div>
      <div class="submitButton">
        <n-button color="#39c5bb" @click="changeInfo()">
          <template #icon>
            <n-icon>
              <cloud-upload />
            </n-icon>
          </template>
          更新个人信息
        </n-button>
      </div>
      <div class="uploadAvatar">
        <n-button color="#39c5bb" @click="showDialog()">
          <template #icon>
            <n-icon>
              <cloud-upload />
            </n-icon>
          </template>
          修改密码
        </n-button>
        <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
          <template #header>
            <div>修改密码</div>
          </template>
          <div>
            <n-form ref="formRef">
              <n-form-item label="旧密码">
                <n-input v-model:value="password.oldPassword" />
              </n-form-item>
              <n-form-item label="新密码">
                <n-input v-model:value="password.newPassword1" />
              </n-form-item>
              <n-form-item label="再次输入新密码">
                <n-input v-model:value="password.newPassword2" />
              </n-form-item>
            </n-form>
          </div>
          <template #action>
            <div>
              <n-button color="#39c5bb" @click="changePassword()">
                <template #icon>
                  <n-icon>
                    <cloud-upload />
                  </n-icon>
                </template>
                提交
              </n-button>
            </div>
          </template>
        </n-modal>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spaceChangeInfo {
  background-color: white;
  border-radius: 5px;
  padding: 20px;

  .Content {

    .upload {
      margin-top: 10px;
      @include center;
    }

    .formInfo {
      margin-top: 20px;
      @include center;
    }
  }

  .avatar {
    @include center;
  }

  .submitButton {
    @include center;
    margin-top: 10px;
  }

  .uploadAvatar {
    @include center;
    margin-top: 10px;
  }
}
</style>