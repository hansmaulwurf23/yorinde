import { THREE_OF_A_KIND, FOUR_OF_A_KIND, FULLHOUSE, SMALLSTR, LARGESTR, YORINDE } from './constants.js'

const labels = {
  'de': {
    'board': [
      'Einer', 'Zweier', 'Dreier', 'Vierer', 'Fünfer', 'Sechser', 'Dreierpasch', 'Viererpasch', 'Full House',
      'Kleine Straße', 'Große Straße', 'Chance', 'Yorinde',
    ],
    'sum':'Summe',
    'invalid': {
      [THREE_OF_A_KIND]: 'Keine drei Gleichen!',
      [FOUR_OF_A_KIND]: 'Keine vier Gleichen!',
      [FULLHOUSE]: 'Keine zwei und drei Gleichen!',
      [SMALLSTR]: 'Keine kleine Strasse!',
      [LARGESTR]: 'Keine grosse Strasse!',
      [YORINDE]: 'Keine fünf Gleichen!'
    },
    'alreadyChecked': 'Bereits abgehakt!',
    'alreadyFiveDices': 'Es sind bereits 5 Würfel gelegt worden',
    'alreadyRolledThrice': 'Es wurde bereits drei mal gewürfelt!',
    'finished': 'Das Spiel ist vorbei.',
    'help': 'Hilfe',
    'settings': 'Einstellungen',
    'playerName': 'Spieler Name',
    'locale': 'Sprache',
    'toolbarPosition': 'Toolbar Position',
    'helpText': 'Zum Spielen einfach die gewürfelten Augen oben anklicken und dann die Zeile anklicken, die dafür verwendet' +
      ' werden soll. Zum Streichen ebenfalls die Zeile anklicken, dann wird entsprechend 0 Punkte gesetzt und ein ' +
      'Hinweis angezeigt. Die Punkte von Full House, der kleinen und großen Straße und Yorinde betragen 25, 30, 40 und 50' +
      ' Punkte. Für die Punkte für Einser bis ' +
      'Sechser müssen lediglich die entsprechenden Augen gesetzt sein und nicht ' +
      'der komplette Wurf. Bei allen anderen sollte der Teil des Wurfs gesetzt sein, der für die Punkte zählt. Verklickt' +
      ' man sich, kann die Rückgängig-Funktion verwendet werden. Diese hebt die letzte Zeile wieder auf, dann können die ' +
      'geworfenen Augen erneut gesetzt und die richtige Zeile verwendet werden. Sollten Anzeigefehler auftreten, klicken ' +
      'Sie bitte hier:',
  },
  'en': {
    'board': [
      'Aces', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes', 'Three Of A Kind', 'Four Of A Kind', 'Full House',
      'Small Straight', 'Large Straight', 'Chance', 'Yorinde',
    ],
    'sum':'Sum',
    'invalid': {
      [THREE_OF_A_KIND]: 'Not three of a kind!',
      [FOUR_OF_A_KIND]: 'Not four of a kind!',
      [FULLHOUSE]: 'Not two and three of a kind!',
      [SMALLSTR]: 'No small street!',
      [LARGESTR]: 'No large street!',
      [YORINDE]: 'Not five of a kind!'
    },
    'alreadyChecked': 'Already Checked!',
    'alreadyFiveDices': 'There are already five dices thrown!',
    'alreadyRolledThrice': 'Dice have been thrown three times already!',
    'finished': 'Game is finished.',
    'help': 'Help',
    'settings': 'Settings',
    'playerName': 'Player Name',
    'locale': 'Language',
    'toolbarPosition': 'Toolbar Position',
    'helpText': 'TODO. In the mean time use the german version.'
  }
}

export default labels;


