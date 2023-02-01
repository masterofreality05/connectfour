/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let WIDTH = 7;
let HEIGHT = 6; //using let for both WIDTH and HEIGHT variables to use with Jasmine testing, checking edge cases. 
let turnCounter = 1;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
/* makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
let row = []
/*
for(let y = 0; y < WIDTH; y++){
  row.push(0)
}
for(let x = 0; x < HEIGHT; x++){
  board.push(row)

this code was passing the same subarr reference of "row" to each array element of board
we declared let row at the start of the function, then added sub array elements
and for each incrememntal value of WIDTH we pushed row over and over, the 'same array'
now solved with a nested Loop. but why?
*/
for(let y = 0; y < HEIGHT; y++){
/*for each incremental value of HEIGHT, we redeclare a new row (hopefully altering its reference)
if we were to declare the row outside of a loop, we would not create a new one each time and therefore would reference the same
each time, meaning if we were to reassignwe would update the same row element in every row. (which was my problem before)
  */
  let row = [];
  for(let x = 0; x < WIDTH; x++){
    //for now we loop through the iterable WIDTH on each row, and for each incremental value of WIDTH we push an empty array(cell)
    //into our row (created freshly with each outer for loop
    row.push(0)
  }
  //still in the outer loop but after each inner for loop completes (full amount of iterations) we will push our fully formed
  //row to the board
  board.push(row)
}
//then we return the board from our makeBoardFunction. 
  return board
}

function makeHtmlBoard() {

  const htmlBoard = document.getElementById('board'); //completed
 
  // TODO: add comment for this code
  //comment added to handleClick which is implemented upon a clicked event listener
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
  //here we are building the game itself in the HTML markup, where as the top row (variable top) is used to add coins. 
  //implemented with a event listener, and an clickHandler function. 
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
      //important to note that Y is iterating over the HEIGHT variable and X the width. 
      //Therefore with our HTML board y is the vertical position (0-5) and x is the horizontal (0-6)
      //To make this responsive with our JS we need to make our board (array of arrays) reflect this somehow. 
      row.append(cell);
      //lets add each cell to our row
    }
    htmlBoard.append(row);
    //lets add each row to our html board (HTML element with board ID)
  }
}
function findSpotForCol(col,player) {
  //x is vertical and y is horizontal indexed x-y
  //x will be passed in from the handleClick function x is the column, (horizontal index
  //console.log(x + "testing") when we click a column  top the x access value is being passed to this function.
  //we want to loop through the rows(y axis values) of each column, to find the first empty cell. or if all empty then the last
 //if we click column 1, we will pass the value of 0 to this function. 
 //what should we do with that? 
 //0 = the horizontal position, aka the column, how deep we go into the column is determined by what is not yet filled.
  for(let row = 0; row < HEIGHT; row++){

    if(board[col][0] !== 0){
      null
      
    } else {
    //we want to check its the furthest unchecked, or last vertical box.
    if (board[col][row + 1] !== 0 || row == HEIGHT -1){
    
        //if board x (column) i (iterable vertical value) using loose equality
        console.log(`board ${col} row ${row} is empty and the furthest possible point`)
        //this is working nicely now, 
        //conditions will update array if the one after it is full, or its the last spot. 
        //updating our board array JS nice and good. 
        board[col][row] = `${currPlayer}`;
        return row

    } else {
      null
    }
    }
  }
  //returning our x and y access in our board JS table. 
}
/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(col, row, color) {
  // TODO: make a div and insert into correct table cell
 try {
  let selectedCell = document.getElementById(`${row}-${col}`);
  selectedCell.style.backgroundColor = `${currPlayer}`;
 } catch (error) {
  console.log('The column is fulL!'); 
 };
}
function endGame(msg) {
  prompt(`${currPlayer} wins!`);
}
/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  // switch players
  // TODO: switch currPlayer 1 <-> 2 (completed)
  turnCounter++
  turnCounter % 2 === 1? currPlayer = 'red': currPlayer = 'blue';
  //a global variable (turnCounter) is incremented and determines if blue or red took the turn and loggs it to the console. 
  //this is also part of the 2 player turn logic.
  console.log(`${currPlayer} just added a coin`);
  //with the get attribute method on our evt.target we can select the column number when clicked
  //if we pass this to our findSpotForCol function we can find the next available space for that particular column,

  placeInTable(x,findSpotForCol(x,currPlayer),currPlayer)
  if(checkForWin() === true){
    endGame()
  }
  //we are identifying now the column selected by its ID attribute 
  //we will pass the column index into our findSpotForCol function
  //placeInTable(findSpotForCol(columnSelected)[0], findSpotForCol(columnSelected)[1]);
  // get next spot in column (if none, ignore click)
  //var y = findSpotForCol(x);
  //if (y === null)
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // check for tie (yet to do )
  let checkForTie = () => {
  }
  // TODO: check if all cells in board are filled; if so call, call endGame
/** checkForWin: check board cell-by-cell for "does a win start here?" */

 // check for win
  //if (checkForWin()) {
    //return endGame(`Player ${currPlayer} won!`);
  //}
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
  /*TODO: read and understand this code. Add comments to help you.
  I understand the majority of what goes on here, and in the planning stage at the start of the exercise I thought 
   I would have to write it myself and here were my predictions, lets see how they compeare
A vertical win

when the coin drops 
if (array[i][0].hasAttribute('red') && array[i + 1][0].hasAttribute('red') && array[i + 2][0] && array[i + 3][0]){
    prompt('red has won the game!')
}
A horizontal win
if (array[0][i].hasAttribute('red') && array[0][i + 1].hasAttribute('red') && array[0][i + 2] && array[0][i + 3]){
    prompt('red has won the game!')
}
A diagonal win
let i = event.target (supposed to map to the vertical/horizontal array which the coin falls)
if (array[0][i].hasAttribute('red') && array[1][i + 1].hasAttribute('red') && array[2][i + 2] && array[3][i + 3]){
    prompt('red has won the game!')
}
What I thought would be the case is that when we drop the coin we would have to account for vertical +1,+2,+3 and -1-2-3
but it seems to not totally be the case, going to read and understand how this is working. 
   */
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];


      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }

}
makeBoard();
makeHtmlBoard();


