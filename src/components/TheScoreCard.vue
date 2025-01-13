<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import labels from "../labels.js";

const store = useBoardStore()
</script>

<template>
  <div class="m-3">
    <div class="flexContainer">
    <div v-for="(v, i) in store.points" @click="store.setPoints(i)" @contextmenu="store.setPoints(i, true)"
          :class="{'border-secondary': [5, 12].includes(i)}"
        class="border border-dark rounded-2 m-1 p-1">
        <div :class="{'text-secondary': store.points[i] !== null}">
          {{ labels[store.currentLocale].board[i] }}
        </div>
        <div class="text-end fw-bold bottom-100 fs-1">{{ v }}</div>
    </div>
    </div>
    <div >{{ labels[store.currentLocale].sum }}: <b>{{ store.summarizePoints() }}</b></div>
  </div>
</template>

<style scoped>
.flexContainer {
  display: flex;
  flex-wrap: wrap;

}

.flexContainer>div {
  flex-grow: 1;
  width: 30%;
  height: 5rem;
}
</style>
