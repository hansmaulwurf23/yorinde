<script setup>
import {mdiRestart, mdiUndo, mdiWeb, mdiHelpCircleOutline, mdiDiceMultiple, mdiHandFrontRightOutline,
  mdiVacuum, mdiToggleSwitchVariantOff, mdiCloseBoxOutline} from '@mdi/js'
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
  <div class="controlsContainer mx-2 mt-2" :style="{order: store.controllsSwitched ? 1 : 3}">
    <button class="squarebtn btn-light" @click="store.newGame()">
      <svg-icon type="mdi" size="36" :path="mdiRestart"></svg-icon>
    </button>
    <button class="squarebtn btn-light" @click="store.undo()">
      <svg-icon type="mdi" size="36" :path="mdiUndo"></svg-icon>
    </button>
    <button class="squarebtn btn-light" @click="store.toggleLocale()">
      <svg-icon type="mdi" size="36" :path="mdiWeb"></svg-icon>
    </button>
    <button class="squarebtn btn-light" @click="store.rollingMode = !store.rollingMode">
      <svg-icon type="mdi" size="36" :path="store.rollingMode ? mdiHandFrontRightOutline : mdiDiceMultiple"></svg-icon>
    </button>
    <button class="squarebtn btn-light" @click="helpShown = true">
      <svg-icon type="mdi" size="36" :path="mdiHelpCircleOutline"></svg-icon>
    </button>
    <button class="squarebtn btn-light" @click="store.controllsSwitched = !store.controllsSwitched">
      <svg-icon type="mdi" size="36" :path="mdiToggleSwitchVariantOff" :style="{transform: store.controllsSwitched ? 'rotate(180deg)': 'rotate(0)'}"></svg-icon>
    </button>
  </div>

  <div id="helpBox" class="card position-absolute p-3"
       :class="{'disnone': !helpShown}">
    <h4>Hilfe</h4>
    <svg-icon @click="helpShown = false" type="mdi" :path="mdiCloseBoxOutline" size="32" class="position-absolute" style="right: 10px"></svg-icon>
    <p class="mt-3" style="max-height: 70%; overflow: scroll">{{ labels[store.currentLocale].help }}</p>
    <p><button class="squarebtn btn-light m-1" @click="clearStorage()">
      <svg-icon type="mdi" :path="mdiVacuum"></svg-icon>
    </button></p>
    <div style="display: flex; flex-direction: row">
      <label for="player" class="w-50">Spielername:</label>
      <input id="player" class="w-50" v-model="store.playerName" type="text" placeholder="Player name" />
    </div>
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
  justify-content: space-between;
}

#helpBox {
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
}
</style>
