import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import labels from "@/labels.js";

export const useBoardStore = defineStore("yahtzeeBoardStore", () => {
    const rolledDices = ref(new Array(5).fill(null))
    const rolledDiceCounter = computed(() => {
      let res = new Array(6).fill(0);
      for (let i = 0; i < rolledDices.value.length; i++) {
        res[rolledDices.value[i] - 1] += 1;
      }
      return res;
    })
    const rolledDiceCount = computed(() => rolledDices.value.filter(x => x !== null).length)
    const rolledDiceSum = computed(() => rolledDices.value.reduce((s, v) => s + (v ? v : 0), 0))
    const isFinished = computed(() => points.value.every(x => x !== null))
    const points = ref(new Array(13).fill(null))
    const undoStack = ref([])
    const currentError = ref("")
    const currentErrorIsOnlyWarning = ref(false)
    const currentLocale = ref("de")
    const rollingMode = ref(true)

    const validators = [
      () => true,
      () => true,
      () => true,
      () => true,
      () => true,
      () => true,
      () => rolledDiceCounter.value.some((x) => x >= 3), // three of a kind
      () => rolledDiceCounter.value.some((x) => x >= 4), // four of a kind
      () => rolledDiceCounter.value.includes(2) && rolledDiceCounter.value.includes(3), // two and three of a kind
      () => longestNonZeroLength() >= 4, // small street
      () => longestNonZeroLength() >= 5, // large street
      () => true,
      () => rolledDiceCounter.value.includes(5),
    ]

    const rewards = [
      () => rolledDiceCounter.value[0],
      () => rolledDiceCounter.value[1] * 2,
      () => rolledDiceCounter.value[2] * 3,
      () => rolledDiceCounter.value[3] * 4,
      () => rolledDiceCounter.value[4] * 5,
      () => rolledDiceCounter.value[5] * 6,
      () => rolledDiceSum.value,
      () => rolledDiceSum.value,
      () => 25,
      () => 30,
      () => 40,
      () => rolledDiceSum.value,
      () => 50,
    ]

    function longestNonZeroLength() {
      let max = 0;
      let cur = 0;
      for (let i = 0; i <= rolledDiceCounter.value.length; i++) {
        if (rolledDiceCounter.value[i] > 0) {
          cur += 1;
        } else {
          max = Math.max(cur, max);
          cur = 0;
        }
      }
      max = Math.max(cur, max);
      return max;
    }

    function addRolledDice(v) {
      let count = rolledDiceCount.value;
      if (count >= 5) {
        return setError(labels[currentLocale.value].alreadyFiveDices);
      }

      rolledDices.value[count] = v;
    }

    function resetRolledDices() {
      for (let i = 0; i < rolledDices.value.length; i++) {
        rolledDices.value[i] = null;
      }
    }

    function setPoints(scoreIdx, noValidation = false) {
      if (points.value[scoreIdx] !== null) {
        return setError(labels[currentLocale.value].alreadyChecked);
      }
      if (!validators[scoreIdx]() || noValidation) {
        setError(labels[currentLocale.value].invalid[scoreIdx], true);
        setTimeout(unsetError, 5000);
        points.value[scoreIdx] = 0;
      } else {
        points.value[scoreIdx] = rewards[scoreIdx]();
      }

      undoStack.value.push([scoreIdx, Array.from(rolledDices.value)]);
      resetRolledDices();

      if (isFinished.value) {
        setError(labels[currentLocale.value].finished);
      }
    }

    function newGame() {
      for (let i = 0; i < points.value.length; i++) {
        points.value[i] = null;
      }
      resetRolledDices();
      undoStack.value.length = 0;
    }

    function summarizePoints() {
      let facePoints = points.value.slice(0, 6).reduce((s, p) => s + (p !== null ? p : 0), 0);
      let extraFacePoints = facePoints >= 63 ? 35 : 0;
      let combinationsPoints = points.value.slice(6).reduce((s, p) => s + (p !== null ? p : 0), 0)
      return facePoints + ' + ' + (extraFacePoints ? extraFacePoints + ' + ' : '') +
        combinationsPoints + ' = ' + (facePoints + extraFacePoints + combinationsPoints);
    }

    function setError(msg, onlyWarning = false) {
      currentError.value = msg;
      currentErrorIsOnlyWarning.value = onlyWarning;
    }

    function unsetError() {
      currentError.value = null;
    }

    function toggleLocale() {
      currentLocale.value = (currentLocale.value === 'de' ? 'en' : 'de');
    }

    function undo() {
      if (undoStack.value.length > 0) {
        let [scoreIdx, oldDices] = undoStack.value.pop();
        points.value[scoreIdx] = null;
        for (let i = 0; i < rolledDices.value.length; i++) {
          rolledDices.value[i] = oldDices[i];
        }
      }
    }

    return {
      rolledDiceCounter,
      rolledDiceCount,
      rolledDiceSum,
      rolledDices,
      points,
      undoStack,
      currentError,
      currentErrorIsOnlyWarning,
      currentLocale,
      validators,
      rewards,
      rollingMode,
      isFinished,
      addRolledDice,
      resetRolledDices,
      setPoints,
      newGame,
      summarizePoints,
      undo,
      setError,
      unsetError,
      toggleLocale,
      longestNonZeroLength,
    }
  },
  {
    persist: true,
  }
)

