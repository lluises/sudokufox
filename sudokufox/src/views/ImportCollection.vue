<template>
  <div>
    <v-container><v-row no-gutters align="center" justify="center">
      <v-file-input label="File input" @change="upload_file"></v-file-input>
    </v-row></v-container>

    <v-divider></v-divider>

    <v-list lines="three">
      <v-list-subheader v-t="'Compatible sources'"></v-list-subheader>

      <v-list-item>
        <template v-slot:prepend="{ isActive }">
          <v-container><v-row no-gutters align="center" justify="center">
            <img src="img/logo.png" style="width: 48px; height: 48px" />
          </v-row></v-container>
        </template>
        <v-list-item-title v-t="'Sudoku Fox'"></v-list-item-title>
        <v-list-item-subtitle>
          This feature will come someday in the future
        </v-list-item-subtitle>
      </v-list-item>

      <a href="https://opensudoku.moire.org/" target="_blank">
        <v-list-item>
          <template v-slot:prepend="{ isActive }">
            <v-container><v-row no-gutters align="center" justify="center">
              <img src="img/opensudoku.png" style="width: 48px; height: 48px" />
            </v-row></v-container>
          </template>
          <v-list-item-title v-t="'Open Sudoku'"></v-list-item-title>
          <v-list-item-subtitle>
            https://opensudoku.moire.org/
          </v-list-item-subtitle>
        </v-list-item>
      </a>

      <a href="http://www.sudocue.net/" target="_blank">
        <v-list-item>
          <template v-slot:prepend="{ isActive }">
            <v-container><v-row no-gutters align="center" justify="center">
              <img src="img/sudocue.png" style="width: 48px; height: 48px" />
            </v-row></v-container>
          </template>
          <v-list-item-title v-t="'SudoCue'"></v-list-item-title>
          <v-list-item-subtitle>
            http://www.sudocue.net/
          </v-list-item-subtitle>
        </v-list-item>
      </a>
    </v-list>

    <!-- Confirm dialog -->
    <ConfirmDialog
      ref="confirm_dialog"
      @confirm="post_confirmation_action"
    />
  </div>
</template>

<script setup>
 import { ref, nextTick, reactive, computed, onMounted } from 'vue'
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import SudokuParser from '@/sudoku/SudokuParser';
 import InputDialog from '@/components/InputDialog';
 import SelectPopup from '@/components/SelectPopup';
 import ConfirmDialog from '@/components/ConfirmDialog';
 import Themes from '@/themes';
 import { useRouter, useRoute } from 'vue-router'
 import { useSettingsStore } from '@/store/settings';
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const router   = useRouter();
 const settings = useSettingsStore();

 const confirm_dialog = ref('confirm_dialog');

 const state = reactive({
 });

 const apperence_popup = ref(null);
 const languages_popup = ref(null);
 const confirm_likes_foxes = ref(null);
 const confirm_sudokus_reset = ref(null);
 const confirm_nuke = ref(null);

 function upload_file(event) {
   const input = event.target;

   if (!input)
     return;

   const fr = new FileReader();
   fr.onload = () => {
     const raw_text = fr.result;
     let parser;
     try {
       parser = SudokuParser.parse_opensudoku(raw_text);
       parser.save();

       confirm_dialog.value.open({
         title: t("confirm_dialog title ok"),
         message: t("confirm_dialog message ok", {name: parser.metadata.name}),
         meta: 'ok',
       });

     } catch (err) {
       console.log("err", ""+err);
       confirm_dialog.value.open({
         title: t("confirm_dialog title error"),
         message: t("confirm_dialog message error", {error: ""+err}),
         meta: 'error',
       });
     }
   }
   fr.readAsText(input.files[0]);
 }

 function post_confirmation_action(state) {
   if (state == 'ok')
     router.go(-1);
 }

</script>

<i18n lang="yaml">
  # <pre> Hack my IDE to stop miss-identing this section

en:
  confirm_dialog title ok: "Sudokus imported"
  confirm_dialog message ok: "The collection \"{name}\" has been imported."
  confirm_dialog title error: "Failed import"
  confirm_dialog message error: "{error}"

ca:
  confirm_dialog title ok: "Sudokus importats"
  confirm_dialog message ok: "La col·lecció \"{name}\" ha estat importada."
  confirm_dialog title error: "Error d'importació"
  confirm_dialog message error: "{error}"

es:
  confirm_dialog title ok: "Sudokus importados"
  confirm_dialog message ok: "La colección \"{name}\" ha sido importada."
  confirm_dialog title error: "Error de importación"
  confirm_dialog message error: "{error}"
</i18n>
