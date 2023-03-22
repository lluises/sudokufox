<template>
  <router-view />
</template>

<script setup>
 import { ref, nextTick, reactive, computed, watch, onMounted } from 'vue'
 import { useTheme } from 'vuetify'
 import SudokuDatabase from '@/sudoku/SudokuDatabase'
 import { useSettingsStore } from '@/store/settings';
 import FirstRun from '@/firstrun/FirstRun';
 import { getCurrentInstance } from 'vue'  // or from '@vue/composition-api'
 import { useRouter, useRoute } from 'vue-router'
 import { useI18n } from 'vue-i18n';

 // https://stackoverflow.com/questions/58579884/how-to-access-root-context-from-a-composition-function-in-vue-composition-api
 const i18n     = useI18n();
 const router   = useRouter();
 const settings = useSettingsStore();
 const theme    = useTheme();

 let language_refresh = false;

 onMounted(() => {
   if (SudokuDatabase.is_virgin()) {
     // First run
     console.log("First Run 🎉");
     FirstRun.load_initial_sudokus_to_database();
   }

   settings.load_from_database();

   nextTick(() => {
     language_refresh = true;
   });
 });

 function change_theme(name) {
   theme.global.name.value = name;
 }

 function change_language(code) {
   const old = i18n.locale.value;
   i18n.locale.value = code;

   if (language_refresh) // Refresh the viewer
     nextTick(() => router.go());
 }

 watch(() => settings.theme, change_theme);
 watch(() => settings.language, change_language);
</script>
