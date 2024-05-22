<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import {onMounted, ref} from 'vue'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useUserStore} from './stores/user-store';
import {storeToRefs} from 'pinia';
const user_store = useUserStore()
const {user_id} = storeToRefs(user_store)
const is_loading = ref(true)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user_id.value = user.uid
      is_loading.value = false
    } else {
      user_id.value = ''
      is_loading.value = false
    }
  })
})
</script>
<template>
  <app-progress-spinner v-if="is_loading" />
  <div v-else class="container m-auto p-5">
    <AppHeader />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>
