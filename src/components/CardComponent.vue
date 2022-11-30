<template>
  <q-card
    class="col-10 col-sm-5 col-md-3 col-lg-3 q-pa-lg q-mx-sm q-mb-md bg-orange"
  >
    <router-link
      class="inline-block text-h4 text-weight-bold q-mb-lg"
      :to="`/character/${character.id}`"
      >{{ character.name }}</router-link
    >
    <q-img :src="character.image" :alt="character.name" />
    <div class="column q-mt-md">
      <span class="text-subtitle1 text-weight-medium">
        Species: {{ character.species }}
      </span>
      <span class="text-subtitle1 text-weight-medium">
        Location: {{ character.location.name }}
      </span>
    </div>
    <q-card-section class="q-card-section">
      <q-separator />
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
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useGetEpisodes } from "src/hooks/useGetEpisodes";

const prop = defineProps(["character"]);
const episodes = ref("");

onBeforeMount(() =>
  useGetEpisodes(prop.character.episode).then((data) => (episodes.value = data))
);
</script>
