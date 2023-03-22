// Composables
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Main from '@/layouts/default/Main.vue';
import Home from '@/views/Home.vue';
import SelectCollection from '@/views/SelectCollection.vue';
import Sudoku from '@/views/Sudoku.vue';
import About from '@/views/About.vue';
import Settings from '@/views/Settings.vue';
import ImportCollection from '@/views/ImportCollection.vue';

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'collection/:colid',
        name: 'collection',
        component: SelectCollection,
      },
      {
        path: 'sudoku/:sudoid',
        name: 'sudoku',
        component: Sudoku,
      },
      {
        path: 'about',
        name: 'about',
        component: About,
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings,
      },
      {
        path: 'settings/import',
        name: 'import_collection',
        component: ImportCollection,
      },
    ],
  },
];

const router = createRouter({
  // history: (process.env.IS_ELECTRON ?
  //           createWebHashHistory(process.env.BASE_URL)
  //           : createWebHistory(process.env.BASE_URL)),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
