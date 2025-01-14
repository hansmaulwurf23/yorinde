<script setup>
import TheScoreCard from "@/components/TheScoreCard.vue";
import TheDiceInput from "@/components/TheDiceInput.vue";
import TheError from "@/components/TheError.vue";
import TheControls from "@/components/TheControls.vue";
import TheRandomDiceInput from "@/components/TheRandomDiceInput.vue";
import {useBoardStore} from "@/stores/scoreBoard.js";

const store = useBoardStore()
</script>

<template>
  <main>
    <TheError />
    <div id="appContainer">
      <TheDiceInput v-if="!store.rollingMode" />
      <TheRandomDiceInput v-if="store.rollingMode" />
      <TheScoreCard />
      <TheControls />
    </div>
  </main>
</template>

<style scoped>
#appContainer {
  display: flex;
  flex-direction: column;
}
</style>
