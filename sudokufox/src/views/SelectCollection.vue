<template>
  <div>
    <v-tabs
      v-model="state.puzzle_tab"
      fixed-tabs
      bg-color="primary"
    >
      <v-tab value="unsolved"><span v-t="'Unsolved'"></span></v-tab>
      <v-tab value="solved"><span v-t="'Solved'"></span></v-tab>
    </v-tabs>

    <v-container class="fill-height pa-0">
      <v-row>
        <v-window v-model="state.puzzle_tab" class="pt-6">

          <v-window-item value="unsolved">
            <v-responsive class="d-flex align-center text-center fill-height full-width">
              <SudokuCollectionList
                :collection_id="col_id"
                :filters="['virgin', 'playing']"
                @open_sudoku="open_sudoku"
              />
            </v-responsive>
          </v-window-item>

          <v-window-item value="solved">
            <v-responsive class="d-flex align-center text-center fill-height full-width">
              <SudokuCollectionList
                :collection_id="col_id"
                :filters="['solved']"
                @open_sudoku="open_sudoku"
              />
            </v-responsive>
          </v-window-item>

        </v-window>
      </v-row>
    </v-container>
  </div>
</template>

<style>
 .full-width {
   width: 100vw;
 }

 .filter-tabs {
   position: fixed;
 }
</style>

<script setup>
 import { reactive, computed, watch, onMounted, onUnmounted } from 'vue'
 import { useRouter, useRoute } from 'vue-router'
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import SudokuCollectionList from '@/components/SudokuCollectionList';
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const route = useRoute();
 const router = useRouter();

 const state = reactive({
   puzzle_tab: null,
 });

 const col_id = computed(() => {
   return +route.params.colid;
 });

 const collection = computed(() => {
   if (!col_id.value)
     return false;
   return SudokuDatabase.collection(col_id.value);
 });

 function open_sudoku(sudoid) {
   router.push({name: 'sudoku', params: {sudoid: sudoid}});
 }
</script>

<i18n lang="yaml">
ca:
  Unsolved: "Pendents"
  Solved: "Resolts"
es:
  Unsolved: "Pendientes"
  Solved: "Resueltos"
</i18n>
