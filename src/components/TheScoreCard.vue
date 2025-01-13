<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import labels from "../labels.js";

const store = useBoardStore()
</script>

<template>
  <div class="m-3">
    <div class="progress" role="progressbar" style="height: 2rem" :aria-valuenow="store.points.slice(0, 6).reduce((s, v) => s + v, 0)" aria-valuemin="0" aria-valuemax="63">
      <div class="progress-bar bg-success" style="opacity: .7"
           :style="{width: (store.points.slice(0, 6).reduce((s, v) => s + v, 0)) / 63 * 100 + '%'}  "></div>
    </div>
      <div style="margin-top: -2rem; opacity: .9" class="fs-2 w-100 fw-bold text-center">Bonus: {{ store.points.slice(0, 6).reduce((s, v) => s + v, 0) }} / 63</div>
    <div class="flexContainer">
    <div v-for="(v, i) in store.points" @click="store.setPoints(i)" @contextmenu="store.setPoints(i, true)"
        class="border border-dark rounded-2 m-1 p-1">
        <div :class="store.points[i] !== null ? 'text-secondary': 'fw-bold'">
          {{ labels[store.currentLocale].board[i] }}
        </div>
        <div class="pvals bottom-100"
          :style="{ opacity: store.points[i] !== null ? 1 : .2}">{{ v !== null ? v : (store.validators[i]() ? store.rewards[i]() : 0) }}</div>
    </div>
    </div>
    <div class="fs-2">{{ labels[store.currentLocale].sum }}: <b>{{ store.summarizePoints() }}</b></div>

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

.pvals {
  text-align: right;
  font-weight: bold;
  font-size: 2.7rem;
  line-height: 3rem;
}
</style>
