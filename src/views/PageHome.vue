<script setup lang="ts">
// todo: add notification for success or fail
import {computed, ref} from 'vue';
import type {IInterview} from '@/interfaces/interview/IInterview';
import {v4 as uuidv4} from 'uuid';
import {getAuth} from 'firebase/auth';
import {getFirestore, setDoc, doc} from 'firebase/firestore';
import {useRouter} from 'vue-router';

const router = useRouter();
const db = getFirestore();
const company = ref('');
const vacancyLink = ref('');
const hrName = ref('');
const contactTelegram = ref('');
const contactWhatsApp = ref('');
const contactPhone = ref('');
const loading = ref(false);
async function addNewInterview() {
  loading.value = true;
  const payload: IInterview = {
    id: uuidv4(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsApp: contactWhatsApp.value,
    contactPhone: contactPhone.value,
    createdAt: new Date(),
  };
  const user_id = getAuth().currentUser?.uid;
  if (user_id) {
    await setDoc(doc(db, `users/${user_id}/interviews/${payload.id}`), payload)
      .then(() => {
        company.value = '';
        vacancyLink.value = '';
        hrName.value = '';
        contactTelegram.value = '';
        contactWhatsApp.value = '';
        contactPhone.value = '';
        router.push({name: 'list'})
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      })
      .finally(() => {
        loading.value = false;
      });
  }
}
const disabledSaveButton = computed(() => {
  return !company.value || !vacancyLink.value || !hrName.value;
});
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование</template>
      <template #content>
        <app-input-text class="input mb-3" placeholder="Компания" v-model="company" />
        <app-input-text v-model="vacancyLink" class="input mb-3" placeholder="Описание вакансии (ссылка)" />
        <app-input-text v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
        <app-input-text v-model="contactTelegram" class="input mb-3" placeholder="Telegram username HR" />
        <app-input-text v-model="contactWhatsApp" class="input mb-3" placeholder="WhatsApp телефон HR" />
        <app-input-text v-model="contactPhone" class="input mb-3" placeholder="Телефон HR" />
        <app-button @click="addNewInterview" label="Создать собеседование" :disabled="disabledSaveButton"
          :loading="loading"></app-button>
      </template>
    </app-card>
  </div>
</template>
<style scoped>
.input {
  width: 100%;
}

.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
