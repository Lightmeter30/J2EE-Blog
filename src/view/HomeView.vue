<template>
  <div class="home">
    <div @click="hClick" class="button hvr-bounce-to-left" >home</div>
    <div>
      {{ userInfo.username }}
      {{ userInfo.userid }}
    </div>
  </div>
</template>

<script setup lang="ts">
import 'hover.css';
import { loginAPI } from '@/request/api';
import { ReqLogin } from '@/request/requestData';
import { reactive } from "vue";

const user:ReqLogin = {
  username: 'takune',
  password: 'passwd',
}

const userInfo =  reactive({
  username: '',
  userid: -1,
})

const hClick = async () => {
  console.log(user);
  let res = await loginAPI(user);
  console.log(res.data.errno,res.data.msg,res.data.userid,res.data.username);
}

</script>

<style scoped lang="scss">
</style>