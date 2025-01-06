<script setup>
import {mdiRestart, mdiUndo, mdiWeb} from '@mdi/js'
import {useBoardStore} from "@/stores/scoreBoard.js";

const store = useBoardStore()
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
  </div>
</template>

<style scoped>
.controlsContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
