<template>
  <main class="absolute-center q-pa-lg bg-orange" v-if="store.singleCharacter">
    <h4 class="text-weight-bold q-mt-sm q-mb-lg">
      {{ store.singleCharacter.name }}
    </h4>
    <q-img
      :src="store.singleCharacter.image"
      :alt="store.singleCharacter.name"
    />
    <div class="column q-mt-md text-subtitle2 text-weight-medium">
      <span>Species: {{ store.singleCharacter.species }}</span>
      <span>Location: {{ store.singleCharacter.location.name }}</span>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useCharactersStore } from "src/stores/characters";
import { useRoute } from "vue-router";

const { params } = useRoute();

const store = useCharactersStore();
const setCharacter = store.setSingleCharacter(params.id);

onBeforeMount(() => setCharacter);
</script>
