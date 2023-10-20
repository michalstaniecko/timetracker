import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    dateTimeFormat: 'YYYY.MM.DD HH:mm:ss'
  }),
  getters: {
    getDateTimeFormat: ({ dateTimeFormat }) => dateTimeFormat
  },
  actions: {}
});
