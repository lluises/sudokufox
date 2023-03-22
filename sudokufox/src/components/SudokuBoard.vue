<!--
     <SudokuBoard
       :original="Sudoku()"
       :sudoku="Sudoku()"
       :selected='12'
       :mistakes='Set[1, 30]'
       :highlight='3'
       :hints="SudokuHints()"
       @select="(index) => ..."
     />
-->

<template>
  <div v-if="props.original && props.sudoku" class="generic-sudoku-board sudoku-board">
    <div class="sudoku-board-row" v-for="r in size">
      <div
        :class="calculate_cell_class((size*(r-1))+c-1)" v-for="c in size"
        @click="select_cell((size*(r-1))+c-1)"
      >
        <!-- Number -->
        <span :class="calculate_text_class((size*(r-1))+c-1)">
          {{ props.sudoku.board[(size * (r - 1)) + c - 1] }}
        </span>

        <!-- Hints -->
        <span
          v-if="is_empty((size*(r-1))+c-1)"
          v-for="hnum of props.hints.cell_hints((size*(r-1))+c-1)"
          :key="hnum"
          :class="'cell-hint cell-hint-' + hnum"
        >
          {{ hnum }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
 @import "@/styles/sudoku_board.scss";

 .sudoku-board {
   width: 100vw;
 }

 .sudoku-board-row {
   width: 100vw;
   font-size: calc(100vw / 22);
 }

 .sudoku-board-cell {
   width: calc((100vw - 2px) / 9);
   height: calc((100vw - 2px) / 9);
 }

 /* Responsive resizing */
 @media screen and (orientation: landscape) {
   .sudoku-board {
     width: 90vh;
   }

   .sudoku-board-cell {
     width: calc((90vh - 2px) / 9);
     height: calc((90vh - 2px) / 9);
   }
   
   .sudoku-board-row {
     width: 90vh;
     font-size: calc(100vh / 22);
   }
 }
</style>

<script setup>
 import { reactive, computed } from 'vue'
 import Sudoku from '@/sudoku/Sudoku';
 import SudokuHints from '@/sudoku/SudokuHints';

 const props = defineProps({
   original: {required: true},
   sudoku: {required: true},
   selected: {required: false, default: -1},
   mistakes: {required: false, default: new Set()},
   highlight: {required: false, default: -1},
   hints: {required: false, default: new SudokuHints()},
 })

 const emit = defineEmits(['select']);

 const size = computed(() => { return props.sudoku?.size || 9 });

 function is_original(index) {
   return props.original.board[index] != 0;
 }

 function is_empty(index) {
   return props.sudoku.board[index] == 0;
 }

 function calculate_cell_class(index) {
   // Return a class string for a given cell index
   let res = [
     'generic-sudoku-board-cell',
     'sudoku-board-cell'
   ];

   // cell-[block-number]
   res.push('cell-' + props.sudoku.index_to_block(index));

   // cell-[state]
   if (props.selected == index)
     res.push('cell-selected');
   else if (is_empty(index))
     res.push('cell-empty');
   else if (is_original(index))
     res.push('cell-original');
   else
     res.push('cell-normal');

   // Selected cell
   if (props.highlight == props.sudoku.board[index]
       || (props.sudoku.board[index] <= 0
            && props.hints.cell_hints(index).has(props.highlight)))
     res.push('cell-highlight');

   console.log('SudokuBoard', index);
   return res.join(' ');
 }

 function calculate_text_class(index) {
   // Returns a class string for a given cell text index
   let res = [];

   // Transparent text
   if (is_empty(index))
     res.push('trans-text');

   // Mistakes
   if (props.mistakes.has(index))
     res.push('mistake-text');

   return res.join(' ');
 }

 function select_cell(index) {
   if (!is_original(index))
     emit('select', index);
 }
</script>
