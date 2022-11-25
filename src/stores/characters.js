import {defineStore} from 'pinia';

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
  }),
  getters: {
    getCharacters: (state) => state.characters
  },
  actions: {
    setCharacters(data) {
      this.characters = data;
    },
  },
});
