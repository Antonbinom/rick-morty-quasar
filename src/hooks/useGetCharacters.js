import {api, URL} from '../boot/axios';
import {useEpisodeStore} from "../stores/episode";

const store = useEpisodeStore();
const useGetCharacters = async function (id) {
  const {data} = await api.get(`${URL}episode/${id}`);
  store.setEpisode(data);
  let charactersId = await store.episode.characters
    .map((item) => item.replace(`${URL}character/`, ""))
    .join();
  const characters = await api.get(`${URL}character/${charactersId}`);
  store.setCharacters(characters.data);
};

export default useGetCharacters;
