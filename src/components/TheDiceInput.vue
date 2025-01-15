<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import {mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6} from '@mdi/js';
import SvgIcon from "vue3-icon"
const store = useBoardStore()
const dices = [mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6];
</script>

<template>
  <div id="diceInputContainer" class="mt-2 mx-2" :style="{order: store.controllsSwitched ? 3 : 1}">
    <div v-for="(v, i) in 6">
      <button class="squarebtn"
              @click="store.addRolledDice(v)">
        <svg-icon type="mdi" size="56" :path="dices[i]"></svg-icon>
      </button>
      <span class="badge fs-5 bg-light"
            :class="[store.rolledDiceCounter[i] > 0 ? 'text-black' : 'text-secondary']">{{ store.rolledDiceCounter[i] }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>
