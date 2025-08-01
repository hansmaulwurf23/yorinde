<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import labels from "../labels.js";
import {computed} from "vue";
import {mdiCircle, mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6, mdiDiceMultiple} from "@mdi/js";
import SvgIcon from "vue3-icon";
import {CHANCE, LARGESTR, SMALLSTR} from "@/constants.js";

const store = useBoardStore()

const numPips = computed(() =>  store.points.slice(0, 6).reduce((s, v) => s + v, 0))
const bonusPercentage = computed(() =>  numPips.value / 63 * 100)
const msgs = computed(() => store.kidsMode ? labels.intl : labels[store.currentLocale])
const diceIcons = [null, mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6];
</script>

<template>
  <div class="m-3" style="order: 2">
    <div class="progress" role="progressbar" style="height: 2rem"
         :aria-valuenow="numPips" aria-valuemin="0" aria-valuemax="63">
      <div class="progress-bar bg-success opacity-75"
           :style="{width: Math.min(100, bonusPercentage) + '%'}  "></div>

      <div id="extraPointsProgContainer" @click="store.extraPointsLeftMode = !store.extraPointsLeftMode"
           class="opacity-75 fw-bold text-center">
        Bonus: {{ store.extraPointsLeftMode ? (Math.min(0, numPips - 63)) : (numPips + ' / 63') }}
      </div>
    </div>

    <div class="pointsContainer">
      <div v-for="(v, i) in store.points" @click="store.setPoints(i)"
           class="pointContainer" :class="store.points[i] !== null ? 'setPoint': ''">
        <svg-icon type="mdi" class="avgIndicator" size="4" :path="mdiCircle" v-if="i <= 5 && v >= (i+1)*3"></svg-icon>
        <div class="pnames fw-bold" :class="store.points[i] === null ? 'opacity-25': ''">
          <template v-if="msgs.board[i]">
            {{ msgs.board[i] }}
          </template>
          <template v-else-if="i < 7">
            <svg-icon type="mdi" size="24" :path="diceIcons[i+1]"></svg-icon>
          </template>
          <template v-else-if="i === CHANCE">
            <svg-icon type="mdi" size="24" :path="mdiDiceMultiple"></svg-icon>
          </template>
          <template v-else-if="i === SMALLSTR">
            <svg-icon type="mdi" size="24" :path="mdiDice1"></svg-icon>
            <svg-icon type="mdi" size="24" :path="mdiDice2"></svg-icon>
            <svg-icon type="mdi" size="24" :path="mdiDice3"></svg-icon>
            <svg-icon type="mdi" size="24" :path="mdiDice4"></svg-icon>
          </template>
          <template v-else-if="i === LARGESTR">
            <svg-icon type="mdi" size="24" style="padding-left: -5px" :path="mdiDice1"></svg-icon>
            <svg-icon type="mdi" size="24" :path="mdiDice2"></svg-icon>
            <svg-icon type="mdi" size="24" :path="mdiDice3"></svg-icon>
            <svg-icon type="mdi" size="24" :path="mdiDice4"></svg-icon>
            <svg-icon type="mdi" size="24" :path="mdiDice5"></svg-icon>
          </template>


        </div>
        <div class="pvals"
             :class="store.points[i] !== null ? '' : 'opacity-25'">
          {{ v !== null ? v : (store.validators[i]() ? store.rewards[i]() : 0) }}
        </div>
      </div>
    </div>
    <div class="fs-2" @click="store.toggleDarkTheme()">{{ msgs.sum }}: <b>{{ store.summarizePoints() }}</b></div>

  </div>
</template>

<style scoped>
.avgIndicator {
  color: #198754;
  position: absolute;
  top: 4px;
  right: 4px;
}

#extraPointsProgContainer {
  position: absolute;
  margin-left: auto;
  left: 0;
  width: 100%;
  font-size: 1.35rem
}

.pointsContainer {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
}

.pointsContainer > div {
  flex-grow: 1;
  width: 30%;
  height: 5rem;
  position: relative;
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

.setPoint {
  animation: growAndFade 1s ease;
}

@keyframes growAndFade {
  0% {
    box-shadow: 0 0 0 rgba(25, 135, 84);
  }
  50% {
    box-shadow: 0 0 25px rgb(25, 135, 84);
  }
  100% {
    box-shadow: 0 0 50px rgba(25, 135, 84, 0);
  }
}
</style>
