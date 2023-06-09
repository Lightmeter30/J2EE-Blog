import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        userName: '',
        token: '',
        userId: -1,
        isLogin: false,
        staticHead: 'http://123.60.156.248/static/',
        avatar: '07akioni.jpeg',
    }),

    getters: {

    },

    actions: {
        login(userToken: string, userId: number):void {
          this.token = userToken;
          this.userId = userId;
          this.isLogin = true;
        },
        logout() {
          this.token = ''
          this.userId = -1;
          this.isLogin = false;
          this.avatar = '';
          this.userName = '';
        },
        setAvatar(avatar: string):void {
          this.avatar = avatar;
        }
    },
    persist: true,
})
