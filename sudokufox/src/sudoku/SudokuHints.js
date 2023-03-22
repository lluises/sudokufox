class SudokuHints {
  /*
    # In RAM memory
      {0: Set([1, 2, 3]), 1: Set([1, 2, 3])}

    # In persistent memory
      "{index}-{values}|{index2}-{values2}"
      Example: "2:123|5:123"

      if size > 81, then "," is used to separate values
      Exmaple: "2:1,2,3|5:1,2,3"

      Note: Indexes order might be inconsistent, don't relay on sorted data.
  */

  constructor(size, raw_hints) {
    // Math.sqrt(size) must be a natural number.
    this._empty_set = new Set([]);

    this.size  = size || 81;
    if (raw_hints)
      this.hints = this.parse_compressed_hints(raw_hints, size);
    else
      this.hints = {};
  }

  cell_hints(cell_index) {
    // Returns the set of hints of the given cell_index
    return this.hints[cell_index] || this._empty_set;
  }

  add_cell_hint(cell_index, number) {
    // Add number to cell_index cell hints
    if (!this.hints[cell_index])
      this.hints[cell_index] = new Set([number]);
    else
      this.hints[cell_index].add(number);
  }

  delete_cell_hint(cell_index, number) {
    // Delete number from cell_index cell hints
    if (this.hints[cell_index]) {
      this.hints[cell_index].delete(number);
      if (this.hints[cell_index].size <= 0)
        delete this.hints[cell_index];
    }
  }

  parse_compressed_hints(data, size) {
    // Return a dictionary from a serialized SudokuHints string.
    const res = {};
    const split_comma = (size > 81);

    for (const cell of data.split('|')) {
      const [index, value] = cell.split(':');
      res[index] = new Set(
        (split_comma ? value.split(',') : Array.from(value))
          .map(x => +x)
      );
    }

    return res;
  }

  serialize() {
    // Returns a serialized string of the current SudokuHints.
    const value_join = (this.size > 81) ? ',' : '';
    return (Object
            .entries(this.hints)
            .map(([idx, set]) => idx + ':' + Array.from(set).join(value_join))
            .join("|"));
  }
}

export default SudokuHints;
