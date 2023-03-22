import {encode as base32768_encode, decode as base32768_decode} from 'base32768';
import lzstring from 'lz-string';

/*
  Data compression to squeeze space in LocalStorage

  # Stadistics
   - JSON: A little less than half the size
   - Sudoku board: from 81 to an avarage of 18 for originals and 22 for modifieds
   - Numbers: from number of digits to ⌈log2(num)⌉

  # Notes
  ## Sudoku Board
  Can only store single digit numbers: [0-9]

  # Explainations
  ## Sudoku
  A sudoku board is codded in base32768.
  This is to abuse the fact that in localStorage, chars are stored in UTF-16
  Numbers in a sudoku board are paired in a single number: [8,7,3,2] → 87,32
  Then the array of 8bit numbers gets encoded into base32768.

  ## JSON
  JSON objects get stringified and passed through lzstring compression
  https://pieroxy.net/blog/pages/lz-string/index.html
*/

const SUDOKU_SIZE = 81;
const ZERO_AHEAD = 100;
const ZERO_SKIP = 200;
const MAX_ZEROS = 55;

function encode_integer_to_unit8array(num) {
  // Returns a Uint8Array with 4 elements.
  // Encodes numbers from -(2^31) to (2^31)-1
  return Uint8Array.of(
    (num & 0xff000000) >> 24,
    (num & 0x00ff0000) >> 16,
    (num & 0x0000ff00) >>  8,
    (num & 0x000000ff) >>  0,
  );
}

function decode_unit8array_to_integer(arr) {
  // Returns an integer from an Uint8Array
  let n = 0;
  for (const byte of arr.values())
    n = (n<<8) | byte;
  return n;
}

function encode_bigint_to_unit8array(number) {
  // Encodes up to 2^63
  // https://stackoverflow.com/questions/69721296/how-to-encode-integer-to-uint8array-and-back-to-integer-in-javascript
  if (number == 0)
    return new Uint8Array(0);

  const len = Math.ceil(Math.log2(number) / 8) || 1;
  const byteArray = new Uint8Array(len);

  for (let index = 0; index < byteArray.length; index++) {
    const byte = number & 0xff;
    byteArray[index] = byte;
    number = (number - byte) / 256;
  }

  return byteArray;
}

function decode_unit8array_to_bigint(byteArray) {
  // Returns a number from a unit8array
  let result = 0;
  for (let i = byteArray.length - 1; i >= 0; i--)
    result = (result * 256) + byteArray[i];

  // Edge case. Powers of two
  if (result == 0 && byteArray.length)
    return Math.pow(256, byteArray.length);

  return result;
}

export default {
  'lzstring': lzstring,
  'base32768_encode': base32768_encode,
  'base32768_decode': base32768_decode,

  compress_sudoku(board) {
    // Join numbers in pairs, and compress repetitive zeros
    const pairs = [];
    let res = [];
    let i = 0;
    let zeros = 0;
    while (i < board.length) {

      // Compress zeros
      if (board[i] == 0 && board[i+1] == 0) {
        zeros = 2;
        i = i + 2;
        while (board[i] == 0 && zeros < MAX_ZEROS) {
          zeros++;
          i++;
        }
        pairs.push(ZERO_SKIP + zeros);
      }

      // Compress a zero ahead
      else if (board[i] != 0 && board[i+1] == 0 && board[i+2] > 0) {
        pairs.push(ZERO_AHEAD + (10*board[i]) + (+board[i+2]));
        i = i + 3;
      }
      
      // Add a pair of numbers
      else if (i+1 < board.length) {
        pairs.push(10*board[i] + (+board[i+1]));
        i = i + 2;
      }

      // This is the last digit, special case.
      else {
        pairs.push(+board[i]);
        i++;
      }

    }

    return base32768_encode(new Uint8Array(pairs));
  },

  decompress_sudoku(zboard) {
    const data = base32768_decode(zboard);
    let res = [];
    let i = 0;
    while (i < data.length) {

      // Zero skips
      if (data[i] > ZERO_SKIP) {
        for (let z = data[i] - ZERO_SKIP; z > 0; z--)
          res.push(0);
      }

      // Zero ahead
      else if (data[i] > ZERO_AHEAD) {
        res.push(((data[i]-ZERO_AHEAD) / 10) >> 0);
        res.push(0);
        res.push((data[i]-ZERO_AHEAD) % 10);
      }

      // Last special digit
      else if (i == data.length-1 && res.length == SUDOKU_SIZE-1) {
        res.push(data[i]);
      }

      // Decompress the two digits
      else {
        res.push((data[i] / 10) >> 0);
        res.push(data[i] % 10);
      }

      i++;
    }

    // Cut to a sudoku size, because we might have an extra irrelvant number
    // let size = Math.pow(Math.floor(Math.sqrt(res.length)), 2) >> 0;

    return res; // res.slice(0, size);
  },

  compress_integer(number) {
    return base32768_encode(encode_integer_to_unit8array(number));
  },

  decompress_integer(raw) {
    return decode_unit8array_to_integer(base32768_decode(raw));
  },

  compress_number(number) {
    return base32768_encode(encode_bigint_to_unit8array(number));
  },

  decompress_number(raw) {
    return decode_unit8array_to_bigint(base32768_decode(raw));
  },

  compress_json(obj) {
    return lzstring.compress(JSON.stringify(obj));
  },

  decompress_json(raw) {
    return JSON.parse(lzstring.decompress(raw));
  },
};
