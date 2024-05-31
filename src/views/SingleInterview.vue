<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useUserStore } from '@/stores/user-store'
import type { IInterview } from '@/interfaces/interview/IInterview'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
const route = useRoute()
const user_store = useUserStore()

const db = getFirestore()
const interview = ref<IInterview>()
const is_loading = ref(true)

const docref = doc(db, `users/${user_store.user_id}/interviews`, route.params.id as string)
async function getData() {
  is_loading.value = true
  try {
    const docSnap = await getDoc(docref)
    if (docSnap.exists()) {
      interview.value = docSnap.data() as IInterview
    }
    is_loading.value = false
  } catch (error) {
    console.log(error, 'error')
    is_loading.value = false
  }
}
function addStage() {
  if (interview.value) {
    if (!interview.value.stages) {
      interview.value.stages = []
    } else {
      interview.value.stages.push({
        name: '',
        date: '',
        description: ''
      })
    }
  }
}
function deleteStage(index: number) {
  if (interview.value && interview.value.stages) {
    interview.value.stages.splice(index, 1)
  }
}
async function saveInterview() {
  if (interview.value) {
    try {
      await updateDoc(docref, { ...interview.value })
      await getData()
    } catch (error) {
      console.log(error, 'error')
    }
  }
}
function saveDateStage(index: number) {
  if (interview.value && interview.value.stages) {
    interview.value.stages[index].date = dayjs(interview.value.stages[index].date).format('DD.MM.YYYY')
  }
}
onMounted(async () => {
  await getData()
})
</script>

<template>
  <div class="content-interview">
    <app-progress-spinner v-if="is_loading" />
    <app-card v-else-if="!is_loading && interview">
      <template #title
        >Interview in company "<em>{{ interview.company }}</em
        >"</template
      >
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Company</label>
          <app-input-text class="input mb-3" id="company" v-model="interview.company" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Description(link)</label>
          <app-input-text class="input mb-3" id="vacancyLink" v-model="interview.vacancyLink" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Hr name</label>
          <app-input-text class="input mb-3" id="hrName" v-model="interview.hrName" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_telegram">Contact telegram</label>
          <app-input-text
            class="input mb-3"
            id="contact_telegram"
            v-model="interview.contactTelegram"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_whatsapp">Contact whatsapp</label>
          <app-input-text
            class="input mb-3"
            id="contact_whatsapp"
            v-model="interview.contactWhatsApp"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_phone">Contact phone</label>
          <app-input-text class="input mb-3" id="contact_phone" v-model="interview.contactPhone" />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-input-number
              v-model="interview.salary_from"
              inputId="salary_from"
              placeholder="Salary from"
            />
          </div>
          <div class="flex-auto">
            <app-input-number
              v-model="interview.salary_to"
              inputId="salary_to"
              placeholder="Salary to"
            />
          </div>
        </div>
        <app-button
          label="Add new stage"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage"
        />
        <template v-if="interview.stages && interview.stages.length">
          <div v-for="(stage, index) in interview.stages" :key="index" class="interview-stage">
            <div class="flex flex-column gap-2">
              <label :for="`stage_name_${index}`">Stage Name</label>
              <app-textarea class="input mb-3" :id="`stage_name_${index}`" v-model="stage.name" />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage_calendar_${index}`">Stage date</label>
              <app-calendar
                class="input mb-3"
                :id="`stage_calendar_${index}`"
                v-model="stage.date"
                dateFormat="dd.mm.yy"
                @date-select="saveDateStage(index)"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage_description_${index}`">Stage Description</label>
              <app-textarea
                class="input mb-3"
                :id="`stage_description_${index}`"
                v-model="stage.description"
                rows="5"
              />
            </div>
            <app-button
              label="Delete stage"
              severity="danger"
              icon="pi pi-trash"
              class="mb-3"
              @click="deleteStage(index)"
            />
          </div>
        </template>
        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio-button
              v-model="interview.result"
              inputId="interview_result_1"
              name="result"
              value="Refusal"
            />
            <label for="interview_result_1" class="ml-2">Refusal</label>
          </div>
          <div class="flex align-items-center">
            <app-radio-button
              v-model="interview.result"
              inputId="interview_result_2"
              name="result"
              value="Offer"
            />
            <label for="interview_result_2" class="ml-2">Offer</label>
          </div>
        </div>
        <div class="flex justify-content-end">
          <app-button label="Save" severity="success" icon="pi pi-save" @click="saveInterview" />
        </div>
      </template>
    </app-card>
  </div>
</template>
<style lang="scss">
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
