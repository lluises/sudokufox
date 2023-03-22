<!--
     <SelectPopup
       :cancelable='false'
       :items='[]'
       :selected='value'
       @select="(value) => {...}"
       @cancel="() => {...}"
     />

     Methods:
       open(items) // items: [{title: 'hola', value: 2}]"
-->

<!--
     TODO: Highlight selected element
-->

<template>
  <v-dialog
    v-model="state.dialog"
    :persistent="!props.cancelable"
    scrollable
    class="select-popup-dialog"
  >
    <v-list lines="two">

      <v-list-item
        v-for="item in state.items"
        active-color="primary"
        :active="item.value == props.selected"
        @click="select_item(item)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-dialog>
</template>

<style>
 .select-popup-dialog {
   max-width: 30em;
 }
</style>

<script setup>
 import { ref, nextTick, reactive, computed, onMounted } from 'vue'

 const props = defineProps({
   cancelable: {type: Boolean, required: false, default: false},
   items: {type: Array, required: false, default: []},
   selected: {required: false, default: undefined},
 });

 const emit = defineEmits([
   'select',
   'cancel'
 ]);

 const state = reactive({
   dialog: false,
   items: [],
 });

 function open(items) {
   state.items = items || props.items || [];
   state.dialog = true;
 }

 function select_item(item) {
   const val = item.value || item;
   state.dialog = false;
   emit('select', val);
 }

 defineExpose({
   open,
 });
</script>
