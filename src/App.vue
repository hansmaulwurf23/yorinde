<script setup>
import TheScoreCard from "@/components/TheScoreCard.vue";
import TheDiceInput from "@/components/TheDiceInput.vue";
import TheError from "@/components/TheError.vue";
import TheControls from "@/components/TheControls.vue";
</script>

<template>
  <main>
    <TheError />
    <TheDiceInput />
    <TheScoreCard />
    <TheControls />
  </main>
</template>

<style scoped>
</style>
