import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: '',
        userId: -1,
        isLogin: false,
        avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    }),

    getters: {

    },

    actions: {
        login(userToken: string, userId: number):void {
          this.token = userToken;
          this.userId = userId;
          this.isLogin = true;
          this.avatar = '123';
        },
        logout() {
          this.token = ''
          this.userId = -1;
          this.isLogin = false;
          this.avatar = '';
        },
    },

    // persist: true
})
