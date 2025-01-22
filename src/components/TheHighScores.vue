<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import {mdiCloseBoxOutline} from "@mdi/js";
import SvgIcon from "vue3-icon";

const dateFormat = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}
const store = useBoardStore()
</script>

<template>
  <div id="highscoreBox" class="card position-absolute p-3">
    <h4>High Scores</h4>
    <svg-icon @click="$emit('close')" type="mdi" :path="mdiCloseBoxOutline" size="32" class="position-absolute"
              style="right: 10px"></svg-icon>
    <div style="max-height: 93%; overflow: scroll;">
      <table class="table table-sm table-striped">
        <tbody>
        <tr v-for="([doa, [dices, extra, specials]], index) in store.highScore">
          <td>{{ index + 1 }}</td>
          <td>{{ new Intl.DateTimeFormat(store.currentLocale, dateFormat).format(new Date(doa)) }}</td>
          <td class="text-end">{{ dices }}</td>
          <td class="text-end">{{ extra }}</td>
          <td class="text-end">{{ specials }}</td>
          <td class="text-end">{{ dices + extra + specials }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
#highscoreBox {
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
}
</style>
