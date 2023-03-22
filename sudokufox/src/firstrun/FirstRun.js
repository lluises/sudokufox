import SudokuParser from "@/sudoku/SudokuParser";
import SudokuDatabase from "@/sudoku/SudokuDatabase";

import xml_easy from './easy.opensudoku.js';
import xml_medium from './medium.opensudoku.js';
import xml_hard from './hard.opensudoku.js';
import xml_very_hard from './very_hard.opensudoku.js';

const firstrun_puzzles = [
  xml_easy,
  xml_medium,
  xml_hard,
  xml_very_hard,
];

export default {
  load_initial_sudokus_to_database() {
    for (const opensudoku of firstrun_puzzles) {
      const parser = SudokuParser.parse_opensudoku(opensudoku);
      parser.save();
    }
  },
};
