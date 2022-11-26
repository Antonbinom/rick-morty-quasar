<template>
  <q-layout>
    <header-component class="fixed-top" style="z-index: 10" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";
export default defineComponent({
  components: { HeaderComponent },
  name: "App",
});
</script>
