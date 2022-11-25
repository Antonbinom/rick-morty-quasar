<template>
  <div class="episode__wrapper" v-if="episode">
    <div class="episode__card">
      <h1 class="episode-title">{{ episode.name }}</h1>
      <span class="episode-date">Release date: {{ episode.air_date }}</span>
      <div class="episode__characters">
        <ul class="episode__list">
          <li
            class="episode__item"
            v-for="character in characters"
            :key="character.id"
          >
            <router-link
              class="episode__item-link"
              :to="`/character/${character.id}`"
            >
              <img class="episode__item-image" :src="character.image" />
              <div class="episode__item-name">{{ character.name }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "../boot/axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const episode = ref(null);
const characters = ref("");

onMounted(() => {
  api
    .get(`https://rickandmortyapi.com/api/episode/${route.params.id}`)
    .then((response) => {
      episode.value = response.data;
      let charactersId = episode.value.characters
        .map((item) =>
          item.replace("https://rickandmortyapi.com/api/character/", "")
        )
        .join();

      api
        .get(`https://rickandmortyapi.com/api/character/${charactersId}`)
        .then((response) => {
          characters.value = response.data;
        });
    })
    .catch((error) => console.log(error.message));
});
</script>
