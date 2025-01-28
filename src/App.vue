<script setup>
import TheScoreCard from "@/components/TheScoreCard.vue";
import TheDiceInput from "@/components/TheDiceInput.vue";
import TheError from "@/components/TheError.vue";
import TheControls from "@/components/TheControls.vue";
import TheRandomDiceInput from "@/components/TheRandomDiceInput.vue";
import {useBoardStore} from "@/stores/scoreBoard.js";
import TheHighScores from "@/components/TheHighScores.vue";
import {ref} from "vue";
import TheHelp from "@/components/TheHelp.vue";
import TheSettings from "@/components/TheSettings.vue";

const highScoreVisible = ref(false)
const helpVisible = ref(false)
const settingsVisible = ref(false)
const store = useBoardStore()

document.documentElement.setAttribute('data-bs-theme', store.darkTheme ? 'dark': 'light');
</script>

<template>
  <main>
    <TheError />
    <div id="appContainer">
      <TheDiceInput v-if="!store.rollingMode" />
      <TheRandomDiceInput v-if="store.rollingMode" />
      <TheScoreCard />
      <TheControls
        @show-highscore="highScoreVisible = true"
        @show-help="helpVisible = true"
        @show-settings="settingsVisible = true" />
      <TheHighScores v-if="highScoreVisible" @close="highScoreVisible = false" />
      <TheHelp v-if="helpVisible" @close="helpVisible = false" />
      <TheSettings v-if="settingsVisible" @close="settingsVisible = false" />
    </div>
  </main>
</template>

<style scoped>
#appContainer {
  display: flex;
  flex-direction: column;
}
</style>
