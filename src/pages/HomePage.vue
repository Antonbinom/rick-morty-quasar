<template>
  <main class="cards">
    <q-infinite-scroll
      @load="useGetCards"
      class="cards__list"
      v-if="store.loading"
    >
      <CardComponent
        v-for="character in store.characters"
        :key="character.id"
        :character="character"
      />
    </q-infinite-scroll>
    <div v-if="!store.loading" class="empty">Ничего не найдено!</div>
  </main>
</template>

<script setup>
import CardComponent from "../components/CardComponent.vue";
import useGetCards from "../hooks/useGetCards";
import useSearch from "../hooks/useSearch";
import useGetCharacters from "../hooks/useGetCharacters";
import { useCharactersStore } from "../stores/characters";

const store = useCharactersStore();
</script>
