/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let turnCounter = 1;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  //completed
  let row = [];
  for(let x = 0; x < WIDTH; x++){
    row.push([])

  }
  //we build the row first pushing the amount of arrays as the value of our WIDTH allows. 

  for(let i = 0; i < HEIGHT; i++){
    console.log(i) //outputting 0,1,2,3,4,5 (6 parts)
    board.push(row)
    //then responding to the value of our HEIGHT variable(number of rows) we push our created row into the number of rows available.

  }
//we now have a table 6X7, implemented correctly, and is responsive to the value of our Width and Height variables respectively.
return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  //comment added to handleClick which is implemented upon a clicked event listener
  //a global variable (turnCounter) is incremented and determines if blue or red took the turn and loggs it to the console. 
  //this is also part of the 2 player turn logic. 
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //here we are building the game itself, where as the top row (variable top) is used to add coins. 
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //for each incremental value of HEIGHT we will add a table row. 
    for (var x = 0; x < WIDTH; x++) {
      //in each row we will add our cells depending on the value of width
      const cell = document.createElement("td");
      //storing our tabledata in a variable named cell
      cell.setAttribute("id", `${y}-${x}`);
      //each cell of our HTMLwill be accessible by document.getElementbyID('y-x') therefore we can access them individually.
      //this will be our secret weapon for our DOM manipulation. 
      row.append(cell);
      //lets add each cell to our row
    }
    htmlBoard.append(row);
    //lets add each row to our html board (HTML element with board ID)
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //x is vertical and y is horizontal indexed x-y
  //x will be passed in from the handleClick function x is the column, (horizontal index
  //console.log(x + "testing") when we click a column  top the x access value is being passed to this function.
  //we want to loop through the rows(y axis values) of each column, to find the first empty cell. or if all empty then the last
  for(let y = 0; y < HEIGHT; y++){
    //we want to check its the furthest unchecked, or last vertical box.
    if(board[x][y + 1] == true || y == HEIGHT){
    
        //if board x (column) i (iterable vertical value) using loose equality
        console.log(`board ${x} row ${y} is empty and the furthest possible point`)
        //this is working nicely now
    

        board[x][y] = [1]; 
        return [x, y]
        
        //working but looping twice
    } else {
      null
    }
    return [y,x]
  }
  
  


}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(x, y) {
  // TODO: make a div and insert into correct table cell
  let selectedCell = document.getElementById(`${x}-${y}`)
  selectedCell.style.backgroundColor = "red";
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  turnCounter++
  turnCounter % 2 === 1? currPlayer = 'red': currPlayer = 'blue'
  console.log(`${currPlayer} just added a coin`)
  console.log(evt.target)
  let columnSelected = evt.target.getAttribute('id')
  let toBeCoined = findSpotForCol(columnSelected);

  //we are identifying now the column selected by its ID attribute 
  //we will pass the column index into our findSpotForCol function
  //placeInTable(findSpotForCol(columnSelected)[0], findSpotForCol(columnSelected)[1]);
  


  
  

  // get next spot in column (if none, ignore click)
  //var y = findSpotForCol(x);
  //if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  

  // check for win
  //if (checkForWin()) {
    //return endGame(`Player ${currPlayer} won!`);
  //}

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
//}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();


