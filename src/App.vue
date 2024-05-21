<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>
<template>
  <div class="container m-auto p-5">
    <AppHeader />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>
