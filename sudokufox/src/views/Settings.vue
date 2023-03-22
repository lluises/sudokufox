<template>
  <div>
    <v-list lines="three">
      <v-list-subheader v-t="'Sudoku collections'"></v-list-subheader>

      <v-list-item @click="import_sudokus">
        <v-list-item-title v-t="'Import sudokus'"></v-list-item-title>

        <v-list-item-subtitle v-t="'Import sudokus description'"></v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list lines="three">
      <v-list-subheader v-t="'Apperence'"></v-list-subheader>

      <v-list-item @click="apperence_popup.open()">
        <template v-slot:prepend="{ isActive }">
          <v-container><v-row no-gutters align="center" justify="center">
            <v-icon>mdi-palette</v-icon>
          </v-row></v-container>
        </template>
        <v-list-item-title v-t="'Application theme'"></v-list-item-title>
        <v-list-item-subtitle>
          {{ t(settings.theme) }}
        </v-list-item-subtitle>
        <SelectPopup
          cancelable
          ref="apperence_popup"
          :items="state.themes_list"
          :selected="settings.theme"
          @select="set_theme"
        />
      </v-list-item>

      <v-list-item @click="languages_popup.open()">
        <template v-slot:prepend="{ isActive }">
          <v-container><v-row no-gutters align="center" justify="center">
            <v-icon>mdi-translate</v-icon>
          </v-row></v-container>
        </template>
        <v-list-item-title v-t="'Language'"></v-list-item-title>
        <v-list-item-subtitle>
          {{ t(settings.language) }}
        </v-list-item-subtitle>
        <SelectPopup
          cancelable
          ref="languages_popup"
          :items="state.language_list"
          :selected="settings.language"
          @select="set_language"
        />
      </v-list-item>

      <v-list-item
        @click="settings_toggle('show_timer')"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action>
            <v-checkbox-btn :model-value="settings.show_timer" color="primary"/>
          </v-list-item-action>
        </template>
        <v-list-item-title v-t="'Show timer'"></v-list-item-title>
        <v-list-item-subtitle v-t="'Show timer description'"></v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        @click="settings_toggle('show_board_preview')"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action>
            <v-checkbox-btn :model-value="settings.show_board_preview" color="primary"/>
          </v-list-item-action>
        </template>
        <v-list-item-title v-t="'Show sudoku previews'"></v-list-item-title>
        <v-list-item-subtitle v-t="'Show sudoku previews description'"></v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list lines="three">
      <v-list-subheader v-t="'Behaviour'"></v-list-subheader>

      <v-list-item
        @click="settings_toggle('highlight_numbers')"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action>
            <v-checkbox-btn :model-value="settings.highlight_numbers" color="primary"/>
          </v-list-item-action>
        </template>
        <v-list-item-title v-t="'Highlight selected number'"></v-list-item-title>
        <v-list-item-subtitle v-t="'Highlight selected number description'"></v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        @click="settings_toggle('show_mistakes')"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action>
            <v-checkbox-btn :model-value="settings.show_mistakes" color="primary"/>
          </v-list-item-action>
        </template>
        <v-list-item-title v-t="'Highlight obvious mistakes'"></v-list-item-title>
        <v-list-item-subtitle v-t="'Highlight obvious mistakes description'"></v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list lines="three">
      <v-list-subheader v-t="'Foxes'"></v-list-subheader>

      <v-list-item
        @click="confirm_likes_foxes.open()"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="settings.likes_foxes" color="primary"/>
          </v-list-item-action>
        </template>
        <v-list-item-title>
          {{ t(settings.likes_foxes ? "Likes foxes" : "Dislikes foxes") }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ t((settings.likes_foxes?"L":"Disl")+'ikes foxes description') }}
        </v-list-item-subtitle>
        <ConfirmDialog
          ref="confirm_likes_foxes"
          persistent
          :title="t('confirm_likes_foxes title')"
          :message="t('confirm_likes_foxes message')"
          :cancel_text="t('confirm_likes_foxes dislike')"
          :confirm_text="t('confirm_likes_foxes like')"
          @cancel="set_likes_foxes(false)"
          @confirm="set_likes_foxes(true)"
        />
      </v-list-item>
    </v-list>
    
    <v-divider></v-divider>

    <v-list lines="three">
      <v-list-subheader v-t="'Advanced'"></v-list-subheader>

      <v-list-item @click="confirm_sudokus_reset.open()">
        <v-list-item-title v-t="'Reset all sudokus'"></v-list-item-title>
        <v-list-item-subtitle v-t="'Reset all sudokus description'"></v-list-item-subtitle>
        <ConfirmDialog
          ref="confirm_sudokus_reset"
          :title="t('confirm_sudokus_reset title')"
          :message="t('confirm_sudokus_reset message')"
          :cancel_text="t('confirm_sudokus_reset cancel')"
          :confirm_text="t('confirm_sudokus_reset confirm')"
          @confirm="reset_all_sudokus"
        />
      </v-list-item>

      <v-list-item @click="confirm_nuke.open()">
        <v-list-item-title v-t="'Destroy all data'"></v-list-item-title>
        <v-list-item-subtitle v-t="'Destroy all data description'"></v-list-item-subtitle>
        <ConfirmDialog
          ref="confirm_nuke"
          :title="t('confirm_nuke title')"
          :message="t('confirm_nuke message')"
          :cancel_text="t('confirm_nuke cancel')"
          :confirm_text="t('confirm_nuke confirm')"
          @confirm="nuke_all"
        />
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
 import { ref, nextTick, reactive, computed, onMounted } from 'vue'
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import InputDialog from '@/components/InputDialog';
 import ConfirmDialog from '@/components/ConfirmDialog';
 import SelectPopup from '@/components/SelectPopup';
 import Themes from '@/themes';
 import { useRouter, useRoute } from 'vue-router'
 import { useSettingsStore } from '@/store/settings';
 import { useI18n } from 'vue-i18n'

 const { t, locale, availableLocales } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const settings = useSettingsStore();
 const router   = useRouter();

 const state = reactive({
   // Data
   themes_list: Object.keys(Themes).map(k => ({title: t(k), value: k})),
   language_list: availableLocales.map(v => ({title: t(v), value: v})),
 });

 const apperence_popup = ref(null);
 const languages_popup = ref(null);
 const confirm_likes_foxes = ref(null);
 const confirm_sudokus_reset = ref(null);
 const confirm_nuke = ref(null);

 function import_sudokus() {
   router.push({name: 'import_collection'});
 }

 function settings_toggle(key) {
   console.log('settings_toggle(', key, ')');
   settings.set_property(key, !settings[key]);
 }

 function set_likes_foxes(value) {
   if (!value)
     console.log("Sad news. This user dislikes foxes :(");
   settings.set_property('likes_foxes', !!value);
 }

 function set_theme(name) {
   settings.set_property('theme', name);
 }

 function set_language(code) {
   settings.set_property('language', code);
 }

 function reset_all_sudokus() {
   console.warn('Reset all sudokus. User has requested it');
   SudokuDatabase.reset_all_sudokus();
 }

 function nuke_all() {
   console.warn('NUKE all data. User has requested it');
   SudokuDatabase.nuke();
 }
</script>

<i18n lang="yaml">
  # <pre> Hack my IDE to stop miss-identing this section
en:
  en: English
  es: Spanish
  ca: Catalan
  Import sudokus description: "Import any sudokufox or opensudoku collection"
  light: Sudoku Fox
  dark: Sudoku Fox night
  purple: "Purple"
  teal: "Teal"
  blue_light: "Blue day"
  blue_dark: "Blue night"
  grey_dark: "Grey night"
  Show timer description: "Show the timer when you are working on a sudoku"
  Show sudoku previews description: "Show sudoku previews in the selection screen. It impacts performance on the collections screen"
  Highlight selected number description: "Highlight the cells with the selected keypad number on the board"
  Highlight obvious mistakes description: "Highlight incompatible numbers when an obvious mistake is made"
  Likes foxes: "I like foxes"
  Dislikes foxes: "You don't like foxes :("
  Likes foxes description: "They are so cute"
  Dislikes foxes description: "Foxes are amazing, you don't deserve this checkbox"
  confirm_likes_foxes title: "Do you like foxes?"
  confirm_likes_foxes message: "Say yes, or else I will dislike you"
  confirm_likes_foxes like: "Yes! I love them"
  confirm_likes_foxes dislike: "Dislike :("
  Reset all sudokus description: "Reset all sudokus state"
  confirm_sudokus_reset title: "Reset ALL sudokus"
  confirm_sudokus_reset message: "Do you wish to reset all your puzzles state? This operation is NOT reversible"
  confirm_sudokus_reset cancel: "Cancel"
  confirm_sudokus_reset confirm: "Reset puzzles"
  Destroy all data description: "Reset all the sudokus, settings and data that the app stored."
  confirm_nuke title: "ALERT! Destroy all data"
  confirm_nuke message: "Do you really wish to destroy all the data from this application? This is operation is NOT reversible"
  confirm_nuke cancel: "Cancel"
  confirm_nuke confirm: "Destroy it all"

ca:
  en: Anglès
  es: Castellà
  ca: Català
  Import sudokus: "Importar sudokus"
  Import sudokus description: "Importar qualsevol col·lecció de sudokufox o opensudoku"
  Sudoku collections: "Col·lecció de sudokus"
  Apperence: "Aparença"
  Application theme: "Tema de l'aplicació"
  light: Sudoku Fox
  dark: Sudoku Fox noctur
  purple: "Lila"
  teal: "Turquesa"
  blue_light: "Blau diurn"
  blue_dark: "Blau nocturn"
  grey_dark: "Gris nocturn"
  Language: "Idioma"
  Show timer: "Mostrar cronòmetre"
  Show timer description: "Mostrar el cronòmetre mentres realitzes un sudoku"
  Show sudoku previews: "Mostra miniatures de sudokus"
  Show sudoku previews description: "Mostra les miniatures dels sudokus a la pantalla de selecció. Pot afectar al rendiment."
  Highlight selected number: "Destaca el nombre seleccionat"
  Highlight selected number description: "Destaca les cel·les del sudoku que contenguin el nombre seleccionat"
  Behaviour: "Comportament"
  Highlight obvious mistakes: "Destaca falls evidents"
  Highlight obvious mistakes description: "Destaca els falls més evidents, com repetits a una columna"
  Foxes: Guineus
  Likes foxes: "T'agraden les guineus"
  Dislikes foxes: "No t'agraden les guineus :("
  Likes foxes description: "Son una monada ^.^"
  Dislikes foxes description: "Les guineus son fabuloses, no et mereixes aquesta casella"
  confirm_likes_foxes title: "T'agraden les guineus?"
  confirm_likes_foxes message: "Respon que si, o hem cauràs malament"
  confirm_likes_foxes like: "Sí! M'encanten"
  confirm_likes_foxes dislike: "No m'agraden :("
  Advanced: "Avançat"
  Reset all sudokus: "Restablir tots els sudokus"
  Reset all sudokus description: "Restablir l'estat de tots els sudokus"
  confirm_sudokus_reset title: "Restablir TOTS els sudokus"
  confirm_sudokus_reset message: "Estas segur/a de voler restablir l'estat de tots els sudokus? Aquesta operació NO es pot desfer"
  confirm_sudokus_reset cancel: "Cancel·lar"
  confirm_sudokus_reset confirm: "Restablir sudokus"
  Destroy all data: "Destruir totes les dades"
  Destroy all data description: "Restablir tots els sudouks, les preferències i dades que es tenen emmagatzemades"
  confirm_nuke title: "ALERTA! Destrucció de dades"
  confirm_nuke message: "Realment estas segur/a de voler destruir totes les dades? Aquesta operació NO es pot desfer"
  confirm_nuke cancel: "Cancel·lar"
  confirm_nuke confirm: "Destruir tot"

es:
  en: Inglés
  es: Castellano
  ca: Catalan
  Import sudokus: "Importar sudokus"
  Import sudokus description: "Importar qualquier colección de sudokufox o opensudoku"
  Sudoku collections: "Colección de sudokus"
  Apperence: "Apariencia"
  Application theme: "Temas de la aplicación"
  light: Sudoku Fox
  dark: Sudoku Fox nocturno
  purple: "Lila"
  teal: "Turquesa"
  blue_light: "Azul diurno"
  blue_dark: "Azul nocturno"
  grey_dark: "Gris nocturno"
  Language: "Idioma"
  Show timer: "Mostrar cronómetro"
  Show timer description: "Muestra el cronómetro mientras realizes un sudoku"
  Show sudoku previews: "Muestra miniaturas de sudokus"
  Show sudoku previews description: "Muestra las miniaturas de los sudokus en la pantalla de selección. Puede afectar al rendimiento."
  Highlight selected number: "Destaca el número seleccionado"
  Highlight selected number description: "Destaca las celdas del sudoku que contengan el número seleccionado"
  Behaviour: "Comportamiento"
  Highlight obvious mistakes: "Destaca fallos obvios"
  Highlight obvious mistakes description: "Destaca los fallos más evidentes, como repetidos en una misma columna"
  Foxes: Zorros
  Likes foxes: "Te gustan los zorros"
  Dislikes foxes: "No te gustan los zorros :("
  Likes foxes description: "Son una monada ^.^"
  Dislikes foxes description: "Los zorros son fabulosos, no te merezes esta casilla"
  confirm_likes_foxes title: "¿Te gustan los zorros?"
  confirm_likes_foxes message: "Responde que si, o me caeras mal"
  confirm_likes_foxes like: "¡Sí! Me encantan"
  confirm_likes_foxes dislike: "No me gustan :("
  Advanced: "Avanzado"
  Reset all sudokus: "Restablecer todos los sudokus"
  Reset all sudokus description: "Restablecer el estado de todos los sudokus"
  confirm_sudokus_reset title: "Restablecer TODOS los sudokus"
  confirm_sudokus_reset message: "¿Estas seguro/a de querer restablecer el estado de todos los sudokus? Esta operación NO es reversible"
  confirm_sudokus_reset cancel: "Cancelar"
  confirm_sudokus_reset confirm: "Restablecer sudokus"
  Destroy all data: "Destruir todos los datos"
  Destroy all data description: "Restablecer todos los sudokus, las preferencias y los datos almacenados"
  confirm_nuke title: "¡CUIDADO! Destrucción de datos"
  confirm_nuke message: "¿Realmente estas segura/o de querer destruir todos los datos? Esta operación NO es reversible."
  confirm_nuke cancel: "Cancelar"
  confirm_nuke confirm: "Destruir todo"
</i18n>
