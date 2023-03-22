<!--
     <SudokuPreviewBoard
       :sudoku="Sudoku()"
     />
-->

<template>
  <div v-if="!!props.sudoku" class="generic-sudoku-board preview-sudoku-board">
    <div class="preview-sudoku-board-row" v-for="r in size">
      <div
        :class="calculate_cell_class((size*(r-1))+c-1)" v-for="c in size"
      >
        <span class="preview-text">
          {{ props.sudoku.board[(size * (r - 1)) + c - 1] }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
 @import "@/styles/sudoku_board.scss";

 .preview-sudoku-board {
   width: 12em;
 }

 .preview-sudoku-board-row {
   width: 12em;
 }

 .preview-text {
   color: transparent;
   font-size: 1em;
 }

 .preview-sudoku-board-cell {
   width: calc((12em - 2px) / 9);
   height: calc((12em - 2px) / 9);
 }
</style>

<script setup>
 import { reactive, computed } from 'vue'
 import Sudoku from '@/sudoku/Sudoku';

 const props = defineProps({
   original: Sudoku,
   sudoku: Sudoku,
   show_mistakes: Boolean,
   is_solved: Boolean,
 });

 const size = computed(() => props.sudoku?.size || 9);

 const mistakes = computed(() => {
   if (!props.show_mistakes)
     return new Set();
   return props.sudoku.detect_mistakes();
 });

 function is_empty(index) {
   return props.sudoku.board[index] == 0;
 }

 function calculate_cell_class(index) {
   // Return a class string for a given cell index
   let res = ['generic-sudoku-board-cell', 'preview-sudoku-board-cell'];

   // cell-[block-number]
   res.push('cell-' + props.sudoku.index_to_block(index));

   // cell-[state]
   if (is_empty(index))
     res.push('cell-empty');
   else if (mistakes.value.has(index))
     res.push('cell-error');
   else if (props.original.board[index] == props.sudoku.board[index])
     res.push('cell-original');
   else
     res.push('cell-filled');

   return res.join(' ');
 }
</script>
