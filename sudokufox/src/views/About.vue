<template>
  <v-container class="fill-height">
    <v-row align="center">
      <v-col justify="center" class="about-logo-image-cont text-center">
        <img
          class="about-logo-image"
          :src="'/img/sudokufox' + (is_dark ? '-dark' : '') + '.png'"
        />
      </v-col>

      <v-col class="about-text-cont text-center">
        <div class="mb-2 text-h3">Sudoku Fox</div>
        <div class="mt-2 mb-4 text-body-1">
          <span v-t="'Version'"></span>
          <span>{{ ' ' + VersionInfo.version }}</span>
          (<span>{{ VersionInfo.date }}</span>)
        </div>

        <v-container class="about-credit-box mb-5">
          <v-row no-gutters class="about-credit-row">
            <v-col class="about-credit-title" v-t="'Created by'"></v-col>
            <v-col class="about-credit-name">
              <a href="https://github.com/lluises" target="_blank">LluisE</a>
            </v-col>
          </v-row>

          <v-row no-gutters class="about-credit-row">
            <v-col class="about-credit-title" v-t="'Art by'"></v-col>
            <v-col class="about-credit-name">
              <a target="_blank">[TODO]</a> <!-- TODO: Add artist link ‾\_(ツ)_/‾ -->
            </v-col>
          </v-row>
        </v-container>

        <div class="mb-2 text-h5">
          <span v-t="'Open source'"></span> <v-icon size="small">mdi-heart</v-icon>
        </div>

        <v-container class="about-credit-box mb-5">
          <v-row no-gutters class="about-credit-row">
            <v-col class="about-credit-title" v-t="'Source code'"></v-col>
            <v-col class="about-credit-name">
              <a href="https://github.com/lluises" target="_blank">GitHub</a>
            </v-col>
          </v-row>

          <v-row no-gutters class="about-credit-row">
            <v-col class="about-credit-title" v-t="'Report a bug'"></v-col>
            <v-col class="about-credit-name">
              <a href="https://github.com/lluises" target="_blank">Issuse tracker</a>
            </v-col>
          </v-row>
        </v-container>

        <div class="mb-2 text-h5" v-t="'Licenses'"></div>

        <v-container class="about-credit-box mb-5">
          <v-row no-gutters class="about-credit-row">
            <v-col class="about-credit-title" cols="5" v-t="'Source code'"></v-col>
            <v-col class="about-credit-name" cols="7">
              <a href="https://github.com/lluises" target="_blank">LluisE</a>
              ·
              <a href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank">Mozilla Public License 2.0</a>
            </v-col>
          </v-row>

          <v-row no-gutters class="about-credit-row">
            <v-col class="about-credit-title" cols="5" v-t="'Fox images'"></v-col>
            <v-col class="about-credit-name" cols="7">
              <a href="#" target="_blank">[TODO]</a> <!-- TODO: Artist link -->
              ·
              <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>
            </v-col>
          </v-row>

          <v-row no-gutters class="about-credit-row">
            <v-col class="about-credit-title" cols="5" v-t="'Icon set'"></v-col>
            <v-col class="about-credit-name" cols="7">
              <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
              ·
              <a href="https://github.com/Templarian/MaterialDesign/blob/master/LICENSE" target="_blank">Apache-2.0</a>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

    </v-row>
  </v-container>
</template>

<style>
 .about-logo-image-cont {
 }

 .about-logo-image {
   max-width: 70vw;
   max-height: 70vh;
 }

 .about-text-cont {
   min-width: 20em;
 }

 .about-credit-box {
   text-align: left;
 }

 .about-credit-row {
   /* width: 30em; */
 }

 .about-credit-title {
   font-size: 1.4em;
   /* min-width: 10em; */
   text-align: right;
   padding-right: .5em !important;
 }

 .about-credit-name {
   padding-left: .5em !important;
   font-size: 1.4em;
 }
</style>

<script setup>
 import VersionInfo from '@/version.js';
 import { useI18n } from 'vue-i18n'
 import { computed } from 'vue';
 import { useSettingsStore } from '@/store/settings';
 import Themes from '@/themes';

 const settings = useSettingsStore();

 const is_dark = computed(() => {
   return !!(Themes[settings.theme]?.dark);
 });

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });
</script>

<i18n lang="yaml">
  # <pre> Hack my IDE to stop miss-identing this section
en:
  Art by: "Amazing art by"

ca:
  Created by: "Creat per"
  Art by: "Dibuixos i art"
  Version: "Versió"
  Open source: "Software lliure"
  Source code: "Codi font"
  Report a bug: "Reporta falls"
  Fox images: "Dibuixos de guineus"
  Icon set: "Joc d'icones"
  Licenses: "Llicències"

es:
  Created by: "Creado por"
  Art by: "Dibujos y arte"
  Version: "Versión"
  Open source: "Software libre"
  Source code: "Codigo fuente"
  Report a bug: "Reportar fallos"
  Fox images: "Dibujos de zorros"
  Icon set: "Set de iconos"
  Licenses: "Licencias"
</i18n>
