<template>
  <main class="cards">
    <div class="container">
      <div class="cards__filter">
        <input
          @input="onSearch()"
          v-model="name"
          id="filter"
          class="cards-search"
          type="text"
          placeholder="Введите имя персонажа"
        />
        <select @change="onSort()" v-model="status" class="cards-select">
          <option value="dead">Dead</option>
          <option value="alive">Alive</option>
          <option value="unknown">Unknown</option>
          <option value="">All</option>
        </select>
      </div>

      <ul class="cards__list" v-if="loading">
        <CardComponent
          v-for="character in store.characters"
          :key="character.id"
          :character="character"
        />
        <!-- <div v-observe-visibility="handleInfinityScroll"></div> -->
      </ul>
      <div v-if="!loading" class="empty">Ничего не найдено!</div>
    </div>
  </main>
</template>

<script setup>
import CardComponent from "../components/CardComponent.vue";
import { api } from "../boot/axios";
import { debounce } from "debounce";
import { useCharactersStore } from "../stores/characters";
import { onMounted, computed, ref } from "vue";

const store = useCharactersStore();
const nextPage = ref("");
const currentPage = ref("");
const pages = ref("");
const status = ref("");
const name = ref("");
const loading = ref(true);

onMounted(() => {
  api.get("https://rickandmortyapi.com/api/character").then((response) => {
    store.setCharacters(response.data.results);
    nextPage.value = response.data.info.next;
    currentPage.value = response.request.responseURL;
  });
});

const handleInfinityScroll = (isVisible) => {
  if (!isVisible) return;
  const getCharacters = (url) => {
    axios.get(url).then((response) => {
      const characters = store.getCharacters();
      store.setCharacters([...characters, ...response.data.results]);
      pages.value = response.data.info.pages;
      currentPage.value = +url.replace(/[^\d]/g, "");
      if (response.data.info.next !== null) {
        nextPage.value = response.data.info.next;
      }
    });
  };
  if (currentPage.value === pages.value) {
    return;
  } else {
    getCharacters(
      `${nextPage.value}&name=${name.value}&status=${status.value}`
    );
  }
};

const onSearch = () => {
  debounce(function () {
    onSort();
  }, 500);
};
const onSort = () => {
  api
    .get(
      `https://rickandmortyapi.com/api/character/?name=${name.value}&status=${status.value}`
    )
    .then((response) => {
      store.setCharacters(response.data.results);
      nextPage.value = response.data.info.next;
      pages.value = response.data.info.pages;
      if (response.data.info.next !== null) {
        currentPage.value = +response.data.info.next.replace(/[^\d]/g, "") - 1;
      }
      loading.value = true;
    })
    .catch((error) => {
      console.log(error.message);
      loading.value = false;
    });
};
// mounted() {
//   axios.get("https://rickandmortyapi.com/api/character").then((response) => {
//     this.$store.dispatch("setCharacters", response.data.results);
//     this.nextPage = response.data.info.next;
//     this.currentPage = response.request.responseURL;
//   });
// },
</script>
