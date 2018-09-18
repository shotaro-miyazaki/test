let COLS = 10; //width
let ROWS = 20; //length

let board = []; //interface
let lose; //whether the blocks reached the top
let interval; //game timer
let current; //current shape of the block
let currentX; //position of the current block
let currentY;

//block pattern

let shapes = [
  [1, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 0, 1, 1],
  [0, 1, 0, 0, 1, 1, 1]
];

//color of the blocks

let colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

// empty the board
function init(){
  for (let y = 0; y < ROWS; ++y) {
    board [ y ] = [];
    for (let x = 0; x < COLS; ++x) {
    board[ y ][ x ] = 0;
    }
  }
}

function newShape(){
  let id = Math.floor(Math.random() * shapes.length); //get index randomly
  let shape = shapes [ id ]; //set pattern to the moving block
  current = [];
  for (let y = 0; y < 4; ++y) {
    current [ y ] = [];
    for (let x = 0; x < 4; ++x) {
      let i = 4 * y + x;
      if (typeof shape [ i ] != 'undefined' && shape [ i ]) {
        current[ y ][ x ] = id + 1;
      }else{
        current [ y ][ x ] = 0;
      }
    }
  }

//sets the block above
  currentX = 5;
  currentY = 0;

}

function tick(){
  // 1 cell below
  if (valid(0, 1)) {
    ++currentY;
  }else{ //if already contacted with the surface
    freeze() //block solidified
    clearLines(); //line elimination
    if (lose) { //if game over, play from the beginning

      newGame();
      return false;
    }
    newShape(); //new blocks
  }
}

function valid(offsetX, offsetY, newCurrent) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for (let y = 0; y < 4; ++y) {
    for (let x = 0; x < 4; ++x) {
      if (newCurrent [ y ][ x ]){
        if (typeof board [ y + offsetY ] == 'undefined'
            || typeof board[ y + offsetY][ x + offsetX ] == 'undefined'
            || board[ y + offsetY][x + offsetX]
            || x + offsetX < 0
            || y + offsetY >= ROWS
            || x + offsetX >= COLS) {
                    if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY ==1)
                      console.log('game over');
                      lose = true;
            }
        return false;

      }
    }
  }
  return true;
}

function freeze() {
  for (let y = 0; y < 4; ++y){
    for (let x = 0; x < 4; ++x) {
      if (current[ y ][ x ]){
        board [ y + currentY][ x + currentX] = current[ y ][ x ];
      }
    }
  }
}


function clearLines(){
  for (let y = ROW - 1; y >= 0; --y) {
    let rowFilled = true;
    for (let x = 0; x < COLS; ++x) {
      if (board [ y ][ x ] == 0) {
        rowFilled = false;
        break;
      }
    }
    if (rowFilled) {
      for (let yy = y; yy > 0; --yy){
        for (let x = 0; x < COLS; ++x){
          board [ yy ][ x ] = board [ yy - 1][ x ];
        }
      }
      ++y;
    }
  }
}






function newGame() {
  clearInterval (interval); //reset game timer
  init(); //empty the board
  newShape(); //set a new block
  lose = false; //lose
  interval = setInterval (tick, 250); // 250 miliseconds call a function tick

}
