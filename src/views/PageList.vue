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
import { E_Router } from '@/enums/E_Router'

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
      await deleteDoc(doc(db, `users/${user_id}/interviews/${id}`))
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
          <a :href="slotProps.data.vacancyLink" target="_blank">Link to vacancy</a>
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
      <AppColumn header="Salary">
        <template #body="slotProps">
          <span v-if="!slotProps.data.salary_from" style="color: var(--red-700); font-weight: bold"
            >Empty</span
          >
          <span v-else>{{ slotProps.data.salary_from }} - {{ slotProps.data.salary_to }}</span>
        </template>
      </AppColumn>
      <AppColumn header="Result">
        <template #body="slotProps">
          <span v-if="!slotProps.data.result" style="color: var(--red-700); font-weight: bold"
            >Empty</span
          >
          <template v-else>
            <app-badge
              :severity="slotProps.data.result === 'Offer' ? 'success' : 'danger'"
              :value="slotProps.data.result === 'Offer' ? 'Offer' : 'Refusal'"
            />
          </template>
        </template>
      </AppColumn>
      <AppColumn header="Stages">
        <template #body="slotProps">
          <span v-if="!slotProps.data.stages" style="color: var(--red-700); font-weight: bold"
            >Empty</span
          >
          <template v-else>
            <div class="flex gap-2">
              <app-badge
                v-for="(stage, index) in slotProps.data.stages"
                :key="index"
                :value="index + 1"
                severity="info"
                v-tooltip.top="stage.name"
              />
            </div>
          </template>
        </template>
      </AppColumn>
      <AppColumn header="Actions">
        <template #body="slotProps">
          <router-link
            :to="`${E_Router.EDIT_INTERVIEW}/${slotProps.data.id}`"
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
    </AppDataTable>
  </div>
  <div v-else>
    <AppInlineMessage severity="info">No interviews </AppInlineMessage>
  </div>
</template>
