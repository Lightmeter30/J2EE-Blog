import {h} from "vue";
import type {RequestLogin} from '@/request/requestData'
import  type {FormRules} from 'naive-ui'
export const formatFeedback = (raw: string | undefined) => {
    h('div', {style: 'color: green'}, [raw + '而且是绿的'])
}

export const reg_email = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
export const reg_passwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/


export const getNowTime = ():string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const minus = now.getSeconds();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${minus < 10 ? '0' + minus : minus}`;
}