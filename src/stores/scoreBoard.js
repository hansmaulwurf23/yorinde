import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import labels from "@/labels.js";
import {
  ATS_COUNTER,
  CHANCE,
  FOUR_OF_A_KIND,
  FULLHOUSE,
  LARGESTR,
  MAX_HIGHSCORE_ENTRIES,
  SMALLSTR,
  THREE_OF_A_KIND,
  YORINDE
} from "@/constants.js";

export const useBoardStore = defineStore("yorindeBoardStore", () => {
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
    const undoMode = ref(false)
    const controllsSwitched = ref(true)
    const extraPointsLeftMode = ref(false)
    const playerName = ref("Player")
    const highScore = ref([])
    const valid4HighScore = ref(true)
    const darkTheme = ref(false)
    const allTimeCounter = ref(0)
    const allTimeSum = ref(0)
    const allTimeStats = ref(new Array(14).fill(0))

    const validators = [
      () => true,
      () => true,
      () => true,
      () => true,
      () => true,
      () => true,
      () => rolledDiceCounter.value.some((x) => x >= 3), // three of a kind
      () => rolledDiceCounter.value.some((x) => x >= 4), // four of a kind
      () => true,
      () => rolledDiceCounter.value.includes(2) && rolledDiceCounter.value.includes(3), // two and three of a kind
      () => longestNonZeroLength() >= 4, // small street
      () => longestNonZeroLength() >= 5, // large street
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
      () => rolledDiceSum.value,
      () => 25,
      () => 30,
      () => 40,
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
      valid4HighScore.value = false;
    }

    function resetRolledDices() {
      for (let i = 0; i < rolledDices.value.length; i++) {
        rolledDices.value[i] = null;
      }
      undoMode.value = false;
    }

    function setPoints(scoreIdx) {
      if (points.value[scoreIdx] !== null) {
        return setError(labels[currentLocale.value].alreadyChecked);
      }
      if (!validators[scoreIdx]()) {
        points.value[scoreIdx] = 0;
      } else {
        points.value[scoreIdx] = rewards[scoreIdx]();
      }

      undoStack.value.push([scoreIdx, Array.from(rolledDices.value)]);
      resetRolledDices();

      if (isFinished.value && valid4HighScore.value) {
        storeStats()
        let hsIdx = storeHighscore();
        setError(labels[currentLocale.value].finished + (hsIdx !== -1 ? (' HighScore! (' + (hsIdx+1) + ')') : ''));
      }
    }

    function storeStats() {
      allTimeCounter.value += 1;
      allTimeSum.value += sum(...calcPoints());

      // reset all time stats if no chance was stored (must be an error)
      if (allTimeStats.value[ATS_COUNTER] === 0) {
        allTimeStats.value.fill(0);
      }

      // store single dice face counter
      for (let i = 0; i < 6; i++) {
        allTimeStats.value[i] += (points.value[i] / (i+1));
      }

      // store sum of points of variable reward specials
      for (const special of [THREE_OF_A_KIND, FOUR_OF_A_KIND, CHANCE]) {
        allTimeStats.value[special] += points.value[special];
      }

      // store count of fixed reward specials
      for (const special of [FULLHOUSE, SMALLSTR, LARGESTR, YORINDE]) {
        allTimeStats.value[special] += (points.value[special] > 0 ? 1 : 0);
      }

      // store dedicated counter of all time stats since this was introduced later than allTimeCounter
      allTimeStats.value[ATS_COUNTER] += 1;
    }

    function sum(...theArgs) {
      let total = 0;
      for (const arg of theArgs) {
        total += arg;
      }
      return total;
    }

    function storeHighscore() {
      // migration code (since highscores were not ordered and not capped to ten entries)
      highScore.value.sort((a, b) => sum(...b[1]) - sum(...a[1]));
      highScore.value.splice(MAX_HIGHSCORE_ENTRIES, Infinity)

      let scores = calcPoints();
      let p = sum(...scores);
      let hsIdx = highScore.value.findIndex(x => sum(...x[1]) < p);
      if (hsIdx !== -1) {
        highScore.value.splice(hsIdx, 0, [new Date(), scores]);
        highScore.value.splice(MAX_HIGHSCORE_ENTRIES, Infinity);
      } else if (highScore.value.length < MAX_HIGHSCORE_ENTRIES) {
        hsIdx = highScore.value.length;
        highScore.value.push([new Date(), scores]);
      }
      return hsIdx;
    }

    function newGame() {
      for (let i = 0; i < points.value.length; i++) {
        points.value[i] = null;
      }
      resetRolledDices();
      unsetError();
      undoStack.value.length = 0;
      valid4HighScore.value = true;
    }

    function calcPoints() {
      let facePoints = points.value.slice(0, 6).reduce((s, p) => s + (p !== null ? p : 0), 0);
      let extraFacePoints = facePoints >= 63 ? 35 : 0;
      let combinationsPoints = points.value.slice(6).reduce((s, p) => s + (p !== null ? p : 0), 0)
      return [facePoints, extraFacePoints, combinationsPoints]
    }

    function summarizePoints() {
      let [facePoints, extraFacePoints, combinationsPoints] = calcPoints();
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

    function toggleDarkTheme() {
      console.log('toggle dark theme');
      darkTheme.value = !darkTheme.value;
      document.documentElement.setAttribute('data-bs-theme', darkTheme.value ? 'dark': 'light');
    }

    function undo() {
      if (undoStack.value.length > 0) {
        if (rollingMode.value && rolledDices.value[0] != null) {
          setError(labels[currentLocale.value].alreadyRolledDicesNoUndo);
          return false;
        }

        let [scoreIdx, oldDices] = undoStack.value.pop();
        points.value[scoreIdx] = null;
        undoMode.value = true;
        // only reset the rolled dices if mode is not manually entering the dices
        if (rollingMode.value) {
          for (let i = 0; i < rolledDices.value.length; i++) {
            rolledDices.value[i] = oldDices[i];
          }
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
      undoMode,
      controllsSwitched,
      extraPointsLeftMode,
      isFinished,
      highScore,
      allTimeCounter,
      allTimeSum,
      allTimeStats,
      valid4HighScore,
      darkTheme,
      playerName,
      addRolledDice,
      resetRolledDices,
      setPoints,
      newGame,
      calcPoints,
      summarizePoints,
      undo,
      setError,
      unsetError,
      toggleLocale,
      toggleDarkTheme,
      longestNonZeroLength,
    }
  },
  {
    persist: true,
  }
)

