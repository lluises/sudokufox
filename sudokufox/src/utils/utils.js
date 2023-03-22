export default {
  zip(rows) {
    // https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
    return rows[0].map((_,c) => rows.map(row => row[c]));
  },
};
