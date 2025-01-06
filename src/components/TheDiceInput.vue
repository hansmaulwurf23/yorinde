<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import {mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6} from '@mdi/js';

const store = useBoardStore()
const dices = [mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6];
</script>

<template>
  <div id="diceInputContainer" class="mt-2 mx-2">
    <div v-for="(v, i) in 6">
      <button class="squarebtn m-1"
              @click="store.addRolledDice(i)">
        <svg-icon type="mdi" size="48" :path="dices[i]"></svg-icon>
      </button>
      <span class="badge fs-5 bg-light"
            :class="[store.rolledDices[i] > 0 ? 'text-black' : 'text-secondary']">{{ store.rolledDices[i] }}</span>
    </div>
  </div>
</template>

<style scoped>
#diceInputContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#diceInputContainer div {
  text-align: center;
}
</style>
