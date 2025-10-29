<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import {mdiCloseBoxOutline, mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6} from "@mdi/js";
import SvgIcon from "vue3-icon";
import {
  ATS_COUNTER,
  CHANCE,
  FOUR_OF_A_KIND,
  FULLHOUSE,
  LARGESTR,
  SMALLSTR,
  THREE_OF_A_KIND,
  YORINDE
} from "@/constants.js";
import {computed, ref} from "vue";
import labels from "@/labels.js";
import TheProgressBar from "@/components/TheProgressBar.vue";

const dices = [mdiDice1, mdiDice2, mdiDice3, mdiDice4, mdiDice5, mdiDice6];

const dateFormat = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}
const store = useBoardStore()
const msgs = computed(() => labels[store.currentLocale])
const importVisible = ref(false);
const importData = ref('')

function export_stats() {
  let stats = {
    'allTimeCounter': store.allTimeCounter,
    'allTimeSum': store.allTimeSum,
    'allTimeStats': store.allTimeStats
  }

  // credit: https://www.bitdegree.org/learn/javascript-download
  let text = JSON.stringify(stats);
  let filename = 'highscores.json';
  let element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function import_stats() {
  let stats = JSON.parse(importData.value)
  console.log(JSON.stringify(stats))
  store.allTimeCounter = stats.allTimeCounter;
  store.allTimeSum = stats.allTimeSum;
  store.allTimeStats = stats.allTimeStats;
}
</script>

<template>
  <div id="highscoreBox" class="overlayContainer">
    <h4>High Scores</h4>
    <svg-icon @click="$emit('close')" type="mdi" :path="mdiCloseBoxOutline" size="32" class="position-absolute"
              style="right: 10px"></svg-icon>
    <div>
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
      &empty; <b>{{ Math.round(10.0 * store.allTimeSum / store.allTimeCounter) / 10 }}</b> in
      <b>{{ store.allTimeCounter }} ({{store.allTimeStats[ATS_COUNTER]}})</b>
    </div>
    <div id="allTimeStatsContantainer">
      <div class="sixy" v-for="(val, idx) in 6">
        <svg-icon type="mdi" size="48" :path="dices[idx]"></svg-icon>
        {{ Math.round(10.0 * store.allTimeStats[idx] / store.allTimeStats[ATS_COUNTER]) / 10 }}
      </div>
    </div>
    <div>
      <table class="table table-sm table-striped allTimeStatsTable">
        <tr v-for="special in [THREE_OF_A_KIND, FOUR_OF_A_KIND, CHANCE]">
          <td>{{ msgs.board[special] }}</td>
          <td>{{ Math.round(10.0 * store.allTimeStats[special] / store.allTimeStats[ATS_COUNTER]) / 10 }}</td>
        </tr>
        <tr v-for="special in [FULLHOUSE, SMALLSTR, LARGESTR, YORINDE]">
          <td>{{ msgs.board[special] }}</td>
          <td><TheProgressBar :max-value="100" :value="Math.round(10.0 * store.allTimeStats[special] / store.allTimeStats[ATS_COUNTER] * 100) / 10" />
          </td>
        </tr>
      </table>
    </div>

    <div>
      <button class="btn btn-secondary m-1" @click="export_stats()">Export</button>
      <button class="btn btn-secondary m-1" @click="importVisible = true">Import</button>
    </div>
    <div v-if="importVisible" class="mt-3">
      <textarea v-model="importData" class="form-control" style="width: 80%; height: 150px"/>
      <button class="btn btn-secondary m-1" @click="import_stats()">Einlesen</button>
    </div>
  </div>
</template>

<style scoped>
#allTimeStatsContantainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sixy {
  width: 15%;
  text-align: center;
}

.allTimeStatsTable tr td:nth-child(1) {
  width: 40%;
}

.allTimeStatsTable .progress {
  padding: 0;
}
</style>
