<!--
     <ConfirmDialog
       title="Foxes"
       message="Do you like foxes?"
       cancel_text="No :("
       confirm_text="Yes ♥"
       meta="an_id_or_whatever"
       @confirm="(meta) => ..."
       @cancel="(meta) => ..."
     />

     Methods:
       open({title, message, cancel_text, confirm_text, meta})
       close()
-->

<template>
  <v-dialog v-model="state.dialog" :persistent="props.persistent">
    <v-responsive align="center">
      <v-card class="dialog-confirm-cont">
        <v-card-title>
          {{ state.title }}
        </v-card-title>

        <v-card-text>
          {{ state.message }}
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="cancel()">
            {{ state.cancel_text }}
          </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="confirm()">
            {{ state.confirm_text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-responsive>
  </v-dialog>
</template>

<style>
 .dialog-confirm-cont {
   width: 22em;
 }
</style>

<script setup>
 import { reactive } from 'vue'
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const emit = defineEmits([
   'confirm',
   'cancel',
 ]);

 const props = defineProps({
   title: {required: false, default: 'No title'},
   message: {required: false, default: 'No message'},
   cancel_text: {required: false, default: 'Cancel'},
   confirm_text: {required: false, default: 'Confirm'},
   meta: {required: false, default: null},
   persistent: {required: false, default: false},
 });

 const state = reactive({
   title: '',
   message: '',
   cancel_text: '',
   confirm_text: '',
   dialog: false,
 });

 function open({title, message, cancel_text, confirm_text, meta} = {}) {
   state.title        = title        || props.title;
   state.message      = message      || props.message;
   state.cancel_text  = cancel_text  || t(props.cancel_text);
   state.confirm_text = confirm_text || t(props.confirm_text);
   state.meta         = meta         || props.meta;
   state.dialog       = true;
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
   emit('confirm', state.meta);
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
