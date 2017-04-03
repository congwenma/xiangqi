# Diagram

http://plantuml.com/class-diagram#Body

# Classes

```
Matrix:
  - hasMany: coordinates
  - get Rows
  - view

Board > Matrix:
  - static#from constructor
    * construct a board with given pieces placed on the board
  - hasMany: avatars
  - get piece at position
  - check victory

Coordinates:
  - hasOne: avatar, null: true

Avatar:
  - id (1 - 5)
  - name (Chariot)
  - toSingle (R)
  - faction
  - hasOne: board, inverse: true
  - position -> coordinate

XiangQi:
  - hasOne: board
  - currentPlayer
```




## Intellij AI Flow

1. Get all current possible moves for all pieces
2. Evaluate current state

3. Pick a random move out of all total set
  * (can be optimized by checking the more powerful pieces first)
4. Alpha Beta Prune through 2-7 depths from this position
5. Go back to Step 1: Get all current possible moves

6. Repeat through steps 1 - 5 until reaching `DEPTH`, evaluate depth state
7. alpha beta prune.


## XiangQi work flow
1. start game
2. Red (human) makes a move
3. Black (computer) respond
    - calls AlphaBetaPruner & EvalModel
    - makes the move
4. repeat 2-3, until end condition occurs in either 2 or 3


## XiangQi min-max implementation - straight flow
Red moves first, so Red is human, Black(computer) responds:

Red: max player
Black: min player, constructs the max min trees, needs to finds the lowest number

1. Construct a tree of all moves possible in shallow depth
  - construct a node for each variation of the board for 2 depth: `Min - (44x)Max - (44x)Leaf`
  - evaluate all `Leaf` values
2. Run search and pass the value decisions up the tree



# X, Y mappings
red
 |
black

black - red


