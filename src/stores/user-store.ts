import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user_id = ref('user')

  return {user_id}
})
