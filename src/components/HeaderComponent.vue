<template>
  <header class="bg-blue">
    <div class="row q-px-xl q-py-lg justify-between items-center">
      <router-link class="col-1 text-red-1" to="/">
        <img alt="Quasar logo " src="~assets/logo.svg" style="width: 70px" />
      </router-link>
      <div class="sticky row col-5">
        <q-input
          v-model="store.name"
          @input="useSearch"
          :dense="dense"
          class="col-5"
          placeholder="Введите имя"
          filled
        />
        <q-select
          v-model="store.status"
          @input="useSearch"
          :options="options"
          class="col-5"
          filled
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCharactersStore } from "src/stores/characters";
// import useSearch from "src/hooks/useSearch";

const store = useCharactersStore();

const options = [
  // { label: "Dead", value: "dead" },
  // { label: "Alive", value: "alive" },
  // { label: "Unknown", value: "unknown" },
  // { label: "All", value: "" },
  "Dead",
  "Alive",
  "Unknown",
  "All",
];
</script>
