<template>
  <main>
    <q-infinite-scroll
      @load="fetchCards"
      class="row justify-center"
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
import { onBeforeMount, onUnmounted } from "vue-demi";
import { useRoute } from "vue-router";
import CardComponent from "src/components/CardComponent.vue";
import { useCharactersStore } from "src/stores/characters";
import { useRouteStore } from "src/stores/route";

const store = useCharactersStore();
const routeStore = useRouteStore();

const fetchCards = store.fetchCardsOnScroll;

onBeforeMount(() => {
  const route = useRoute();
  routeStore.setRouteName(route.name);
});

onUnmounted(() => {
  const route = useRoute();
  routeStore.setRouteName(route.name);
});
</script>

<style scoped lang="scss">
main {
  margin-top: 170px;
}
</style>
