class Sudoku {
  /*
    board: "980160000206000030000804090100005307008000900307200001020908000010000809000071065"
           (Sorted by rows, so that 98016000 is the first row)
  */

  EMPTY = 0;

  constructor(board, metadata) {
    if (board.length != 81) // Artifitial limitation for testing
      throw "Board must be 81 (9x9) chars";

    if (Array.isArray(board))
      this.board = board;
    else
      this.board = Array.from(board).map(x => +x);

    this.size  = Math.ceil(Math.sqrt(board.length)); // 9
    this.metadata = metadata || {};
    this.bs = Math.ceil(Math.sqrt(this.size));
  }

  get rows() {
    // Returns an array of rows ["123456789", "234567891", ...]
    return Array.from(this.iter_rows());
  }

  get cols() {
    // Returns an array of cols ["123456789", "234567891", ...]
    return Array.from(this.iter_cols());
  }

  get blocks() {
    // Returns an array of blocks ["123456789", "234567891", ...]
    return Array.from(this.iter_blocks());
  }

  *iter_rows() {
    // Yields rows ["123456789"]
    for (let i = 0; i < this.size; i++)
      yield this.board.slice(this.size * i, this.size * (i+1));
  }

  *iter_cols() {
    // Yields cols ["192837465"]
    let col = [];
    for (let c = 0; c < this.size; c++) {
      col = [];
      for (let r = 0; r < this.size; r++)
        col.push(this.board[r * this.size + c]);
      yield col;
    }
  }

  *iter_blocks() {
    // Yields blocks ["192837465"]
    // A block is the group of 9 numbers.
    const bs = this.bs;
    let block = [];
    let row = 0; // Absolute row
    let col = 0; // Relative to row column

    for (let i = 0; i < this.size; i++) {
      row = this.size * ((i / bs) >> 0) * bs;
      col = (i % bs) * bs;
      block = this.board.slice(row + col, row + col + bs);
      for (let r = 1; r < bs; r++)
        block = [
          ...block,
          ...this.board.slice(row + this.size*r + col,
                              row + this.size*r + col + bs)
        ];
      yield block;
    }
  }

  is_solved() {
    return ((this.board.indexOf(this.EMPTY) < 0)
            && !this.detect_mistakes_bool());
  }

  edit(cell, value) {
    this.board[cell] = value;
  }

  detect_mistakes() {
    // Looks for colitions inside the board.
    // Returns a set of indexes that break the sudoku. [] if none.
    return new Set([
      ...this.colisions_on_rows(),
      ...this.colisions_on_cols(),
      ...this.colisions_on_blocks(),
    ]);
  }

  detect_mistakes_bool() {
    // Detects if there or not mistakes.
    // Returns true or false.
    return !!(this.colisions_on_rows().length || this.colisions_on_cols().length);
  }

  colisions_on_rows() {
    // Returns a list of ofending indexes detected through row colisions
    let i = 0;
    let offenders = [];
    for (const row of this.iter_rows()) {
      for (const of of this.detect_colisions_on(row))
        offenders.push(this.size * i + of);
      i++;
    }
    return offenders;
  }

  colisions_on_cols() {
    // Returns a list of ofending indexes detected through column colisions
    let i = 0;
    let offenders = [];
    for (const col of this.iter_cols()) {
      for (const of of this.detect_colisions_on(col))
        offenders.push(this.size * of + i);
      i++;
    }
    return offenders;
  }

  colisions_on_blocks() {
    // Returns a list of ofending indexes detected through block colisions
    let i = 0;
    let offenders = [];
    const bs = this.bs;
    for (const block of this.iter_blocks()) {
      for (const of of this.detect_colisions_on(block))
        offenders.push(
          this.size * ((i/bs) >> 0) * bs   // Absolute row
            + (i % bs) * bs                // Col in row
            + this.size * ((of / bs) >> 0) // Row offender
            + of % bs                      // Col offender
        );
      i++;
    }
    return offenders;
  }

  detect_colisions_on(line) {
    // Returns all colisioning position on line
    const colisions = new Set;
    let offender = -1;
    for (let i = 0; i < line.length; i++) {
      if (line[i] == this.EMPTY)
        continue;
      offender = line.slice(i+1).indexOf(line[i]);
      if (offender >= 0) {
        colisions.add(i);
        colisions.add(i + offender + 1);
      }
    }
    return Array.from(colisions);
  }

  index_to_block(index) {
    // Given an index, returns the block position
    return this.bs * (Math.floor(index / this.size) % this.bs) + index%this.bs;
  }

  serialize() {
    // Returns a serialized board that can be passed to Sudoku constructor
    return this.board.join('');
  }
}

export default Sudoku;
