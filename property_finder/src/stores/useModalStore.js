import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    open: false,
    id: null
  }),
  actions: {
    //Function to open pop up component
    openModal(id) {
      this.open = true
      this.id = id
    },
    //Function to close pop up component
    closeModal() {
      this.open = false
      this.id = null
    }
  },
  getters: {}
})
