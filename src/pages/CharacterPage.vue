<template>
  <div class="character__wrapper" v-if="character">
    <div class="character__card">
      <h1 class="character-name">{{ character.name }}</h1>
      <img
        class="character-image"
        :src="character.image"
        :alt="character.name"
      />
      <div class="character__info">
        <span class="character-text">Species: {{ character.species }}</span>
        <span class="character-text"
          >Location: {{ character.location.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "../boot/axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const character = ref(null);

onMounted(() => {
  api
    .get(`https://rickandmortyapi.com/api/character/${route.params.id}`)
    .then((response) => {
      character.value = response.data;
    })
    .catch((error) => console.log(error.message));
});
</script>
