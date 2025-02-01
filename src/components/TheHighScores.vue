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
  <div id="highscoreBox" class="overlayContainer">
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
    <div>
      &empty; <b>{{ Math.round(10.0 * store.allTimeSum / store.allTimeCounter) / 10 }}</b> in <b>{{ store.allTimeCounter }}</b>
    </div>
  </div>
</template>

<style scoped>
</style>
