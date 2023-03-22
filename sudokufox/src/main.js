/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';
import i18n from '@/plugins/vue_i18n';

const app = createApp(App);
registerPlugins(app);
app.use(i18n);
app.mount('#app');


// DEBUG HACKS ////////////////////////////////////////////////////////////////
import '@/sudoku/testdata';
import Sudoku from '@/sudoku/Sudoku';
window.Sudoku = Sudoku;
import SudokuDatabase from '@/sudoku/SudokuDatabase';
window.SudokuDatabase = SudokuDatabase;
import SudokuHints from '@/sudoku/SudokuHints';
window.SudokuHints = SudokuHints;
import SudokuUndo from '@/sudoku/SudokuUndo';
window.SudokuUndo = SudokuUndo;
import Compressor from '@/utils/Compressor';
window.Compressor = Compressor;
window.app = app;
///////////////////////////////////////////////////////////////////////////////
