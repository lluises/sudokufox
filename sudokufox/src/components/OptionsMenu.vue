<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in state.items"
        :key="i"
        @click="goto(item.goto)"
      >

        <template v-slot:append>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>

      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
 import { reactive, computed } from 'vue'
 import { useRouter, useRoute } from 'vue-router'
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const router = useRouter();

 const state = reactive({
   items: [
     { title: t('Home'), icon: 'mdi-home', goto: 'home' },
     { title: t('Settings'), icon: 'mdi-cog-outline', goto: 'settings' },
     { title: t('About'), icon: 'mdi-information-outline', goto: 'about' },
   ],
 });

 function goto(place) {
   router.push({name: place});
 }
</script>

<i18n lang="yaml">
ca:
  Home: "Inici"
  Settings: "Preferències"
  About: "Detalls"

es:
  Home: "Inicio"
  Settings: "Ajustes"
  About: "Detalles"
</i18n>
