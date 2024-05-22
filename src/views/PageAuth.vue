<script setup lang="ts">
import {useUserStore} from '@/stores/user-store';
import {storeToRefs} from 'pinia';
import {computed, onMounted, ref} from 'vue'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {useToast} from 'primevue/usetoast'
import {useRouter} from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
const {user_id} = storeToRefs(userStore)
const toast = useToast()

const is_login = ref(true)
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const subtitleText = computed(() => is_login.value ? 'Login' : 'Register')
const linkAccountText = computed(() => is_login.value ? 'Register' : 'Login')
const submitButtonText = computed(() => is_login.value ? 'Login' : 'Register')

function toggleAuth() {
  is_login.value = !is_login.value
}

function submitForm() {
  if (is_login.value) {
    signIn()
  } else {
    signUp()
  }
}

async function signIn() {
  const auth = getAuth()
  try {
    isLoading.value = true
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({severity: 'error', summary: 'Error', detail: error.message})
    }
    isLoading.value = false
  }finally {
    isLoading.value = false
  }
}

async function signUp() {
  const auth = getAuth()
  try {
    isLoading.value = true
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    console.log(user)
    isLoading.value = false
    router.push('/')
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({severity: 'error', summary: 'Error', detail: error.message})
    }
    isLoading.value = false
  }finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // user_id.value = 'user'
})
</script>

<template>
  <app-toast position="top-right" />
  <div class="flex justify-content-center p-2">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
        <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toggleAuth">
          {{ linkAccountText }}
        </a>
      </div>

      <form @submit.prevent="submitForm">
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <app-input-text v-model="email" id="email1" type="email" class="w-full mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Пароль</label>
        <app-input-text v-model="password" id="password1" type="password" class="w-full mb-3" />

        <app-button :label="submitButtonText" type="submit" icon="pi pi-user" :loading="isLoading"
          class="w-full"></app-button>
      </form>
    </div>
  </div>
</template>
