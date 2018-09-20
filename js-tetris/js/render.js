let canvas = document.getElementsByTagName('canvas')[ 0 ];
let ctx = canvas.getContext('2d');
let W = 300, H = 600;
let BLOCK_W = W / COLS;
let BLOCK_H = H / ROWS;

function drawBlock(x, y) {
  ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
  ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

function render (){
  ctx.clearRect(0, 0, W, H); //clear canvas
  ctx.strokeStyle = 'black'; //color set to black

  //make a board
  for (let x = 0; x < COLS; ++x){
    for (let y = 0; y < ROWS; ++y){
      //if the cell is not
     if ( board[ y ][ x ] ) {  // ãƒžã‚¹ãŒç©ºã€ã¤ã¾ã‚Š0ã‚ƒãªã‹ã£ãŸã‚‰
        ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];  // ãƒžã‚¹ã®ç¨®é¡žã«åˆã‚ã›ã¦å¡—ã‚Šã¤ã¶ã™è‰²ã‚’è¨­å®š
        drawBlock( x, y );  // ãƒžã‚¹ã‚’æç”»
      }
    }
  }
  //make a block
  for (let y = 0; y < 4; ++y) {
    for(let x = 0; x < 4; ++x) {
      if (current[ y ][ x ]) {
        ctx.fillStyle = colors[current [ y ][ x ] - 1];
        drawBlock (currentX + x, currentY + y);
      }
    }
  }
}

setInterval (render, 30);
