// Chess game starts here

import Avatars, {
  Cannon,
  Chariot,
  General,
  Guard,
  Knight,
  Minister,
  Pawn
} from './models/Avatar';



console.log(General)

// open up server here to provide end points that take in current game status,
// proposal:

// {
//   red_pieces: [
//     {
//       id: 'Chariot1',
//       deceased: true,
//       position: null
//     },
//     { id: 'Knight1'
//       deceased: false,
//       position: [1,2]
//     }
//   ],

//   black_pieces: [
//   ]
// }


// response:

// {
//   move: {
//     id: 'Knight1',
//     to: [2, 4],
//      // other info
//     from: [1,2],
//     score: 123
//   }
// }
