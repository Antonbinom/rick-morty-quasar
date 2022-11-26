<template>
  <!-- <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card> -->
  <q-card class="my-card bg-orange-10 q-pa-md">
    <router-link class="text-h5" :to="`/character/${character.id}`">{{
      character.name
    }}</router-link>
    <img
      class="cards__item-image"
      :src="character.image"
      :alt="character.name"
    />
    <div class="cards__item-info">
      <span class="cards__item-text">Species: {{ character.species }}</span>
      <span class="cards__item-text"
        >Location: {{ character.location.name }}</span
      >
    </div>
    <div class="cards__item-episodes">
      <h3>Episodes</h3>
      <ul class="cards__item-list" v-if="episodes">
        <li v-for="episode in episodes" :key="episode.air_date">
          <router-link :to="`/episode/${episode.id}`">
            Ep. {{ episode.id }} - {{ episode.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api, URL } from "../boot/axios";

const prop = defineProps(["character"]);
const episodes = ref(null);

onMounted(() => {
  episodes.value = prop.character.episode
    .map((item) => item.replace(`${URL}episode/`, ""))
    .slice(0, 5)
    .join();

  api
    .get(`${URL}episode/${episodes.value}`)
    .then((response) => {
      if (response.data.constructor.name == "Array") {
        episodes.value = response.data;
      } else episodes.value = [response.data];
    })
    .catch((error) => console.log(error.message));
});
</script>
