import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
   open: false,
   id : null,
  }),
  actions: {
    openModal(id) {
      this.open = true;
      this.id = id
    },

    closeModal() {
      this.open = false
      this.id = null
    },
  },
  getters: {}
})