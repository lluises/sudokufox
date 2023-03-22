import SudokuCollection from "@/sudoku/SudokuCollection";
import SudokuHints from "@/sudoku/SudokuHints";
import SudokuUndo from "@/sudoku/SudokuUndo";
import Sudoku from "@/sudoku/Sudoku";
import Compressor from "@/utils/Compressor";
import DEFAULT_SETTINGS from '@/default_settings';


class SudokuDatabase {
  // Singleton class

  /*
    Database structure:
    MAIN_METADATA = "{}"

    Settings:
    SETTINGS → "{...}"

    Database:
    COLLECTIONS_META → "[{id: COLLECTION_ID, sudokus: [SUDOKU_ID], name: "My collection", ...}]"

    Sudokus:
    SUDOKU_ORG_{SUDOKU_ID}  → "3141592653589793..."
    SUDOKU_MOD_{SUDOKU_ID}  → "2718281828459045..."
    SUDOKU_SOL_TIME_{SUDOKU_ID}  → "seconds" // play_time or 0 if not solved
    SUDOKU_SOL_DATE_{SUDOKU_ID}  → "Solving date" // null if not solved

    SudokuHints:
    SUDOKU_HIN_{SUDOKU_ID} → "Serialized SudokuHints"

    Undo stack:
    SUDOKU_UND_{SUDOKU_ID} → "Serialized undo stack"
  */

  MAIN_METADATA = "UwU";

  SETTINGS = "SET";

  COLLECTIONS_META = "COL";

  SUDOKU_ORG = "ORG";
  SUDOKU_MOD = "MOD";
  SUDOKU_SOL_TIME = "STI";
  SUDOKU_SOL_DATE = "SDA";
  SUDOKU_HIN = "SHI";

  SUDOKU_UND = "UND";

  constructor() {
    this.compress = true;
    this.storage = window.localStorage;
    this.cache = {};
    this.meta = {};
    this.setup();
  }

  async verify_persistency() {
    // TODO: This method should be storage driver specific
    // Check if site's storage has been marked as persistent
    if (navigator.storage && navigator.storage.persist) {
      const is_persisted = await navigator.storage.persisted();
      if (!is_persisted)
        await navigator.storage.persist();
    }
  }

  storage_bytes() {
    return new Blob(Object.values(this.storage)).size;
  }

  setup() {
    const raw_meta = this.storage.getItem(this.MAIN_METADATA);
    this.meta = raw_meta ? this.unzip_metadata(raw_meta) : {};
    if (! this.meta.last_collection_id)
      this.meta.last_collection_id = 0;
    if (! this.meta.last_sudoku_id)
      this.meta.last_sudoku_id = 0;
  }

  _save_meta() {
    this.storage.setItem(this.MAIN_METADATA, this.zip_metadata(this.meta));
  }

  is_virgin() {
    // Returns if the database its still virgin
    return (this.meta.last_sudoku_id == 0
            && this.meta.last_collection_id == 0);
  }

  get settings() {
    return this.get_settings();
  }

  get_settings() {
    if (this.cache.settings)
      return this.cache.settings;
    const raw = this.storage.getItem(this.SETTINGS);
    this.cache.settings = raw ? this.unzip_settings(raw) : DEFAULT_SETTINGS;
    return this.cache.settings;
  }

  edit_settings(obj) {
    this.cache.settings = obj;
    this._save_cached_settings();
  }

  edit_settings_property(key, value) {
    this.get_settings(); // Make sure cache is loaded
    this.cache.settings[key] = value;
    this._save_cached_settings();
  }

  _save_cached_settings() {
    this.storage.setItem(this.SETTINGS, this.zip_settings(this.cache.settings));
  }

  reset_all_sudokus() {
    // Resets all sudokus ever stored
    for (const col_id of Object.keys(this.get_collections()))
      this.reset_collection_sudokus(col_id);
  }

  // Collections ///////////////////////////////////////////////////////////////
  
  get collections() {
    return this.get_collections();
  }

  collection(col_id) {
    // Returns the SudokuCollection for the given collection id
    return this.get_collections()[col_id];
  }

  get_collections() {
    if (this.cache.collections)
      return this.cache.collections;

    const raw_col = this.storage.getItem(this.COLLECTIONS_META);
    const col_list = raw_col ? this.unzip_collections(raw_col) : [];
    const res = {};

    for (const col of col_list)
      res[col.id] = new SudokuCollection(col);

    this.cache.collections = res;
    return res;
  }

  add_collection(collection) {
    // Returns the new collection id
    this.get_collections(); // Make sure cache is loaded

    const id = this.meta.last_collection_id + 1;
    this.meta.last_collection_id++;
    this._save_meta();

    collection.id = id;
    this.cache.collections[id] = collection;
    this._save_cached_collections();

    return id;
  }

  edit_collection(id, collection) {
    this.get_collections(); // Make sure cache is loaded
    this.cache.collections[id] = collection;
    this._save_cached_collections();
  }

  edit_collection_property(id, key, value) {
    this.get_collections(); // Make sure cache is loaded
    this.cache.collections[id][key] = value;
    this._save_cached_collections();
  }

  delete_collection(id) {
    // Delete all sudokus of the collection
    for (const sudoid of this.get_collections()[id].sudokus)
      this.delete_sudoku(sudoid);

    // Delete the collection metadata
    this.cache.collections[id] = undefined;
    delete this.cache.collections[id];

    this._save_cached_collections();
  }

  reset_collection_sudokus(id) {
    // Resets all sudokus from the given collection id
    for (const sudo_id of this.collection(id).sudokus)
      this.reset_sudoku(sudo_id);
  }

  _save_cached_collections() {
    const cols = Object.values(this.cache.collections).map(c => c.export());
    console.log("_save_cached_collections", cols);
    this.storage.setItem(this.COLLECTIONS_META, this.zip_collections(cols));
  }

  // Sudokus ///////////////////////////////////////////////////////////////////

  sudoku_state(id) {
    // Returns one of: 'virgin', 'playing', 'solved'
    if (!this.sudoku_play_time(id))
      return 'virgin';
    if (!this.sudoku_solved_date(id))
      return 'playing';
    return 'solved';
  }

  sudoku_original(id) {
    // Returns original sudoku board
    const raw = this.storage.getItem(this.SUDOKU_ORG + id);
    return raw ? new Sudoku(this.unzip_sudoku(raw)) : null;
  }

  sudoku_modified(id) {
    // Returns modified sudoku board
    const raw = (this.storage.getItem(this.SUDOKU_MOD + id)
                 || this.storage.getItem(this.SUDOKU_ORG + id));
    return raw ? new Sudoku(this.unzip_sudoku(raw)) : null;
  }

  sudoku_play_time(id) {
    // Returns sudoku play time in miliseconds
    const raw = this.storage.getItem(this.SUDOKU_SOL_TIME + id);
    return raw ? this.unzip_playtime(raw) : 0;
  }

  sudoku_solved_date(id) {
    // Returns the sudoku solved Date() or false if not solved yet
    const raw = this.storage.getItem(this.SUDOKU_SOL_DATE + id);
    return raw ? this.unzip_date(raw) : false;
  }

  sudoku_hints(id) {
    // Returns the sudoku solved Date() or false if not solved yet
    const raw = this.storage.getItem(this.SUDOKU_HIN + id);
    return new SudokuHints(81, raw); // Hardcoded 81 ‾\_(ツ)_/‾
  }

  sudoku_undo(id) {
    // Returns the sudoku undo stack with an instance of SudokuUndo()
    const raw = this.storage.getItem(this.SUDOKU_UND + id);
    return new SudokuUndo(raw || undefined);
  }

  add_sudoku(original) {
    // Returns the new sudoku id
    const id = this.meta.last_sudoku_id + 1;
    this.meta.last_sudoku_id++;
    this._save_meta();
    return id;
  }

  add_sudoku_batch(sudokus) {
    // Returns a list of the new sudoku ids.
    const res = [];
    let id = this.meta.last_sudoku_id + 1;
    for (const sudo of sudokus) {
      this.storage.setItem(this.SUDOKU_ORG + id, this.zip_sudoku(sudo.serialize()));
      res.push(id++);
    }
    this.meta.last_sudoku_id = id;
    this._save_meta();
    return res;
  }

  edit_sudoku_original(id, sudoku) {
    // Sudoku is an instance of Sudoku()
    const board = sudoku.board;
    this.storage.setItem(this.SUDOKU_ORG + id, this.zip_sudoku(sudoku.serialize()));
  }

  edit_sudoku_modified(id, sudoku) {
    // Sudoku is an instance of Sudoku()
    const board = sudoku.board;
    this.storage.setItem(this.SUDOKU_MOD + id, this.zip_sudoku(sudoku.serialize()));
  }

  edit_sudoku_play_time(id, play_time) {
    this.storage.setItem(this.SUDOKU_SOL_TIME + id, this.zip_playtime(play_time));
  }

  edit_sudoku_solved_date(id, date) {
    // date is a Date() object
    this.storage.setItem(this.SUDOKU_SOL_DATE + id, this.zip_date(date));
  }

  edit_sudoku_hints(id, hints) {
    // hints is an instance of SudokuHints()
    this.storage.setItem(this.SUDOKU_HIN + id, hints.serialize());
  }

  edit_sudoku_undo(id, sudoku_undo) {
    // sudoku_undo is an instance of SudokuUndo()
    this.storage.setItem(this.SUDOKU_UND + id, sudoku_undo.serialize());
  }

  delete_sudoku_hints(id) {
    this.storage.removeItem(this.SUDOKU_HIN + id);
  }

  delete_sudoku_undo(id) {
    this.storage.removeItem(this.SUDOKU_UND + id);
  }

  reset_sudoku(id) {
    // Reset the state of a sudoku to untouched
    this.storage.removeItem(this.SUDOKU_SOL_TIME + id);
    this.storage.removeItem(this.SUDOKU_MOD + id);
    this.storage.removeItem(this.SUDOKU_SOL_DATE + id);
    this.storage.removeItem(this.SUDOKU_HIN + id);
    this.storage.removeItem(this.SUDOKU_UND + id);
  }

  delete_sudoku(id) {
    this.storage.removeItem(this.SUDOKU_MOD + id);
    this.storage.removeItem(this.SUDOKU_ORG + id);
    this.storage.removeItem(this.SUDOKU_SOL_TIME + id);
    this.storage.removeItem(this.SUDOKU_SOL_DATE + id);
    this.storage.removeItem(this.SUDOKU_HIN + id);
    this.storage.removeItem(this.SUDOKU_UND + id);
  }

  nuke() {
    this.storage.clear();
    this.meta = {};
    this.cache = {};
    this.setup();
  }

  // Compression ///////////////////////////////////////////////////////////////

  zip_sudoku(board) {
    if (this.compress)
      return Compressor.compress_sudoku(board);
    return board;
  }

  unzip_sudoku(raw) {
    if (this.compress)
      return Compressor.decompress_sudoku(raw);
    return raw;
  }

  zip_metadata(meta) {
    return JSON.stringify(meta);
  }

  unzip_metadata(raw) {
    return JSON.parse(raw);
  }

  zip_collections(obj) {
    if (this.compress)
      return Compressor.compress_json(obj);
    return JSON.stringify(obj);
  }

  unzip_collections(raw) {
    if (this.compress)
      return Compressor.decompress_json(raw);
    return JSON.parse(raw);
  }

  zip_settings(obj) {
    if (this.compress)
      return Compressor.compress_json(obj);
    return JSON.stringify(obj);
  }

  unzip_settings(raw) {
    if (this.compress)
      return Compressor.decompress_json(raw);
    return JSON.parse(raw);
  }

  zip_playtime(num) {
    if (this.compress)
      return Compressor.compress_number(num);
    return num;
  }

  unzip_playtime(num) {
    if (this.compress)
      return Compressor.decompress_number(num);
    return num;
  }

  zip_date(date) {
    if (this.compress)
      return Compressor.compress_number(+date);
    return +date;
  }

  unzip_date(raw) {
    if (this.compress)
      return new Date(Compressor.decompress_number(raw));
    return new Date(raw);
  }
}

// Export an instance
export default new SudokuDatabase();
