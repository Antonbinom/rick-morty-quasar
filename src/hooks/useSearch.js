import {useCharactersStore} from "src/stores/characters";
import {api, URL} from 'src/boot/axios';

const store = useCharactersStore();
const useSearch = () => {
  api
    .get(`${URL}character/?name=${store.name}&status=${store.status}`)
    .then((response) => {
      store.setCharacters(response.data.results);
      store.setNextPage(response.data.info.next);
      store.setPages(response.data.info.pages);
      if (response.data.info.next !== null) {
        store.setCurrentPage(
          +response.data.info.next.replace(/[^\d]/g, "") - 1
        );
      }
      store.setLoading(true);
    })
    .catch((error) => {
      console.log(error.message);
      store.setLoading(false);
    });
};

export default useSearch;
