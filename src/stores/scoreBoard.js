import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import labels from "@/labels.js";

export const useBoardStore = defineStore("boardStore", () => {
    const rolledDices = ref(new Array(6).fill(0))
    const points = ref(new Array(13).fill(undefined))
    const undoStack = ref([])
    const currentError = ref("")
    const currentErrorIsOnlyWarning = ref(false)
    const rolledDiceCount = computed(() => rolledDices.value.reduce((s, dices) => s + dices, 0))
    const rolledDiceSum = computed(() => rolledDices.value.reduce((s, dices, i) => s + (dices * (i + 1)), 0))
    const currentLocale = ref("de")

    const validators = [
      (ctx) => true,
      (ctx) => true,
      (ctx) => true,
      (ctx) => true,
      (ctx) => true,
      (ctx) => true,
      (ctx) => ctx.rolledDices.includes(3), // three of a kind
      (ctx) => ctx.rolledDices.includes(4), // four of a kind
      (ctx) => ctx.rolledDices.includes(2) && ctx.rolledDices.includes(3), // two and three of a kind
      (ctx) => ctx.longestNonZeroLength() >= 4, // small street
      (ctx) => ctx.longestNonZeroLength() >= 5, // large street
      (ctx) => ctx.rolledDices.includes(5),
      (ctx) => true,
    ]

    const rewards = [
      (ctx) => ctx.rolledDices[0],
      (ctx) => ctx.rolledDices[1] * 2,
      (ctx) => ctx.rolledDices[2] * 3,
      (ctx) => ctx.rolledDices[3] * 4,
      (ctx) => ctx.rolledDices[4] * 5,
      (ctx) => ctx.rolledDices[5] * 6,
      (ctx) => ctx.rolledDiceSum,
      (ctx) => ctx.rolledDiceSum,
      (ctx) => 25,
      (ctx) => 30,
      (ctx) => 40,
      (ctx) => 50,
      (ctx) => ctx.rolledDiceSum
    ]

    function longestNonZeroLength() {
      let max = 0;
      let cur = 0;
      for (let i = 0; i <= this.rolledDices.length; i++) {
        if (this.rolledDices[i] > 0) {
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
      if (this.rolledDiceCount >= 5) {
        return this.setError('Es sind bereits 5 Würfel gelegt worden');
      }

      this.rolledDices[v] += 1;
    }

    function resetRolledDices() {
      for (let i = 0; i < this.rolledDices.length; i++) {
        this.rolledDices[i] = 0;
      }
    }

    function setPoints(scoreIdx) {
      if (this.points[scoreIdx] !== undefined) {
        return this.setError(labels[this.currentLocale].alreadyChecked);
      }
      if (!this.validators[scoreIdx](this)) {
        this.setError(labels[this.currentLocale].invalid[scoreIdx], true);
        setTimeout(this.unsetError, 2500);
        this.points[scoreIdx] = 0;
      } else {
        this.points[scoreIdx] = this.rewards[scoreIdx](this);
      }

      this.resetRolledDices();
      this.undoStack.push([scoreIdx, this.points[scoreIdx]]);
    }

    function newGame() {
      for (let i = 0; i < this.points.length; i++) {
        this.points[i] = undefined;
      }
      this.resetRolledDices();
      this.undoStack.length = 0;
    }

    function summarizePoints() {
      console.log('summarize points');
      let facePoints = this.points.slice(0, 6).reduce((s, p) => s + (p !== undefined ? p : 0), 0);
      let extraFacePoints = facePoints >= 63 ? 35 : 0;
      let combinationsPoints = this.points.slice(6).reduce((s, p) => s + (p !== undefined ? p : 0), 0)
      return facePoints + ' + ' + (extraFacePoints ? extraFacePoints + ' + ' : '') +
        combinationsPoints + ' = ' + (facePoints + extraFacePoints + combinationsPoints);
    }

    function setError(msg, onlyWarning = false) {
      this.currentError = msg;
      this.currentErrorIsOnlyWarning = onlyWarning;
    }

    function unsetError() {
      this.currentError = undefined;
    }

    function toggleLocale() {
      this.currentLocale = (this.currentLocale === 'de' ? 'en' : 'de');
    }

    function undo() {
      if (this.undoStack.length > 0) {
        let [scoreIdx, points] = this.undoStack.pop();
        this.points[scoreIdx] = undefined;
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
    persist: false,
  }
)

