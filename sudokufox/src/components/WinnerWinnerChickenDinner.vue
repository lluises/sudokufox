<!--
     <WinnerWinnerChickenDinner
       :time="miliseconds"
       :date="new Date()"
     />
-->

<template>
  <v-container class="winner-image" fluid>
    <v-row no-gutters class="fill-height" align="center" justify="center">

      <!-- Data -->
      <v-col class="ma-1 text-left winner-text">
        <div class="text-h3 mb-3" v-t="'Solved'"></div>
        <div class="text-h4">{{ pretty_time }}</div>
        <div class="text-h5"><span>{{ pretty_date }}</span></div>
      </v-col>

      <!-- Fox -->
      <!-- <v-col class="ma-1">
           <img
           class="winner-image"
           src="/img/winner.png"
           />
           </v-col>
      -->
    </v-row>
  </v-container>
</template>

<style>
 @use '@/styles/main';

 .winner-image {
   height: 15em;
   background-image: url("/img/winner.png");
   background-repeat: no-repeat;
   background-position: right center;
   background-size: contain;
 }

 .winner-text {
   text-shadow: 2px 2px 2px white;
 }
</style>

<script setup>
 import { reactive, computed, watch, onMounted, onUnmounted } from 'vue'
 import SudokuBoard from '@/components/SudokuBoard';
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import time_utils from '@/utils/time';
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const props = defineProps({
   time: Number,
   date: Date,
 });

 const pretty_time = computed(() => time_utils.suffix_time(Math.floor(props.time/1000)));

 const pretty_date = computed(() => time_utils.pretty_date(props.date));
</script>

<i18n lang="yaml">
ca:
  Solved: "Resolt"
</i18n>
