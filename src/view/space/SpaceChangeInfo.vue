<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { CloudUpload } from "@vicons/ionicons5";
const userState = useUserStore();

const userInfo = reactive({
  name: 'takune',
  sex: '1',
  description: '都什么年代了,还在当传统二次元',
  birthday: '2001-01-08',
});
</script>

<template>
  <div class="spaceChangeInfo">
    <div class="avatar">
      <n-avatar round :src="userState.avatar" :size="100" />
    </div>
    <div class="Content">
      <div class="upload">
        <n-button color="#39c5bb">
          <template #icon>
            <n-icon>
              <cloud-upload />
            </n-icon>
          </template>
          上传新头像
        </n-button>
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
                <n-radio-button value="1">
                  保密
                </n-radio-button>
                <n-radio-button value="2">
                  男
                </n-radio-button>
                <n-radio-button value="3">
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
          <n-button color="#39c5bb">
                <template #icon>
                  <n-icon>
                    <cloud-upload />
                  </n-icon>
                </template>
                更新个人信息
              </n-button>
        </div>
        <div class="changePassword">
          <n-button color="#39c5bb">
                <template #icon>
                  <n-icon>
                    <cloud-upload />
                  </n-icon>
                </template>
                修改密码
              </n-button>
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

  .changePassword {
    @include center;
    margin-top: 10px;
  }
}
</style>