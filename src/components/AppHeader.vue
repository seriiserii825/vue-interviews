<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {ref} from 'vue'
import {useUserStore} from '@/stores/user-store';
import type {ComputedRef} from 'vue';
import {computed} from 'vue';
import {storeToRefs} from 'pinia';

const userStore = useUserStore()
const {user_id} = storeToRefs(userStore)

interface IMenuItem {
  label: string
  icon: string
  path: string
  show: ComputedRef<boolean>
}

const items = ref<IMenuItem[]>([
  {
    'label': 'Authorization',
    'icon': 'pi pi-user',
    'path': '/auth',
    'show': computed((): boolean => !user_id.value)
  },
  {
    'label': 'Add',
    'icon': 'pi pi-plus',
    'path': '/',
    'show': computed((): boolean => !!user_id.value)
  },
  {
    'label': 'Interview list',
    'icon': 'pi pi-list',
    'path': '/list',
    'show': computed((): boolean => !!user_id.value)
  },
  {
    'label': 'Statistics',
    'icon': 'pi pi-chart-pie',
    'path': '/statistics',
    'show': computed((): boolean => !!user_id.value)
  },
])
</script>
<template>
  <app-menubar :model="items" class="menu">
    <template #item="{item, props}">
      <template v-if="item.show">
        <router-link :to="item.path" class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" class="p-menuitem-icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </router-link>
      </template>
    </template>
    <template #end>
      <template v-if="user_id">
        <div @click="user_id = ''" class="flex align-items-center menu-exit">
          <span class="pi pi-sign-out p-p-menuitem-icon"></span>
          <span class="ml-2">Exit</span>
        </div>
      </template>
    </template>
  </app-menubar>
</template>
<style scoped>
.menu {
  margin: 30px 0;
}

.menu-exit {
  cursor: pointer;
}
</style>
