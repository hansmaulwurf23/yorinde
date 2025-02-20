<script setup>
import {
  mdiRestart, mdiUndo, mdiHelpCircleOutline, mdiDiceMultiple, mdiHandFrontRightOutline,
  mdiPodium, mdiCog
} from '@mdi/js'
import {useBoardStore} from "@/stores/scoreBoard.js";
import SvgIcon from "vue3-icon"

const store = useBoardStore()
</script>

<template>
  <div class="controlsContainer mx-2 mt-2" :style="{order: store.controllsSwitched ? 1 : 3}">
    <button class="squarebtn" @click="store.newGame()">
      <svg-icon type="mdi" size="36" :path="mdiRestart"></svg-icon>
    </button>
    <button class="squarebtn" @click="store.undo()">
      <svg-icon type="mdi" size="36" :path="mdiUndo"></svg-icon>
    </button>
    <button class="squarebtn" @click="$emit('showHighscore')">
      <svg-icon type="mdi" size="36" :path="mdiPodium"></svg-icon>
    </button>
    <button class="squarebtn" @click="store.rollingMode = !store.rollingMode">
      <svg-icon type="mdi" size="36" :path="store.rollingMode ? mdiHandFrontRightOutline : mdiDiceMultiple"></svg-icon>
    </button>
    <button class="squarebtn" @click="$emit('showHelp')">
      <svg-icon type="mdi" size="36" :path="mdiHelpCircleOutline"></svg-icon>
    </button>
    <button class="squarebtn" @click="$emit('showSettings')">
      <svg-icon type="mdi" size="36" :path="mdiCog"></svg-icon>
    </button>
  </div>
</template>

<style scoped>
.controlsContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
