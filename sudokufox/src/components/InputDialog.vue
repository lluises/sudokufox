<!--
     <RenameDialog
       @confirm="(new_value, meta) => console.log(new_value)"
       @cancel="(meta) => console.log(new_value)"
     />

     Methods:
       open(value, meta)
       close()
-->

<template>
  <v-dialog v-model="state.dialog">
    <v-responsive align="center">
      <v-card class="dialog-input-cont">
        <v-text-field
          v-model="state.model"
          hide-details="auto"
          color="primary"
          ref="text_field"
        ></v-text-field>
        <v-card-actions>
          <v-btn color="primary" @click="cancel()" v-t="'Cancel'"></v-btn>
          <v-spacer />
          <v-btn color="primary" @click="confirm()" v-t="'Confirm'"></v-btn>
        </v-card-actions>
      </v-card>
    </v-responsive>
  </v-dialog>
</template>

<style>
 .dialog-input-cont {
   width: 22em;
 }
</style>

<script setup>
 import { ref, nextTick, reactive, computed, watch } from 'vue'
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const text_field = ref('text_field');

 const emit = defineEmits([
   'confirm',
   'cancel',
 ]);

 const state = reactive({
   model: '',
   dialog: false,
 });

 function open(value, meta) {
   state.model = value;
   state.meta = meta;
   state.dialog = true;
   nextTick(() => text_field.value.focus());
 }

 function close() {
   state.dialog = false;
 }

 function cancel() {
   close();
   emit('cancel', state.meta);
 }

 function confirm() {
   close();
   emit('confirm', state.model, state.meta);
 }

 defineExpose({
   open,
   close,
 });
</script>

<i18n lang="yaml">
ca:
  Cancel: "Cancel·lar"
  Confirm: "Confirmar"
</i18n>
