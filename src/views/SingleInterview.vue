<script setup lang="ts"></script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Interview in company</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Company</label>
          <app-input-text class="input mb-3" id="company" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Description(link)</label>
          <app-input-text class="input mb-3" id="vacancyLink" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Hr name</label>
          <app-input-text class="input mb-3" id="hrName" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_telegram">Contact telegram</label>
          <app-input-text class="input mb-3" id="contact_telegram" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_whatsapp">Contact whatsapp</label>
          <app-input-text class="input mb-3" id="contact_whatsapp" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contact_phone">Contact phone</label>
          <app-input-text class="input mb-3" id="contact_phone" />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-input-number inputId="salary_from" placeholder="Salary from" />
          </div>
          <div class="flex-auto">
            <app-input-number inputId="salary_to" placeholder="Salary to" />
          </div>
        </div>
        <app-button label="Add new stage" severity="info" icon="pi pi-plus" class="mb-3" />
        <div class="interview-stage">
          <div class="flex flex-column gap-2">
            <label for="stage_name">Stage Name</label>
            <app-textarea class="input mb-3" id="stage_name" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="stage_calendar">Stage date</label>
            <app-calendar class="input mb-3" id="stage_calendar" dateFormat="dd.mm.yyyy" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="stage_description">Stage Description</label>
            <app-textarea class="input mb-3" id="stage_description" rows="5" />
          </div>
          <app-button label="Delete stage" severity="danger" icon="pi pi-trash" class="mb-3" />
        </div>
        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio-button inputId="interview_result_1" name="result" value="Refusal" />
            <label for="interview_result_1" class="ml-2">Refusal</label>
          </div>
          <div class="flex align-items-center">
            <app-radio-button inputId="interview_result_2" name="result" value="Offer" />
            <label for="interview_result_2" class="ml-2">Offer</label>
          </div>
        </div>
        <div class="flex justify-content-end">
          <app-button label="Save" severity="success" icon="pi pi-save" />
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
