import {defineStore} from "pinia";

export const useRouteStore = defineStore("route", {
  state: () => ({
    name: '',
  }),
  actions: {
    setRouteName(value) {
      this.name = value;
    },
  },
});
