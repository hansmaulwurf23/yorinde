<script setup>

import {mdiCloseBoxOutline, mdiPlusMinusVariant, mdiThemeLightDark, mdiToggleSwitchVariantOff, mdiWeb} from "@mdi/js";
import SvgIcon from "vue3-icon";
import {useBoardStore} from "@/stores/scoreBoard.js";
import {computed} from "vue";
import labels from "@/labels.js";

const store = useBoardStore()
const msgs = computed(() => labels[store.currentLocale])
</script>

<template>
  <div id="settingsContainer" class="overlayContainer">
    <h4 class="mb-4">{{ msgs.settings }}</h4>
    <svg-icon @click="$emit('close')" type="mdi" :path="mdiCloseBoxOutline" size="32" class="position-absolute"
              style="right: 10px"></svg-icon>
    <div class="settingsRow">
      <label for="player" class="w-50">{{ msgs.playerName }}:</label>
      <input id="player" class="w-50" v-model="store.playerName" type="text" :placeholder="msgs.playerName"/>
    </div>
    <hr/>
    <div class="settingsRow">
      <button class="squarebtn" @click="store.toggleLocale()">
        <svg-icon type="mdi" size="36" :path="mdiWeb"></svg-icon>
      </button>
      <div>{{ msgs.locale }}</div>
    </div>
    <div class="settingsRow">
      <button class="squarebtn" @click="store.controllsSwitched = !store.controllsSwitched">
        <svg-icon type="mdi" size="36" :path="mdiToggleSwitchVariantOff"
                  :style="{transform: store.controllsSwitched ? 'rotate(180deg)': 'rotate(0)'}"></svg-icon>
      </button>
      <div>{{ msgs.toolbarPosition }}</div>
    </div>
    <div class="settingsRow">
      <button class="squarebtn" @click="store.extraPointsLeftMode = !store.extraPointsLeftMode">
        <svg-icon type="mdi" size="36" :path="mdiPlusMinusVariant"></svg-icon>
      </button>
        <div>Bonus Points Mode</div>
    </div>
    <div class="settingsRow">
      <button class="squarebtn" @click="store.toggleDarkTheme()">
        <svg-icon type="mdi" size="36" :path="mdiThemeLightDark"></svg-icon>
      </button>
      <div>Dark Theme</div>
    </div>
  </div>
</template>

<style scoped>
.settingsRow {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
