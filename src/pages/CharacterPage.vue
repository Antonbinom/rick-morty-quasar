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
import { onBeforeMount } from "vue";
import { useCharactersStore } from "src/stores/characters";

const store = useCharactersStore();
const setCharacter = store.setSingleCharacter();

onBeforeMount(() => setCharacter);
</script>
