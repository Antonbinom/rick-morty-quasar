<template>
  <main class="absolute-center q-pa-lg bg-orange" v-if="store.singleCharacter">
    <h4 class="text-weight-bold q-mt-sm q-mb-lg">
      {{ store.singleCharacter.name }}
    </h4>
    <img :src="store.singleCharacter.image" :alt="store.singleCharacter.name" />
    <div class="q-mt-md text-subtitle2 text-weight-medium">
      <div>Species: {{ store.singleCharacter.species }}</div>
      <div>Location: {{ store.singleCharacter.location.name }}</div>
    </div>
  </main>
</template>

<script setup>
import { api, URL } from "../boot/axios";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useCharactersStore } from "src/stores/characters";
import useSingleCharacter from "src/hooks/useSingleCharacter";

const store = useCharactersStore();
const route = useRoute();
const getCharacter = useSingleCharacter(route.params.id);

onBeforeMount(() => getCharacter);
</script>
