<script setup>
const props = defineProps({
  value: Number,
  maxValue: Number
})

function valPercentage(v) {
  return Math.round(10.0 * v / props.maxValue * 100) / 10
}
</script>

<template>
  <div class="progress" role="progressbar">
    <div class="progress-bar bg-success" :style="{width: valPercentage(value)+'%'}">{{ valPercentage(value) }}%</div>
  </div>
</template>

<style scoped>

</style>
