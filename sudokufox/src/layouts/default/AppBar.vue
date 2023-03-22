<template>
  <v-app-bar flat color="primary">
    <v-btn
      @click="go_back"
      :icon="can_go_back ? 'mdi-chevron-left' : 'mdi-controller-classic'"
    />

    <v-app-bar-title>
      {{ title }}
    </v-app-bar-title>

    <Timer v-if="show_timer"/>

    <OptionsMenu />
  </v-app-bar>
</template>

<script setup>
 import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
 import { useRouter, useRoute } from 'vue-router'
 import { useSettingsStore } from '@/store/settings';
 import Timer from '@/components/Timer';
 import OptionsMenu from '@/components/OptionsMenu';
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const route = useRoute();
 const router = useRouter();
 const settings = useSettingsStore();

 const can_go_back = computed(() => {
   return route.name != "home";
 });

 const show_timer = computed(() => {
   return settings.show_timer && route.name == "sudoku";
 });

 const title = computed(() => {
   if (route.name == 'collection')
     return SudokuDatabase.collection(route.params.colid).name;
   else if (route.name == 'settings')
     return t('Settings');
   return 'Sudoku Fox';
 });

 function go_back() {
   if (can_go_back)
     router.go(-1);
 }
</script>

<i18n lang="yaml">
en:
  Settings: "Settings"

ca:
  Settings: "Preferències"

es:
  Settings: "Ajustes"
</i18n>
