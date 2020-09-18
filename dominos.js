const createDeck = () => {
  const tiles = [];
  for (let i = 0; i < 7; i++) {
    for (let k = i; k < 7; k++) {
      tiles.push([i, k]);
    }
  }
  return tiles;
};

const pickRandom = (tiles) => {
  let index = Math.floor(Math.random() * tiles.length);

  return tiles.splice(index, 1)[0];
};

const pickHand = (tiles) => {
  const hand = [];
  for (let i = 0; i < 7; i++) {
    hand.push(pickRandom(tiles));
  }
  return hand;
};

const playTurn = (tiles, hand, board) => {
  const b1 = board[0][0];
  const b2 = board[board.length - 1][1];
  for (let i = 0; i < hand.length; i++) {
    const n1 = hand[i][0];
    const n2 = hand[i][1];
    if (n1 == b1) {
      setTimeout(1000);
      board.unshift([n2, n1]);
      return hand.splice(i, 1);
    } else if (n1 == b2) {
      board.push([n1, n2]);
      return hand.splice(i, 1);
    } else if (n2 == b1) {
      board.unshift([n1, n2]);
      return hand.splice(i, 1);
    } else if (n2 == b2) {
      board.push([n2, n1]);
      return hand.splice(i, 1);
    }
  }

  if (tiles.length == 0) {
    console.log('no tiles left, opponent wins');
    throw 'no tiles left';
  } else {
    hand.push(pickRandom(tiles));
    return playTurn(tiles, hand, board);
    
  }
};

const game = () => {
  const tiles = createDeck();
  const board = [pickRandom(tiles)];
  const handA = pickHand(tiles);
  const handB = pickHand(tiles);

  while (true) {
    if (handB.length > 0) {
      const tile = playTurn(tiles, handA, board);
      console.log(`Player A plays ${tile} `); 
      console.log(board.reduce((acc, next) => `${acc}<${next[0]}:${next[1]}>`,""));
    } else {
      console.log('B WINS!!!');
      break;
    }
  

    if (handA.length > 0) {
      const tile = playTurn(tiles, handB, board);
      console.log(`Player B plays ${tile} `);
      console.log(board.reduce((acc, next) => `${acc}<${next[0]}:${next[1]}>`,""));
    } else { 
      console.log('A WINS!!!');
      break;
    }
    
  }
};
game();
