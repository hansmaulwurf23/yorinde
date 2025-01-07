import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import labels from "@/labels.js";

export const useBoardStore = defineStore("yahtzeeBoardStore", () => {
    const rolledDices = ref(new Array(6).fill(0))
    const points = ref(new Array(13).fill(null))
    const undoStack = ref([])
    const currentError = ref("")
    const currentErrorIsOnlyWarning = ref(false)
    const rolledDiceCount = computed(() => rolledDices.value.reduce((s, dices) => s + dices, 0))
    const rolledDiceSum = computed(() => rolledDices.value.reduce((s, dices, i) => s + (dices * (i + 1)), 0))
    const currentLocale = ref("de")

    const validators = [
      () => true,
      () => true,
      () => true,
      () => true,
      () => true,
      () => true,
      () => rolledDices.value.includes(3), // three of a kind
      () => rolledDices.value.includes(4), // four of a kind
      () => rolledDices.value.includes(2) && rolledDices.value.includes(3), // two and three of a kind
      () => longestNonZeroLength() >= 4, // small street
      () => longestNonZeroLength() >= 5, // large street
      () => rolledDices.value.includes(5),
      () => true,
    ]

    const rewards = [
      () => rolledDices.value[0],
      () => rolledDices.value[1] * 2,
      () => rolledDices.value[2] * 3,
      () => rolledDices.value[3] * 4,
      () => rolledDices.value[4] * 5,
      () => rolledDices.value[5] * 6,
      () => rolledDiceSum.value,
      () => rolledDiceSum.value,
      () => 25,
      () => 30,
      () => 40,
      () => 50,
      () => rolledDiceSum.value
    ]

    function longestNonZeroLength() {
      let max = 0;
      let cur = 0;
      for (let i = 0; i <= rolledDices.value.length; i++) {
        if (rolledDices.value[i] > 0) {
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
      if (rolledDiceCount.value >= 5) {
        return setError('Es sind bereits 5 Würfel gelegt worden');
      }

      rolledDices.value[v] += 1;
    }

    function resetRolledDices() {
      for (let i = 0; i < rolledDices.value.length; i++) {
        rolledDices.value[i] = 0;
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

      resetRolledDices();
      undoStack.value.push([scoreIdx, points.value[scoreIdx]]);
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
        let [scoreIdx, points] = undoStack.value.pop();
        points.value[scoreIdx] = null;
      }
    }

    return {
      rolledDices,
      rolledDiceCount,
      rolledDiceSum,
      points,
      undoStack,
      currentError,
      currentErrorIsOnlyWarning,
      currentLocale,
      validators,
      rewards,
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

