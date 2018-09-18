document.body.onekeydown = function( e ) {

 let keys = {
   37: 'left',
   39: 'right',
   40: 'down',
   38: 'rotate'
};
  if (typeof keys [e.keyCode] != 'undefined'){
    keyPress(keys[e.keyCode]);
    render();
  }
};

function keyPress (key) {
  switch (key){
  case 'left':
    if (valid(-1)){
      --currentX; //one cell to the left
    }
    break;
  case 'right':
    if(valid (1)){
      ++currentX; //one cell to the right
    }
    break;
  case 'down':
    if(valid (0, 1)){
      ++currentY;
    }
    break;
  case 'rotate':
    let rotated = rotate (current);
    if (valid (0, 0, rotated)){
      current = rotated; //if rotatable, the rotated state will be set as current
    }
    break;
  }
}

//rotate function
function rotate (current){
  let newCurrent = [];
  for (let y = 0; x < 4; ++y) {
    newCurrent [ y ] = [];
    for (let x = 0; x < 4; ++x) {
      newCurrent[ y ][ x ] = current[3 - x][ y ];
    }
  }
  return newCurrent;
}
