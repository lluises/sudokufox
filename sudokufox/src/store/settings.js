import { defineStore } from 'pinia';
import default_settings from '@/default_settings';
import SudokuDatabase from '@/sudoku/SudokuDatabase';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    ...default_settings,
  }),

  actions: {
    set_property(key, value) {
      this[key] = value;
      SudokuDatabase.edit_settings_property(key, value);
    },

    load_from_database() {
      for (const [key, value] of Object.entries(SudokuDatabase.get_settings()))
        this[key] = value;
    },

    reset() {
      for (const [key, value] of Object.entries(default_settings))
        this.set_property(key, value);
    },
  },
});
