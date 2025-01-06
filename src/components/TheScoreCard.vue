<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";
import labels from "../labels.js";

const store = useBoardStore()
</script>

<template>
  <div class="m-3">
    <table class="table table-sm">
      <tbody>
      <tr v-for="(v, i) in store.points" :class="{'border-secondary': [5, 12].includes(i)}">
        <td @click="store.setPoints(i)" :class="{'text-secondary': store.points[i] !== undefined}">
          {{ labels[store.currentLocale].board[i] }}
        </td>
        <td class="text-end fw-bold">{{ v }}</td>
      </tr>
      <tr>
        <td colspan="2">{{ labels[store.currentLocale].sum }}: <b>{{ store.summarizePoints() }}</b></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
