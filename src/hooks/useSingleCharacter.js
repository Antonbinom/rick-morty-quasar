import {api, URL} from '../boot/axios';
import {useCharactersStore} from "../stores/characters";

const store = useCharactersStore();

const useSingleCharacter = async function (id) {
  const {data} = await api.get(`${URL}character/${id}`)
  store.setSingleCharacter(data)
}

export default useSingleCharacter;
