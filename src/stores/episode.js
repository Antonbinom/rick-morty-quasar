import {defineStore} from "pinia";
import {ref} from 'vue';
import {api, URL} from 'src/boot/axios';

export const useEpisodeStore = defineStore("episode", () => {
  const episode = ref(null);
  const episodeCharacters = ref('');

  const setEpisode = async (id) => {
    try {
      const {data} = await api.get(`${URL}episode/${id}`);
      episode.value = data;
      let charactersId = episode.value.characters
        .map((item) => item.replace(`${URL}character/`, ""))
        .join();
      const characters = await api.get(`${URL}character/${charactersId}`);
      episodeCharacters.value = characters.data;
    } catch (error) {
      throw new Error(error.message)
    }
  };

  return {
    episode,
    episodeCharacters,
    setEpisode
  }
})
