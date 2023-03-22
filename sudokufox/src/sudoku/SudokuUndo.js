class SudokuUndo {
  /*
    Sudoku Undo Stack

    this.stack:
    [
      [index, 'h', old, new]
    ]

    Serialized:
    TYPE: h → hint, b → board
    "{index}{TYPE}{old}:{new}|{index2}{TYPE2}{old2}:{new2}"
    Sorted: oldest first, newest last
  */

  // Type must be a letter in [a-z], and point to a unique word.
  static TYPE = {
    h: 'hint',
    b: 'board',
  };

  static REVERSE_TYPE = (function() {
    // Precalculated value
    const reverse_type = {};
    for (const [key, value] of Object.entries(SudokuUndo.TYPE))
      reverse_type[value] = key;
    reverse_type[undefined] = 'b';
    return reverse_type;
  })();

  constructor(raw_undo) {
    this.stack = raw_undo ? this.parse_undo_stack(raw_undo) : [];
  }

  undo() {
    // Calculate the inverted movement to undo the last operation
    // Returns {index: 1, type: 'hint', before: 2, after: 4} or undefined
    // Type can be 'hint' or 'board'
    if (this.stack.length <= 0)
      return undefined;
    const [index, type, before, after] = this.stack.pop();
    return {
      index: index,
      type: SudokuUndo.TYPE[type],
      before: before,
      after: after
    };
  }

  push({index, type, before, after}) {
    // Append a new operation to the stack.
    this.stack.push([index, SudokuUndo.REVERSE_TYPE[type], before, after]);
  }

  parse_undo_entry(raw_entry) {
    // Entry: "{index}{TYPE}{before}:{after}"
    const [index, type, raw_values] = raw_entry.split(/([a-z])/);
    const [before, after] = raw_values.split(':');
    return [+index, type, +before, +after];
  }

  parse_undo_stack(raw_stack) {
    // Raw stack: "{index}{TYPE}{before}:{after}|{index2}{TYPE2}{before2}:{after2}"
    return raw_stack.split('|').map(this.parse_undo_entry);
  }

  serialize() {
    return (
      this.stack
        .map(([index, type, before, after]) => `${index}${type}${before}:${after}`)
        .join('|')
    );
  }
}

export default SudokuUndo;
