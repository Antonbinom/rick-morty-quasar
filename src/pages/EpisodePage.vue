<template>
  <div class="episode__wrapper" v-if="store.episode">
    <div class="episode__card">
      <h1 class="episode-title">{{ store.episode.name }}</h1>
      <span class="episode-date"
        >Release date: {{ store.episode.air_date }}</span
      >
      <div class="episode__characters">
        <ul class="episode__list">
          <li
            class="episode__item"
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { useEpisodeStore } from "../stores/episode";
import useGetCharacters from "../hooks/useGetCharacters";

const store = useEpisodeStore();
const route = useRoute();

const getEpisode = useGetCharacters(route.params.id);

onBeforeMount(() => getEpisode);
</script>
