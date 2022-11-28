import {useCharactersStore} from "../stores/characters";
import {api, URL} from '../boot/axios';

const store = useCharactersStore();

const useGetCards = (index, done) => {
  const getCharacters = (url) => {
    api.get(url).then((response) => {
      const characters = store.characters;
      store.setCharacters([...characters, ...response.data.results]);
      store.setPages(response.data.info.pages);
      store.setCurrentPage(+url.replace(/[^\d]/g, ""));
      if (response.data.info.next !== null) {
        store.setNextPage(response.data.info.next);
      }
    });
  };

  if (!store.characters.length) {
    api.get(`${URL}character`).then((response) => {
      store.setCharacters(response.data.results);
      store.setNextPage(response.data.info.next);
      store.setCurrentPage(response.request.responseURL);
    });
  } else {
    if (store.currentPage === store.pages) {
      return;
    } else {
      getCharacters(
        `${store.nextPage}&name=${store.name}&status=${store.status.value}`
      );
    }
  }
  done();
};

export default useGetCards;
