<template>
  <v-container fluid class="fill-height ma-0 pa-0">

    <v-row no-gutters class="fill-height" align="center">

      <!-- Sudoku Area -->
      <v-col class="area-sudoku ma-0 pa-0" justify="center" algin="center">
        <SudokuBoard
          :original="original"
          :sudoku="state.sudoku"
          :selected="state.selected_cell"
          :mistakes="mistakes"
          :highlight="highlight_number"
          :hints="state.hints"
          @select="select_sudoku_cell"
        />
      </v-col>

      <!-- Keypad -->
      <v-col class="area-keypad ma-0 pa-0" align="center" v-if="!state.solved">
        <v-container fluid class="ma-0 pa-0">
          <v-col no-gutters class="cont-keypad ma-0 pa-0 justify-center" justify="center">
            <Keypad
              :selected='state.selected_number'
              :hinting='state.mode_hinting'
              @fire="handle_key"
            />
          </v-col>
        </v-container>
      </v-col>

      <!-- Winner banner -->
      <v-col class="area-keypad ma-0 pa-0" align="center" v-if="state.solved">
        <v-container fluid class="ma-0 pa-0">
          <v-col no-gutters class="cont-keypad ma-0 pa-0 justify-center" justify="center">
            <WinnerWinnerChickenDinner
              :time="stored_time"
              :date="stored_date"
            />
          </v-col>
        </v-container>
      </v-col>

    </v-row>

  </v-container>
</template>

<style>
 .area-sudoku {
   /* min-height: 50%; */
   /* max-width: 80em; */
 }

 .area-keypad {
   /* max-width: 800px; */
 }

 .cont-keypad {
   max-width: 600px;
   min-width: 400px;
 }
</style>

<script setup>
 import { reactive, computed, onMounted, onUnmounted } from 'vue'
 import { useRouter, useRoute } from 'vue-router'
 import { useTimerStore } from '@/store/timer';
 import { useSettingsStore } from '@/store/settings';
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import SudokuHints from "@/sudoku/SudokuHints";
 import SudokuUndo from "@/sudoku/SudokuUndo";
 import SudokuBoard from '@/components/SudokuBoard';
 import Keypad from '@/components/Keypad';
 import WinnerWinnerChickenDinner from '@/components/WinnerWinnerChickenDinner';

 const route = useRoute();
 const timer = useTimerStore();
 const settings = useSettingsStore();

 const state = reactive({
   sudoid: "",
   index: 0,
   sudoku: false,
   selected_cell: -1,
   selected_number: -1,
   mode_hinting: false,
   hints: new SudokuHints(),
   undo: new SudokuUndo(),
   solved: false,
 });

 onMounted(() => {
   state.sudoid = route.params.sudoid || "";
   if (!state.sudoid)
     return;
   state.sudoku = SudokuDatabase.sudoku_modified(state.sudoid);
   state.hints = SudokuDatabase.sudoku_hints(state.sudoid);
   state.undo = SudokuDatabase.sudoku_undo(state.sudoid);
   state.solved = !!SudokuDatabase.sudoku_solved_date(state.sudoid);

   timer.reset();
   timer.set_time(SudokuDatabase.sudoku_play_time(state.sudoid));

   if (!state.solved)
     timer.play();
 });

 onUnmounted(() => {
   timer.pause();
   save_to_disk();
   timer.reset();
 });

 const stored_date = computed(() => {
   return SudokuDatabase.sudoku_solved_date(state.sudoid);
 });

 const stored_time = computed(() => {
   return SudokuDatabase.sudoku_play_time(state.sudoid);
 });

 const read_only = computed(() => {
   return state.solved;
 });

 const original = computed(() => {
   if (!state.sudoid)
     return;
   return SudokuDatabase.sudoku_original(state.sudoid);
 });

 const mistakes = computed(() => {
   if (!settings.show_mistakes || !state.sudoku)
     return new Set();
   let res = state.sudoku.detect_mistakes();
   console.log('mistakes:', res);
   return res;
 });

 const highlight_number = computed(() => {
   if (!settings.highlight_numbers)
     return -1;
   return state.selected_number > 0 ? state.selected_number : -1;
 });

 function handle_key(key) {
   if (read_only.value)
     return;
   console.log("KEYPAD pressed " + key); // DEBUG

   if (key == 'undo')
     launch_undo();

   else if (key == 'hinting')
     state.mode_hinting = !state.mode_hinting;

   else if (key == 'clear')
     state.selected_number = (state.selected_number == 0) ? -1 : 0;

   else if (key >= 0 && key <= 10)
     state.selected_number = (key == state.selected_number) ? -1 : key;

   state.selected_cell = -1;
 }

 function select_sudoku_cell(index) {
   if (read_only.value)
     return;
   state.selected_cell = index;
   if (state.selected_number >= 0)
     modify_value();
 }

 function launch_undo() {
   const last = state.undo.undo();

   if (!last)
     ; // pass

   else if (last.type == 'board')
     state.sudoku.edit(last.index, last.before);

   else if (last.type == 'hint') {
     if (!last.after && last.before)
       state.hints.add_cell_hint(last.index, last.before);
     else if (last.after && !last.before)
       state.hints.delete_cell_hint(last.index, last.after);
   }
 }

 function modify_value() {
   // Check if we need to modify a value on the sudoku board
   if (state.selected_cell >= 0 && state.selected_number >= 0) {
     // TODO: Configurable behaviour
     if (state.mode_hinting) {
       let action = 'add';
       if (state.selected_number == 0
           || state.hints.cell_hints(state.selected_cell).has(state.selected_number))
         action = 'delete';
       edit_hint_value(state.selected_cell, state.selected_number, action);
     }
     else if (state.sudoku.board[state.selected_cell] == state.selected_number)
       edit_sudoku_value(state.selected_cell, 0);
     else
       edit_sudoku_value(state.selected_cell, state.selected_number);
   }
 }

 function edit_sudoku_value(index, value) {
   if (state.sudoku.board[index] == value)
     return; // Nothing to change
   state.undo.push({
     index: index,
     'type': 'board',
     before: state.sudoku.board[index],
     after: value,
   });
   state.sudoku.edit(index, value);
   state.solved = state.sudoku.is_solved();

   if (state.solved)
     winner_winner();
 }

 function edit_hint_value(index, value, action) {
   // Action is either 'add' or 'delete'
   if ((action == 'add' && state.hints.cell_hints(index).has(value))
       || (action == 'delete' && !state.hints.cell_hints(index).has(value)))
     return; // Nothing to change
   state.undo.push({
     index: index,
     'type': 'hint',
     before: (action == 'add') ? 0 : value,
     after: (action == 'add') ? value : 0,
   });
   if (action == 'add')
     state.hints.add_cell_hint(index, value);
   else
     state.hints.delete_cell_hint(index, value);
 }

 function winner_winner() {
   timer.pause();
   save_to_disk();
 }

 function save_to_disk() {
   console.log("Saving to disk: ", state.sudoid);
   SudokuDatabase.edit_sudoku_play_time(state.sudoid, timer.miliseconds());
   SudokuDatabase.edit_sudoku_modified(state.sudoid, state.sudoku);
   SudokuDatabase.edit_sudoku_hints(state.sudoid, state.hints);
   SudokuDatabase.edit_sudoku_undo(state.sudoid, state.undo);
   if (state.sudoku.is_solved()) {
     SudokuDatabase.edit_sudoku_solved_date(state.sudoid, new Date());
     SudokuDatabase.delete_sudoku_hints(state.sudoid);
     SudokuDatabase.delete_sudoku_undo(state.sudoid);
   }
 }
</script>
