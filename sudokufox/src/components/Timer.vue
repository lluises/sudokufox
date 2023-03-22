<template>
  <div>
    {{ pretty_time }}
  </div>
</template>

<script setup>
 import { reactive, computed, watch, onMounted, onUnmounted } from 'vue'
 import { useTimerStore } from '@/store/timer';
 import time_utils from '@/utils/time';

 const timer = useTimerStore();
 window.timer = timer;

 let interval = null;

 const state = reactive({
   seconds: 0,
 });

 onMounted(() => {
   interval = setInterval(() => update_seconds(), 1000);
 });

 onUnmounted(() => {
   if (interval)
     clearInterval(interval);
 });

 const pretty_time = computed(() => time_utils.pretty_time(state.seconds));

 function update_seconds() {
   state.seconds = timer.seconds();
 }

 // Update when timer state changes
 watch((() => timer.is_active), update_seconds);
</script>
