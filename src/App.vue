<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>
<template>
  <div class="container m-auto">
    <AppHeader />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>
