import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: ''
    }),

    getters: {

    },

    actions: {
        login(userToken: string) {
            this.token = userToken
        },
        logout() {
            this.token = ''
        },
    },

    persist: true
})
