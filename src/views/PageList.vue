<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { useUserStore } from '@/stores/user-store'
import type { IInterview } from '@/interfaces/interview/IInterview'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const user_store = useUserStore()
const user_id = user_store.user_id
const db = getFirestore()
const interviews = ref<IInterview[]>([])
const is_loading = ref(true)

async function getAllInterviews() {
  const get_data = query(
    collection(db, `users/${user_id}/interviews`),
    orderBy('createdAt', 'desc')
  )
  const list_docs = await getDocs(get_data)

  interviews.value = list_docs.docs.map((doc) => {
    return doc.data() as IInterview
  })
}

async function deleteInterview(id: string) {
  confirm.require({
    message: 'Are you sure you want to delete this interview?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'No',
    acceptLabel: 'Yes',
    rejectClass: 'p-button-text',
    accept: async () => {
      is_loading.value = true
      const result = await deleteDoc(doc(db, `users/${user_id}/interviews/${id}`))
      // console.log(result, 'result')
      await getAllInterviews()
      is_loading.value = false
    }
  })
}

onMounted(async () => {
  is_loading.value = false
  await getAllInterviews()
  is_loading.value = false
  // console.log(interviews.value, 'interviews.value')
})
</script>

<template>
  <AppConfirmDialog />
  <app-progress-spinner v-if="is_loading" />
  <div v-else-if="!is_loading && interviews.length > 0">
    <h2>IInterview list</h2>
    <AppDataTable :value="interviews">
      <AppColumn field="company" header="Company"></AppColumn>
      <AppColumn field="vacancyLink" header="Vacancy link">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank">{{ slotProps.data.vacancyLink }}</a>
        </template>
      </AppColumn>
      <AppColumn header="Contacts">
        <template #body="slotProps">
          <a
            v-if="slotProps.data.contactTelegram"
            :href="`https://t.me/${slotProps.data.contactTelegram}`"
            style="margin-right: 20px"
          >
            <span class="pi pi-telegram" style="color: var(--cyan-600)"></span>
          </a>
          <a
            v-if="slotProps.data.contactWhatsApp"
            :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
            style="margin-right: 20px"
          >
            <span class="pi pi-whatsapp" style="color: var(--green-800)"></span>
          </a>
          <a
            v-if="slotProps.data.contactPhone"
            :href="`https://t.me/${slotProps.data.contactPhone}`"
            style="margin-right: 20px"
          >
            <span class="pi pi-phone"></span>
          </a>
        </template>
      </AppColumn>
      <AppColumn field="hrName" header="HR name"></AppColumn>
      <AppColumn header="Actions">
        <template #body="slotProps">
          <router-link
            :to="`/edit/${slotProps.data.id}`"
            class="p-button p-button-rounded p-button-text"
          >
            <span class="pi pi-pencil"></span>
          </router-link>
          <button
            @click="deleteInterview(slotProps.data.id)"
            class="p-button p-button-danger p-button-rounded p-button-text"
          >
            <span class="pi pi-trash"></span>
          </button>
        </template>
      </AppColumn>
      <AppColumn field="createdAt" header="Created at"></AppColumn>
    </AppDataTable>
  </div>
  <div v-else>
    <AppInlineMessage severity="info">No interviews </AppInlineMessage>
  </div>
</template>
