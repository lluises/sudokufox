const sudoku_board_light = {
  error: '#f44336',
  'sudoku-bg': '#ffffff',
  'sudoku-fixed': '#cccccc',
  'sudoku-highlight': '#fb8c00',
  'sudoku-filled': '#ff9800',
  'sudoku-line-light': '#AAAAAA',
  'sudoku-line-bold': '#111111',
};

const sudoku_board_dark = {
  error: '#f44336',
  'sudoku-bg': '#212121',
  'sudoku-fixed': '#424242',
  'sudoku-highlight': '#cc7a00',
  'sudoku-filled': '#ff9800',
  'sudoku-line-light': '#666666',
  'sudoku-line-bold': '#DDDDDD',
};

export default {
  light: {
    name: 'Sudoku Fox Light',
    dark: false,
    colors: {
      ...sudoku_board_light,
      primary: '#ff9800',
      secondary: '#ffb74d',
      'sudoku-highlight': '#fb8c00',
      'sudoku-filled': '#ff9800',
    },
  },

  dark: {
    name: 'Sudoku Fox Dark',
    dark: true,
    colors: {
      ...sudoku_board_dark,
      primary: '#cc7a00',
      secondary: '#996b26',
      'sudoku-highlight': '#cc7a00',
      'sudoku-filled': '#ff9800',
    },
  },

  purple: {
    name: 'Purple Light',
    dark: false,
    colors: {
      ...sudoku_board_light,
      primary: '#673ab7',
      secondary: '#673ab7',
      'sudoku-highlight': '#b388ff',
      'sudoku-filled': '#b388ff',
    },
  },

  teal: {
    name: 'Teal Light',
    dark: false,
    colors: {
      ...sudoku_board_light,
      primary: '#009688',
      secondary: '#009688',
      'sudoku-highlight': '#1de9b6',
      'sudoku-filled': '#009688',
    },
  },

  blue_light: {
    name: 'Blue Light',
    dark: false,
    colors: {
      ...sudoku_board_light,
      primary: '#2196f3',
      secondary: '#90caf9',
      'sudoku-highlight': '#2196f3',
      'sudoku-filled': '#2196f3',
    },
  },

  blue_dark: {
    name: 'Blue Dark',
    dark: true,
    colors: {
      ...sudoku_board_dark,
      primary: '#2196f3',
      secondary: '#1565c0',
      'sudoku-highlight': '#2196f3',
      'sudoku-filled': '#2196f3',
    },
  },

  grey_dark: {
    name: 'Grey Dark',
    dark: true,
    colors: {
      ...sudoku_board_dark,
      primary: '#424242',
      secondary: '#121212',
      'sudoku-highlight': '#757575',
      'sudoku-filled': '#757575',
    },
  },

  solarized_dark: {
    name: 'Solarized Dark',
    dark: true,
    colors: {
      primary: '#cb4b16',
      secondary: '#2aa198',
      error: '#f44336',
      background: '#002b36',
      'sudoku-bg': '#002b36',
      'sudoku-fixed': '#2aa198',
      'sudoku-highlight': '#cb4b16',
      'sudoku-filled': '#cb4b16',
      'sudoku-line-light': '#839496',
      'sudoku-line-bold': '#fdf6e3',
    },
  },
};
