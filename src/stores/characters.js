import {defineStore} from "pinia";

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    characters: [],
    currentPage: '',
    nextPage: '',
    pages: '',
    name: '',
    status: '',
    loading: true,
  }),
  getters: {
    getCharacters: (state) => state.characters,
  },
  actions: {
    setCharacters(data) {
      this.characters = data;
    },
    setNextPage(value) {
      this.nextPage = value;
    },
    setCurrentPage(value) {
      this.currentPage = value;
    },
    setPages(value) {
      this.pages = value;
    },
    setName(value) {
      this.name = value;
    },
    setStatus(value) {
      this.status = value;
    },
    setLoading(value) {
      this.loading = value;
    },
  },
  // persist: true
});
