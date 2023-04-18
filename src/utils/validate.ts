import {h} from "vue";
import type {ReqLogin} from '@/request/requestData'
import  type {FormRules} from 'naive-ui'
export const formatFeedback = (raw: string | undefined) => {
    h('div', {style: 'color: green'}, [raw + '而且是绿的'])
}

export const reg_username = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
export const reg_passwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/