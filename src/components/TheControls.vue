<script setup>
import {mdiRestart, mdiUndo, mdiWeb, mdiHelpCircleOutline, mdiDiceMultiple, mdiHandFrontRightOutline, mdiVacuum} from '@mdi/js'
import {useBoardStore} from "@/stores/scoreBoard.js";
import SvgIcon from "vue3-icon"
import labels from "../labels.js";
import {ref} from "vue";
const store = useBoardStore()
const helpShown = ref(false)

function clearStorage() {
  if (confirm('Soll der lokale Speicher wirklich geleert werden?')) {
    localStorage.clear();
  }
}
</script>

<template>
  <div class="controlsContainer m-3">
    <button class="squarebtn btn-light m-1" @click="store.newGame()">
      <svg-icon type="mdi" :path="mdiRestart"></svg-icon>
    </button>
    <button class="squarebtn btn-light m-1" @click="store.undo()">
      <svg-icon type="mdi" :path="mdiUndo"></svg-icon>
    </button>
    <button class="squarebtn btn-light m-1" @click="store.toggleLocale()">
      <svg-icon type="mdi" :path="mdiWeb"></svg-icon>
    </button>
    <button class="squarebtn btn-light m-1" @click="store.rollingMode = !store.rollingMode">
      <svg-icon type="mdi" :path="store.rollingMode ? mdiHandFrontRightOutline : mdiDiceMultiple"></svg-icon>
    </button>
    <button class="squarebtn btn-light m-1" @click="helpShown = true">
      <svg-icon type="mdi" :path="mdiHelpCircleOutline"></svg-icon>
    </button>
    <button class="squarebtn btn-light m-1" @click="clearStorage()">
      <svg-icon type="mdi" :path="mdiVacuum"></svg-icon>
    </button>
  </div>

  <div id="helpBox" class="card position-absolute p-3" @click="helpShown = false"
       :class="{'disnone': !helpShown}">
    <svg-icon type="mdi" :path="mdiHelpCircleOutline" size="64"></svg-icon>
    <p class="mt-3">{{ labels[store.currentLocale].help }}</p>
  </div>
</template>

<style scoped>
.disnone {
  display: none;
}

.controlsContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#helpBox {
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
}
</style>
