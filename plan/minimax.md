# Minimax

```js
{
  Max_options: [
    {
      option: 1,
      response_option1: 3,
      response_option1: 12,
      response_option1: 8
    },
    {
      option: 2,
      response_option1: 2,
      response_option1: 4,
      response_option1: 6
    },
    {
      option: 3,
      response_option1: 14,
      response_option1: 5,
      response_option1: 2
    }
  ]
}
```

for player Max to make a decision, it will look at all the Min's decisions, and get the minimum of those values in each move

```js
{
  Max_options: [
    {
      option: 1,
      minimum: 3 // got this by taking Min(3, 12, 8)
    },
    {
      option: 2,
      minimum: 2
    },
    {
      option: 3,
      minimum: 2  
    },
  ]
}
```

now Max make a decision based on information, so he takes the Max([option1, option2, option3], 'minimum'), which assumes the other player plays optimally.


## Pseudocode for Minimax
```js
function Minimax(state) {
  v = max_value(state)
  return action in successors(state) with value v
}

function max_value(state) {
  if terminal(s)
    return utility(s)
  v = -infinity
  for a,s in successors(state) do
    v = max(v, min_value(s))
  return v
}

function min_value(state) {
  if terminal9s)
    return utility(s)
  v = +infinity
  for a,s in successors(state) do
    v = min(v, max_value(s))
  return v
}  
```


# Alpha Beta Pruning
Represent the worst possible outcome you would be willing to accept. Or a nuclear option.
Alpha - Maximizer's nuclear option, failsafe, look for higher number
Beta - Minimizer's nuclear option, failsafe, look for lower number

so before we start, we set failsafe:
Alpha = -Infinity
Beta  = Infinity
So they don't get picky :),

Beta = Infinity defaults to each first Minimizer children, b/c they are reconsidered

```
Max      A      <- (A starts with `+Inf` initially B's branch,
        / \           and use updated Alpha computing C )
Min   B     C    <- (Both B and C starts with Beta = `-Inf`)
     / \   / \
Max D1 E2 F3 G4
```



## Principles
### Go down the tree in Depth First Search pattern.

### Prune
If you are currently an Alpha (Maximizer node), and you see an Alpha that is Greater than the parent's Beta, you ignore the rest of the current Alpha nodes.

(vice-versa) If you are currently evaluating a Beta (Minimizer node), and you see its parent Alpha (Maximizer node) is Greater than your beta, you ignore the rest of the current Beta nodes.


```
Min    B (here beta = 2)
      / \
Max E-2  F
        / \
Min   K-3 L-0
          (skip(prune) this guy b/c K is 3, which is greater than Beta(B) or 2)
```


### Deep cutoff
Comparing Min with Max Node across hierarchies, in this case, comparing `1` with root with Alpha set to `7` from previous calculations.
```
\X = deep cutoff

Max           Root 7
               /      \
Min           7        8
             /\       / \
Max         7  9     8   9  
           /\  /\x   /\X /\x
Min       7 3 9  2  1 8  9 3
```
### Sanity check for which ones you can skip(or prune)(and not evaluate):
**if the node is +Infinity or -Infinity, would it change anything?**
If No both times, you can definitely prune it.

in the case above:

if L is `-Inf`, Max of F will pick 3 instead
if L is `+Inf`, Min wont even pick this branch, b/c its a forfeit!



## Pseudo-Code for Alpha Beta Pruning
```js
function Minimax(state) {
  v = max_value(state, -Infinity, Infinity)
  return action in successors(state) with value v
}

function max_value(state, Alpha, Beta) {
  if terminal(s)
    return utility(s)
  v = -infinity
  for a,s in successors(state) {
    v = max(v, min_value(result(s, a), Alpha, Beta))
    if v >= Beta return v
    Alpha = max(Alpha, v)
  }
  return v
}

function min_value(state, Alpha, Beta) {
  if terminal(s)
    return utility(s)
  v = +infinity
  for a,s in successors(state) do
    v = min(v, max_value(result(s, a), Alpha, Beta))
    if v <= Alpha return v
    Beta = min(Beta, v)
  return v
}  
```
