<template>
  <q-card
    class="col-10 col-sm-5 col-md-3 col-lg-3 q-pa-lg q-mx-sm q-mb-md bg-orange"
  >
    <router-link
      class="inline-block text-h4 text-weight-bold q-mb-lg"
      :to="`/character/${character.id}`"
      >{{ character.name }}</router-link
    >
    <img :src="character.image" :alt="character.name" />
    <div class="q-mt-md">
      <div class="block text-subtitle1 text-weight-medium">
        Species: {{ character.species }}
      </div>
      <div class="block text-subtitle1 text-weight-medium">
        Location: {{ character.location.name }}
      </div>
    </div>
    <div class="q-card-section">
      <hr />
      <h5 class="q-my-md text-weight-bold">Episodes</h5>
      <q-list class="text-subtitle2 text-weight-medium" v-if="episodes">
        <q-item
          dense
          class="no-padding"
          v-for="episode in episodes"
          :key="episode.air_date"
        >
          <router-link :to="`/episode/${episode.id}`">
            Ep. {{ episode.id }} - {{ episode.name }}
          </router-link>
        </q-item>
      </q-list>
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
