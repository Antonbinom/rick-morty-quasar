import {defineStore} from "pinia";
import {ref} from "vue";
export const useRouteStore = defineStore("route", () => {
  const name = ref('');
  const setRouteName = (value) => name.value = value;

  return {
    name,
    setRouteName
  }
});
