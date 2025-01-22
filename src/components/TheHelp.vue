<script setup>

import {mdiCloseBoxOutline, mdiVacuum, mdiWeb} from "@mdi/js";
import labels from "@/labels.js";
import SvgIcon from "vue3-icon";
import {useBoardStore} from "@/stores/scoreBoard.js";

const store = useBoardStore()

function clearStorage() {
  if (confirm('Soll der lokale Speicher wirklich geleert werden?')) {
    localStorage.clear();
  }
}
</script>

<template>
  <div id="helpBox" class="card position-absolute p-3">
    <h4>{{ labels[store.currentLocale].help }}</h4>
    <svg-icon @click="$emit('close')" type="mdi" :path="mdiCloseBoxOutline" size="32" class="position-absolute"
              style="right: 10px"></svg-icon>
    <div style="max-height: 80%; overflow: scroll;">
      <p class="mt-3">{{ labels[store.currentLocale].helpText }}</p>
      <p>
        <button class="squarebtn btn-light m-1" @click="clearStorage()">
          <svg-icon type="mdi" :path="mdiVacuum"></svg-icon>
        </button>
      </p>
    </div>
    <button class="squarebtn btn-light" @click="store.toggleLocale()">
      <svg-icon type="mdi" size="36" :path="mdiWeb"></svg-icon>
    </button>
    <div style="display: flex; flex-direction: row">
      <label for="player" class="w-50">Spielername:</label>
      <input id="player" class="w-50" v-model="store.playerName" type="text" placeholder="Player name"/>
    </div>
  </div>
</template>

<style scoped>
#helpBox {
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
}
</style>
