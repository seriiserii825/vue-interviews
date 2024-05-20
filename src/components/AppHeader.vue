<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {ref} from 'vue'

interface IMenuItem {
  label: string
  icon: string
  path: string
}

const items = ref<IMenuItem[]>([
  {
    'label': 'Authorization',
    'icon': 'pi pi-user',
    'path': '/auth',
  },
  {
    'label': 'Add',
    'icon': 'pi pi-plus',
    'path': '/'
  },
  {
    'label': 'Interview list',
    'icon': 'pi pi-list',
    'path': '/list'
  },
  {
    'label': 'Statistics',
    'icon': 'pi pi-chart-pie',
    'path': '/statistics'
  },
])
</script>
<template>
  <app-menubar :model="items" class="menu">
    <template #item="{item, props}">
      <router-link :to="item.path" class="flex align-items-center" v-bind="props.action">
        <span :class="item.icon" class="p-menuitem-icon"></span>
        <span class="ml-2">{{ item.label }}</span>
      </router-link>
    </template>
  </app-menubar>
</template>
<style scoped>
.menu {
  margin: 30px 0;
}
</style>
