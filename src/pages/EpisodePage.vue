<template>
  <main class="absolute-center q-pa-xl bg-orange" v-if="store.episode">
    <div class="flex justify-between items-center q-mb-lg">
      <h1 class="text-h3">{{ store.episode.name }}</h1>
      <div class="text-h5">
        Release date: <b>{{ store.episode.air_date }}</b>
      </div>
    </div>
    <q-list class="row flex-wrap justify-center">
      <q-item
        class="episode__item col-12 col-sm-5 col-md-4 col-lg-2"
        v-for="character in store.episodeCharacters"
        :key="character.id"
      >
        <router-link
          class="episode__item-link"
          :to="`/character/${character.id}`"
        >
          <img class="episode__item-image" :src="character.image" />
          <div class="episode__item-name">{{ character.name }}</div>
        </router-link>
      </q-item>
    </q-list>
  </main>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useEpisodeStore } from "src/stores/episode";

const store = useEpisodeStore();
const useSetCharacters = store.setCharacters();

onBeforeMount(() => useSetCharacters);
</script>

<style scoped lang="scss">
main {
  margin-top: 70px;
}
</style>
