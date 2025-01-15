<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import labels from "../labels.js";
import {computed} from "vue";

const store = useBoardStore()

const numPips = computed(() =>  store.points.slice(0, 6).reduce((s, v) => s + v, 0))
const bonusPercentage = computed(() =>  numPips.value / 63 * 100)
const msgs = computed(() => labels[store.currentLocale])
</script>

<template>
  <div class="m-3" style="order: 2">
    <div class="progress" role="progressbar" style="height: 2rem"
         :aria-valuenow="numPips" aria-valuemin="0" aria-valuemax="63">
      <div class="progress-bar bg-success opacity-75"
           :style="{width: Math.min(100, bonusPercentage) + '%'}  "></div>

      <div style="position: absolute; margin-left: auto; left: 0; width: 100%; font-size: 1.35rem" class="opacity-75 fw-bold text-center">
        Bonus: {{ numPips }} / 63
      </div>
    </div>

    <div class="pointsContainer">
      <div v-for="(v, i) in store.points" @click="store.setPoints(i)" @contextmenu="store.setPoints(i, true)"
           class="border border-dark rounded-2 m-1 p-1" :class="store.points[i] !== null ? 'pointContainer': ''">
        <div class="pnames fw-bold" :class="store.points[i] === null ? 'opacity-25': ''">
          {{ msgs.board[i] }}
        </div>
        <div class="pvals"
             :class="store.points[i] !== null ? '' : 'opacity-25'">
          {{ v !== null ? v : (store.validators[i]() ? store.rewards[i]() : 0) }}
        </div>
      </div>
    </div>
    <div class="fs-2">{{ msgs.sum }}: <b>{{ store.summarizePoints() }}</b></div>

  </div>
</template>

<style scoped>
.pointsContainer {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
}

.pointsContainer > div {
  flex-grow: 1;
  width: 30%;
  height: 5rem;
}

.pnames {
  text-wrap: nowrap;
  overflow: hidden;
}

.pvals {
  text-align: right;
  font-weight: bold;
  font-size: 2.7rem;
  line-height: 3rem;
}

.pointContainer {
  animation: growAndFade 1s ease;
}

@keyframes growAndFade {
  0% {
    box-shadow: 0 0 0 rgba(255, 0, 0, 0); /* Kein Schatten am Anfang */
  }
  50% {
    box-shadow: 0 0 25px rgb(25, 135, 84); /* Schatten wächst und wird etwas transparent */
  }
  100% {
    box-shadow: 0 0 50px rgba(255, 0, 0, 0); /* Schatten ist groß und komplett transparent */
  }
}
</style>
