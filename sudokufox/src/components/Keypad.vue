<!--
     <Keypad
       :selected='0'
       :hinting='false'
       @fire="(key) => console.log('Fire ' + key)"
     />
-->

<template>
  <v-container class="fill-height ma-0 pa-0 no-selection">
    <v-row v-for="c in 3" no-gutters class="ma-0 pa-0">

      <!-- Numbers -->
      <v-col class="ma-1" v-for="i in 3">
        <v-sheet
          rounded
          v-ripple
          @click="fire(9 - 3*c + i)"
          :class="(9-3*c+i) == selected ? 'keypad-selected' : 'keypad-normal'"
        >
          <v-container class="fill-height">
            <v-col class="text-center text-h6 pt-2 pb-2">
              {{ 9 - 3*c + i }}
            </v-col>
          </v-container>
        </v-sheet>
      </v-col>

      <!-- Misc undo -->
      <v-col class="ma-1" v-if="c == 1">
        <v-sheet
          rounded
          v-ripple
          @click="fire('undo')"
          class="keypad-normal"
        >
          <v-container class="fill-height">
            <v-col class="text-center text-h6 pt-2 pb-2">
              <v-icon>mdi-undo</v-icon>
            </v-col>
          </v-container>
        </v-sheet>
      </v-col>

      <!-- Misc clear -->
      <v-col class="ma-1" v-if="c == 2">
        <v-sheet
          rounded
          v-ripple
          @click="fire('clear')"
          :class="selected == 0 ? 'selected-clear' : 'keypad-normal'"
        >
          <v-container class="fill-height">
            <v-col class="text-center text-h6 pt-2 pb-2">
              <v-icon>mdi-backspace</v-icon>
            </v-col>
          </v-container>
        </v-sheet>
      </v-col>

      <!-- Misc hinting -->
      <v-col class="ma-1" v-if="c == 3">
        <v-sheet
          rounded
          v-ripple
          @click="fire('hinting')"
          :class="hinting ? 'selected-hinting' : 'keypad-normal'"
        >
          <v-container class="fill-height">
            <v-col class="text-center text-h6 pt-2 pb-2">
              <v-icon>mdi-format-subscript</v-icon>
            </v-col>
          </v-container>
        </v-sheet>
      </v-col>

    </v-row>
  </v-container>
</template>

<style>
 @use '@/styles/main';

 .keypad-normal {
   background-color: rgb(var(--v-theme-secondary)) !important;
 }

 .keypad-selected {
   background-color: rgb(var(--v-theme-sudoku-highlight)) !important;
 }

 .selected-clear {
   background-color: rgb(var(--v-theme-sudoku-highlight)) !important;
 }

 .selected-hinting {
   background-color: rgb(var(--v-theme-sudoku-highlight)) !important;
 }
</style>

<script setup>
 import SudokuBoard from '@/components/SudokuBoard';
 import SudokuDatabase from '@/sudoku/SudokuDatabase';

 const props = defineProps({
   selected: {},
   hinting: Boolean,
 })

 const emit = defineEmits(['fire']);
 
 function fire(key) {
   emit('fire', key);
 }
</script>
