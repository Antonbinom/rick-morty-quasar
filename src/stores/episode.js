import {defineStore} from "pinia";

export const useEpisodeStore = defineStore("episode", {
  state: () => ({
    episode: null,
    episodeCharacters: '',
  }),
  actions: {
    setCharacters(data) {
      this.episodeCharacters = data;
    },
    setEpisode(value) {
      this.episode = value;
    },
  },
});
