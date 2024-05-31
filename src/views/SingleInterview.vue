<script setup lang="ts"></script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Interview in company</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Company</label>
          <app-input-text class="input mb-3" id="company"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Description(link)</label>
          <app-input-text class="input mb-3" id="vacancyLink"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Hr name</label>
          <app-input-text class="input mb-3" id="hrName"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_telegram">Contact telegram</label>
          <app-input-text class="input mb-3" id="contact_telegram"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_whatsapp">Contact whatsapp</label>
          <app-input-text class="input mb-3" id="contact_whatsapp"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_phone">Contact phone</label>
          <app-input-text class="input mb-3" id="contact_phone"/>
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
