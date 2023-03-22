import SudokuDatabase from '@/sudoku/SudokuDatabase';
import SudokuCollection from '@/sudoku/SudokuCollection';
import Sudoku from '@/sudoku/Sudoku';

class SudokuParser {
  static parse_opensudoku(raw) {
    // Load an Open Sudoku stream (string)
    // Parses data from opensudoku format and returns SudokuCollection
    const parsed = (new DOMParser()).parseFromString(raw, "text/xml");
    const opensudoku = parsed.firstChild;
    const first = (tag) => opensudoku.getElementsByTagName(tag)[0].textContent;

    return new SudokuParser({
      name: first('name') || "Unnamed",
      author: first('author'),
      description: first('description'),
      created: first('created') ? new Date(first('created')) : null,
      source: first('sourceURL'),
      sudokus: (Array
                .from(opensudoku.getElementsByTagName('game'))
                .map(game => game.getAttribute('data'))),
    });
  }

  constructor({name        = "Unnamed",
               author      = "",
               description = "",
               created     = null, // Date()
               level       = "unknown",
               source      = "unknown",
               sudokus     = [], // Sudoku boards
              }) {
    this.metadata = {
      name: name,
      author: author,
      description: description,
      created: created,
      level: level,
      source: source,
    };

    this.sudokus = sudokus.map(s => new Sudoku(s));
  }

  save() {
    // Save parsed data to database
    const sudoids = SudokuDatabase.add_sudoku_batch(this.sudokus);
    const col = new SudokuCollection({...this.metadata, sudokus: sudoids});
    SudokuDatabase.add_collection(col);
  }
}

export default SudokuParser;
