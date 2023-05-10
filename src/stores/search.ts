// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        searchText: '',
    }),

    actions: {
      goSearch(text: string) {
        this.searchText = text;
      }
    },
})
