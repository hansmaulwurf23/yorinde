<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import {mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6, mdiDiceMultiple} from '@mdi/js';
import SvgIcon from "vue3-icon"
import {ref, watch} from "vue";
import labels from "@/labels.js";
const diceIcons = [null, mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6];

const store = useBoardStore()
const fixedDices = ref(new Array(5).fill(false))
const rollCount = ref(0)

watch(store.points, () => { reset() })

function toggleDiceFixed(i) {
  fixedDices.value[i] = !fixedDices.value[i];
}

function reset() {
  for (let i = 0; i < fixedDices.value.length; i++) {
    fixedDices.value[i] = false;
  }
  rollCount.value = 0;
}

function rollDices() {
  if (rollCount.value >= 3) {
    store.setError(labels[store.currentLocale].alreadyRolledThrice);
    return false;
  }

  let notfixed = [];
  for (let i = 0; i < store.rolledDices.length; i++) {
    if (!fixedDices.value[i]) {
      notfixed.push(i);
    }
  }

  let randoms = getRandoms(notfixed.length);
  notfixed.forEach((di, ri) => {
    store.rolledDices[di] = randoms[ri];
  });
  rollCount.value++;
}

function getRandoms(count) {
  let res = new Array(count);
  for (let i = 0; i < count; i++) {
    res[i] = Math.floor(Math.random() * 6 + 1);
  }
  return res;
}
</script>

<template>
  <div id="diceInputContainer" class="mt-2 mx-2">
    <div v-for="(v, i) in 5">
      <button class="squarebtn m-1" :class="{'text-danger': fixedDices[i]}"
              @click="toggleDiceFixed(i)">
        <svg-icon type="mdi" size="48" :path="diceIcons[store.rolledDices[i] != null ? store.rolledDices[i] : 1]"></svg-icon>
      </button>
    </div>
    <div>
      <button class="squarebtn m-1" @click="rollDices()">
        <svg-icon type="mdi" size="48" :path="mdiDiceMultiple"></svg-icon>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
