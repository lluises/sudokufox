<template>
  <v-container class="fill-height">
    <v-row>
      <v-col justify="center" class="logo-image-cont text-center">
        <img
          class="logo-image"
          :src="'/img/sudokufox' + (is_dark ? '-dark' : '') + '.png'"
        />
      </v-col>

      <v-col class="sudoku-database-cont">
        <SudokuDatabaseList
          @open_collection="open_collection"
          />
      </v-col>

    </v-row>
  </v-container>
</template>

<style>
 .logo-image-cont {
 }

 .logo-image {
   max-width: 80vw;
   max-height: 80vh;
 }

 .sudoku-database-cont {
   min-width: 20em;
 }
</style>

<script setup>
 import { computed } from 'vue';
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import SudokuDatabaseList from '@/components/SudokuDatabaseList';
 import SudokuCollectionList from '@/components/SudokuCollectionList';
 import { useRouter, useRoute } from 'vue-router';
 import { useSettingsStore } from '@/store/settings';
 import Themes from '@/themes';

 const router = useRouter();
 const settings = useSettingsStore();

 const is_dark = computed(() => {
   return !!(Themes[settings.theme]?.dark);
 });

 function open_collection(col_id) {
   console.log("open_collection( " + col_id + ")");
   router.push({name: 'collection', params: {colid: col_id}});
 }
</script>
