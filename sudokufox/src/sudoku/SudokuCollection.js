import Sudoku from '@/sudoku/Sudoku';


class SudokuCollection {
  static load(raw) {
    // Load Sudoku Fox sudoku stream (string).
    // Returns a SudokuCollection
    const data = JSON.parse(raw);
    if (!data || !data.sudokufox)
      throw "Error: Invalid Sudoku Fox stream";
    return new SudokuCollection(data.sudokufox);
  }

  constructor({name        = "Unnamed",
               author      = "",
               description = "",
               created     = null, // Date()
               level       = "unknown",
               source      = "unknown",
               sudokus     = [], // Sudoku ids
               id          = null,
              }) {
    this.id          = id,
    this.name        = name;
    this.author      = author;
    this.description = description;
    this.created     = created;
    this.level       = level.toLowerCase();
    this.source      = source;
    this.sudokus     = sudokus;
  }

  get level_name() {
    // Returns the level pretty name
    if (this.level)
      return this.level[0].toUpperCase() + this.level.slice(1);
    return "";
  }

  get count() {
    return this.sudokus.length;
  }

  index2id(index) {
    // Return a sudoku id for the given collection index
    return this.sudokus[index];
  }

  export () {
    // Export in the Sudoku Fox format
    const data = {
      id: this.id,
      name: this.name,
      author: this.author,
      description: this.description,
      created: this.created || new Date(),
      level: this.level,
      source: this.source,
      sudokus: this.sudokus,
    };
    return data;
  }
}


export default SudokuCollection;
