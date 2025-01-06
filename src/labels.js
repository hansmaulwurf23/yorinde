import { THREE_OF_A_KIND, FOUR_OF_A_KIND, FULLHOUSE, SMALLSTR, LARGESTR, YAHTZEE } from './constants.js'

const labels = {
  'de': {
    'board': [
      'Einer', 'Zweier', 'Dreier', 'Vierer', 'Fünfer', 'Sechser', 'Dreierpasch', 'Viererpasch', 'Full House',
      'Kleine Straße', 'Große Straße', 'Kniffel', 'Chance'
    ],
    'sum':'Summe',
    'invalid': {
      [THREE_OF_A_KIND]: 'Keine drei Gleichen!',
      [FOUR_OF_A_KIND]: 'Keine vier Gleichen!',
      [FULLHOUSE]: 'Keine zwei und drei Gleichen!',
      [SMALLSTR]: 'Keine kleine Strasse!',
      [LARGESTR]: 'Keine grosse Strasse!',
      [YAHTZEE]: 'Keine fünf Gleichen!'
    },
    'alreadyChecked': 'Bereits abgehakt!',
  },
  'en': {
    'board': [
      'Aces', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes', 'Three Of A Kind', 'Four Of A Kind', 'Full House',
      'Small Straight', 'Large Straight', 'Yahtzee', 'Chance'
    ],
    'sum':'Sum',
    'invalid': {
      [THREE_OF_A_KIND]: 'Not three of a kind!',
      [FOUR_OF_A_KIND]: 'Not four of a kind!',
      [FULLHOUSE]: 'Not two and three of a kind!',
      [SMALLSTR]: 'No small street!',
      [LARGESTR]: 'No large street!',
      [YAHTZEE]: 'Not five of a kind!'
    },
    'alreadyChecked': 'Already Checked!',
  }
}

export default labels;


