<script setup>
import {useBoardStore} from "@/stores/scoreBoard.js";

const store = useBoardStore()
</script>

<template>
  <div id="myErrorAlert" @click="store.unsetError()" class="position-absolute bottom-0 start-0 w-100"
       :class="{'show': store.currentError, 'disnone': !store.currentError,
          'bg-danger': !store.currentErrorIsOnlyWarning,
          'bg-warning': store.currentErrorIsOnlyWarning}" role="alert">
    {{ store.currentError }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<style scoped>
.disnone {
  display: none;
}
</style>
