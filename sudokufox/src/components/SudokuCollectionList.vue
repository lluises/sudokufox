<!--
     <SudokuDatabaseList
       collection_id="69"
       filters="unsolved"
       @open_sudoku="index => alert(index)"
     />
-->
<template>
  <v-container>
    <v-row>
      <v-col
        v-for="([index, sudoid]) in state.sudoku_list"
      >
        <v-lazy
          :options="{
            threshold: .5
          }"
          transition="scroll-y-reverse-transition"
        >
          <v-btn
            flat
            @click="open_sudoku(sudoid)"
            width="12em"
            height="12em"
          >
            <div class="sudoku-list-text-cont sudoku-list-text">
              <div class="sudoku-list-number">{{ index + 1 }}</div>
              <div class="sudoku-list-time" v-if="play_time(sudoid)">{{ play_time(sudoid) }}</div>
            </div>

            <SudokuPreviewBoard
              v-if="settings.show_board_preview"
              :original="fetch_original(sudoid)"
              :sudoku="fetch_sudoku(sudoid)"
              :show_mistakes="show_mistakes(sudoid)"
              :is_solved="is_solved(sudoid)"
            />

            <v-menu v-if="!is_virgin(sudoid)">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-dots-vertical"
                  class="sudoku-list-forget-button"
                  size="small"
                ></v-btn>
              </template>

              <v-list>
                <v-list-item
                  @click="forget_sudoku(sudoid)"
                >
                  <template v-slot:append>
                    <v-icon icon="mdi-bomb"></v-icon>
                  </template>

                  <v-list-item-title v-t="'Forget'"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-btn>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
 .sudoku-list-number {
   font-size: 3em;
 }

 .sudoku-list-time {
 }

 .sudoku-list-text-cont {
   position: absolute;
   align-items: center;
   display: flex;
   justify-content: center;
   flex-direction: column;
 }

 .sudoku-list-text {
   color: rgb(var(--v-theme-primary));
   background-color: rgba(var(--v-theme-background), .9);
   border-radius: 10px;
   padding: .5em;
   width: 7em;
   height: 7em;
 }

 .sudoku-list-forget-button {
   height: 1em;
   position: absolute;
   top: .2em;
   right: .2em;
 }
</style>

<script setup>
 import { reactive, computed, onMounted } from 'vue'
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import time_utils from '@/utils/time';
 import SudokuPreviewBoard from '@/components/SudokuPreviewBoard';
 import { useSettingsStore } from '@/store/settings';
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const settings = useSettingsStore();

 const props = defineProps({
   collection_id: Number,
   filters: {required: false, default: false}, // Filter states: ['playing']
 });

 const emit = defineEmits(['open_sudoku']);

 const state = reactive({
   sudoku_list: false,
 });

 onMounted(() => {
   state.sudoku_list = sudokus();
 });

 const collection = computed(() => {
   return SudokuDatabase.collection(props.collection_id);
 });

 function sudokus() {
   const res = [];
   const all = collection.value ? collection.value.sudokus : [];
   for (let i = 0; i < all.length; i++)
     res.push([i, all[i]]);
   if (!props.filters)
     return res;
   console.log(res);
   return res.filter(e => props.filters.indexOf(SudokuDatabase.sudoku_state(e[1])) >= 0);
 }

 function open_sudoku(sudoid) {
   emit("open_sudoku", sudoid);
 }

 function fetch_original(sudoid) {
   return SudokuDatabase.sudoku_original(sudoid);
 }

 function fetch_sudoku(sudoid) {
   return SudokuDatabase.sudoku_modified(sudoid);
 }

 function show_mistakes(sudoid) {
   return settings.show_mistakes && !SudokuDatabase.sudoku_original(sudoid).is_solved();
 }

 function is_solved(sudoid) {
   return !!SudokuDatabase.sudoku_solved_date(sudoid);
 }

 function is_virgin(sudoid) {
   return SudokuDatabase.sudoku_state(sudoid) == 'virgin';
 }

 function play_time(sudoid) {
   const milis = SudokuDatabase.sudoku_play_time(sudoid);
   if (!milis)
     return false;
   return time_utils.pretty_time((milis / 1000) >> 0);
 }

 function forget_sudoku(sudoid) {
   SudokuDatabase.reset_sudoku(sudoid);
   state.sudoku_list = sudokus();
 }
</script>

<i18n lang="yaml">
  # <pre> Hack my IDE to stop miss-identing this section
en:
  Forget: Forget

ca:
  Forget: Olvida

es:
  Forget: Olvida
</i18n>
