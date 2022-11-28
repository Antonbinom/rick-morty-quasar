<template>
  <header class="bg-cyan">
    <div class="row q-px-xl q-py-lg justify-between items-center">
      <router-link @click="resetSearch" class="col-1 text-red-1" to="/">
        <img alt="Quasar logo " src="~assets/logo.svg" style="width: 70px" />
      </router-link>
      <div
        v-if="routeStore.name === 'home'"
        class="sticky justify-end row col-10 col-lg-8"
      >
        <q-input
          v-model="store.name"
          @update:model-value="useSearch"
          class="col-8 col-sm-5 q-mr-sm-lg q-mb-md q-mb-sm-none"
          placeholder="Введите имя"
          filled
        />
        <q-select
          v-model="store.status"
          @update:model-value="useSearch"
          :options="options"
          class="col-8 col-sm-5"
          filled
          label="Статус персонажа"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCharactersStore } from "src/stores/characters";
import { useRouteStore } from "src/stores/route";
import { api, URL } from "src/boot/axios";
import { useRoute } from "vue-router";

const store = useCharactersStore();
const routeStore = useRouteStore();

const options = [
  { label: "Dead", value: "dead" },
  { label: "Alive", value: "alive" },
  { label: "Unknown", value: "unknown" },
  { label: "All", value: "" },
];

const useSearch = () => {
  api
    .get(`${URL}character/?name=${store.name}&status=${store.status.value}`)
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
const resetSearch = () => {
  if (routeStore.name === "home")
    (store.name = ""), store.setStatus({ label: "", value: "" });
  useSearch();
};
</script>
