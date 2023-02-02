/*Connect Four
 Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 column until a player gets four-in-a-row (horiz, vert, or diag) or until board fills (tie)*/
let WIDTH = 7;
let HEIGHT = 6; //using let for both WIDTH and HEIGHT variables to use with Jasmine testing, checking edge cases. 
let turnCounter = 1; //used in combination with our currPlayer
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
let row = []
/*
for(let y = 0; y < HEIGHT; y++){
  row.push(0)
}
for(let x = 0; x < WIDTH; x++){
  board.push(row)

With my original board impl as the row was not declared within the loop, we pushed 0 to the row each time correctly
however we ended up pushing the same row array reference each time to the board. making reassignment of one individual cell not possible
essentially it would update every array of board each time. I leave it here for now as I learnt a valuable lesson. 
*/
for(let y = 0; y < WIDTH; y++){
/*for each incremental value of WIDTH, we redeclare a new array of the board 
if we were to declare the row outside of a loop, we would not create a new one each time and therefore would reference the same
each time, meaning if we were to reassignwe would update the same row element in every row. (which was my problem before)
  */
  let row = [];
  for(let x = 0; x < HEIGHT; x++){
    //for now we loop through the value of HEIGHT of each column, and for each incremental value of WIDTH we push an empty array(cell)
    //into our row (created freshly with each outer for loop
    row.push(0)
  }
  //still in the outer loop but after each inner for loop completes (full amount of iterations) we will push our fully formed row to the board
  board.push(row)
}
  return board
}
function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board'); //completed
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
  /*here we are building the game itself in the HTML markup, where as the top row (variable top) is used to add coins. 
  implemented with a event listener, and an clickHandler function. */
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //for each incremental value of HEIGHT we will add a table row. 
    for (var x = 0; x < WIDTH; x++) {
      //in each row we will add our cells depending on the value of width
      const cell = document.createElement("td");
      //storing our tabledata in a variable named cell
      cell.setAttribute("id", `${y}-${x}`);
      /*each cell of our HTMLwill be accessible by document.getElementbyID('y-x') therefore we can access them individually.
      important to note that Y is iterating over the HEIGHT variable and X the width. 
      Therefore with our HTML board y is the vertical position (0-5) and x is the horizontal (0-6)
      To make this responsive with our JS we need to make our board (array of arrays) reflect this somehow. */
      row.append(cell);
    }
    htmlBoard.append(row);
 //lets add each row to our html board (HTML element with board ID)
  }
}
function findSpotForCol(col,player) {
/*x is vertical and y is horizontal indexed x-y, x will be passed in from the ClickHandler, via the event.target
we want to loop through the rows(y axis values) of each column, to find the first empty cell. or if all empty then the last
if we click column 1, we will pass the value of 0 to this function. (indexed from 0) 
0 = the horizontal position (the column) how deep we go into the column is determined by the following conditional*/
  for(let row = 0; row < HEIGHT; row++){

    if(board[col][0] !== 0){
      null
    } else {
    //we want to check its the furthest unchecked, or last vertical box.
    if (board[col][row + 1] !== 0 || row == HEIGHT -1){
    
        //if board x (column) i (iterable vertical value) using loose equality
        
        //conditions will update array if the one after it is full, or its the last spot. 
        board[col][row] = `${currPlayer}`;
        return row
    } else {
      null
    }
    }
  }
  //return value is our x and y co-ordinates. 
}
function placeInTable(col, row, color) {
 try {
  let selectedCell = document.getElementById(`${row}-${col}`);
  let innerDiv = document.createElement('div');
  innerDiv.classList.add('piece')
  innerDiv.style.backgroundColor = `${currPlayer}`;
  selectedCell.appendChild(innerDiv)
 } catch (error) {
  alert("The column is full! Try another");
  
 };
}
function endGame(msg) {
  alert(`${currPlayer} wins!`);
}

function handleClick(evt) {
  var x = +evt.target.id;
  // TODO: switch currPlayer 1 <-> 2 (completed) the conditional below will toggle between player 1 and 2, 
  //if the column is full, the user will recieve and alert and the turnCounter will not increment, allowing the player to try agian.

  if(board[x][0] !== 0){
    null;
  } else {
    turnCounter++

  }

  turnCounter % 2 === 1? currPlayer = 'red': currPlayer = 'blue';
  turnCounter % 2 === 1? turnKeep.innerText="Now Blue can drop a coin" : turnKeep.innerText = "Now Red can drop a coin"
  //a global variable (turnCounter) is incremented and determines if red or blue is up, facillitating the 2 player logic.
  //We pass x (the id of evt.target clicked) to our findSpotForCol function 
  //With this, we can find the next available space for that particular column.

  placeInTable(x,findSpotForCol(x,currPlayer),currPlayer)
  if(checkForTie() == true){alert("its a tie")}
  if(checkForWin() === true){
    endGame()
  }
  //we are identifying now the column selected by its ID attribute 
  //we will pass the column index into our findSpotForCol function to get next spot in column (if none, ignore click)
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // check for tie (yet to do )
  let checkForTie = () => {

    return board.every(val => {
     return val.every(val => {
         return val !== 0;
     })
    })
    //when the board is full we sucessfully receive the "its a tie" prompt. (tested and works)
  }

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
 /* I understand the majority of what goes on here, and in the planning stage at the start of the exercise I thought 
   I would have to write it myself and here were my predictions, lets see how they compeare

A vertical win

when the coin drops 
if (array[i][0].hasAttribute('red') && array[i + 1][0].hasAttribute('red') && array[i + 2][0] && array[i + 3][0]){
    prompt('red has won the game!')}
A horizontal win
if (array[0][i].hasAttribute('red') && array[0][i + 1].hasAttribute('red') && array[0][i + 2] && array[0][i + 3]){
    prompt('red has won the game!')}
A diagonal win
let i = event.target (supposed to map to the vertical/horizontal array which the coin falls)
if (array[0][i].hasAttribute('red') && array[1][i + 1].hasAttribute('red') && array[2][i + 2] && array[3][i + 3]){
    prompt('red has won the game!')}
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
let gameReset = () => {
for (let arr = 0; arr < board.length; arr++){
  for (let subArr = 0; subArr < board[arr].length; subArr++){

   
  board[arr][subArr] = 0;
  }
  

  
}

for(let x = 0; x < HEIGHT;x++){
  for(let y = 0; y < WIDTH; y++){
  let selectedCell = document.getElementById(`${x}-${y}`);
  selectedCell.innerHTML =""

  }
}
}
let turnKeep = document.createElement('h1') //a header element notifying the players who is up next


turnKeep.innerText = `drop a coin to start the game!`;
//creating reset button on the DOM
let reset = document.createElement('button')
reset.innerText = "Reset Game"
document.body.append(turnKeep)
document.body.append(reset)
reset.addEventListener('click', gameReset)


makeBoard();
makeHtmlBoard();


