import { defineStore } from 'pinia';

export const useTimerStore = defineStore('counter', {
  state: () => ({
    _time_start: false,   // Date
    _time_accumulated: 0, // Miliseconds
  }),

  getters: {
    is_active(state) {
      return !!state._time_start;
    },
  },

  actions: {
    play() {
      if (!this.is_active)
        this._time_start = new Date();
    },

    pause() {
      if (this.is_active) {
        this._time_accumulated = this.miliseconds();
        this._time_start = false;
      }
    },

    reset() {
      this._time_accumulated = 0;
      this._time_start = false;
    },

    miliseconds() {
      // Returns the total elapsed miliseconds
      if (this.is_active)
        return this._time_accumulated + (new Date() - this._time_start);
      return this._time_accumulated;
    },

    seconds() {
      // Returns the total elapsed seconds
      return (this.miliseconds() / 1000) >> 0;
    },

    set_time(new_miliseconds) {
      this._time_accumulated = new_miliseconds;
      if (this.is_active)
        this._time_start = new Date();
    },
  },
});

