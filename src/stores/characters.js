import {defineStore} from "pinia";
import {ref} from "vue";
import {api, URL} from 'src/boot/axios';


export const useCharactersStore = defineStore("characters", () => {

  // states
  const characters = ref([]);
  const singleCharacter = ref('');
  const currentPage = ref('');
  const nextPage = ref('');
  const pages = ref('');
  const name = ref('');
  const status = ref({label: '', value: ''});
  const loading = ref(true);

  // actions

  const fetchCharacters = async (url) => {
    try {
      const {data} = await api.get(url);
      characters.value = [...characters.value, ...data.results];
      pages.value = data.info.pages;
      currentPage.value = +url.replace(/[^\d]/g, "");
      if (data.info.next !== null) {
        nextPage.value = data.info.next;
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

  const fetchCardsOnScroll = async (index, done) => {
    try {
      if (!characters.value.length) {
        const {data, request} = await api.get(`${URL}character`)
        characters.value = data.results;
        nextPage.value = data.info.next;
        currentPage.value = request.responseURL;
      } else {
        if (currentPage.value === pages.value) {
          return;
        } else {
          fetchCharacters(
            `${nextPage.value}&name=${name.value}&status=${status.value.value}`
          );
        }
      }
    } catch (error) {
      throw new Error(error.message)
    }
    done();
  };

  const fetchFilteredCards = async () => {
    try {
      const {data} = await api
        .get(`${URL}character/?name=${name.value}&status=${status.value.value}`)
      characters.value = data.results
      nextPage.value = data.info.next
      pages.value = data.info.pages
      if (data.info.next !== null) {
        currentPage.value = +data.info.next.replace(/[^\d]/g, "") - 1
      }
      loading.value = true
    } catch (error) {
      loading.value = false
      throw new Error(error.message)
    }
  };

  const setSingleCharacter = async (id) => {
    try {
      const {data} = await api.get(`${URL}character/${id}`)
      singleCharacter.value = data;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const setName = (value) => name.value = value;
  const setStatus = (value) => status.value = value;

  return {
    characters,
    singleCharacter,
    currentPage,
    nextPage,
    pages,
    name,
    status,
    loading,
    setName,
    setStatus,
    setSingleCharacter,
    fetchFilteredCards,
    fetchCardsOnScroll,
  }
});
