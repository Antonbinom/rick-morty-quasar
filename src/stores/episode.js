import {defineStore} from "pinia";
import {ref} from 'vue';
import {api, URL} from 'src/boot/axios';
import {useRoute} from "vue-router";

export const useEpisodeStore = defineStore("episode", () => {
  const episode = ref(null);
  const episodeCharacters = ref('');

  const setCharacters = async function () {
    const {params} = useRoute();
    const {data} = await api.get(`${URL}episode/${params.id}`);
    episode.value = data;
    let charactersId = await episode.value.characters
      .map((item) => item.replace(`${URL}character/`, ""))
      .join();
    const characters = await api.get(`${URL}character/${charactersId}`);
    episodeCharacters.value = characters.data;
  };

  return {
    episode,
    episodeCharacters,
    setCharacters
  }
})
