<script setup lang="ts">
import {useUserStore} from '@/stores/user-store';
import {storeToRefs} from 'pinia';
import {onMounted} from 'vue'
import {useRouter} from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
const {user_id} = storeToRefs(userStore)

onMounted(() => {
  // user_id.value = 'user'
})
</script>

<template>
  <h2>Auth page</h2>
</template>
