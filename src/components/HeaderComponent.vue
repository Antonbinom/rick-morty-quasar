<template>
  <q-header class="bg-cyan">
    <div class="row q-px-xl q-py-lg justify-between items-center">
      <router-link @click="resetSearch" class="col-1 text-red-1" to="/">
        <q-img alt="Quasar logo " src="~assets/logo.svg" style="width: 70px" />
      </router-link>
      <div
        v-if="routeStore.name === 'home'"
        class="sticky justify-end row col-10 col-lg-8"
      >
        <q-input
          v-model="store.name"
          @update:model-value="onSearch"
          debounce="500"
          class="col-8 col-sm-5 q-mr-sm-lg q-mb-md q-mb-sm-none"
          placeholder="Введите имя"
          filled
        />
        <q-select
          v-model="store.status"
          @update:model-value="onSearch"
          :options="options"
          class="col-8 col-sm-5"
          filled
          label="Статус персонажа"
        />
      </div>
    </div>
  </q-header>
</template>

<script setup>
import { useCharactersStore } from "src/stores/characters";
import { useRouteStore } from "src/stores/route";

const store = useCharactersStore();
const routeStore = useRouteStore();
const onSearch = store.fetchFilteredCards;

const options = [
  { label: "Dead", value: "dead" },
  { label: "Alive", value: "alive" },
  { label: "Unknown", value: "unknown" },
  { label: "All", value: "" },
];

const resetSearch = () => {
  if (routeStore.name === "home") {
    store.setName("");
    store.setStatus({ label: "", value: "" });
  }
  onSearch();
};
</script>
