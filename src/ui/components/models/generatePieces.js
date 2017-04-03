import Chariot from './avatars/Chariot'
import Knight from './avatars/Knight'
import Minister from './avatars/Minister'
import Guard from './avatars/Guard'
import General from './avatars/General'
import Cannon from './avatars/Cannon'
import Pawn from './avatars/Pawn'


function generatePieces(player) {
  var coordinates = this.coordinates;
  var {faction} = player;

  if (faction === 'black') {
    var blackPieces = [
      new Chariot({coordinate: coordinates[0][0]}),
      new Chariot({coordinate: coordinates[8][0]}), // uncomment
      // new Chariot({coordinate: coordinates[7][5]}), // for testing remove

      new Knight({coordinate: coordinates[1][0]}),
      new Knight({coordinate: coordinates[7][0]}),

      new Minister({coordinate: coordinates[2][0]}),
      new Minister({coordinate: coordinates[6][0]}),

      new Guard({coordinate: coordinates[3][0]}),
      new Guard({coordinate: coordinates[5][0]}),

      new General({coordinate: coordinates[4][0], player}),

      new Cannon({coordinate: coordinates[1][2]}),
      new Cannon({coordinate: coordinates[7][2]}),

      new Pawn({coordinate: coordinates[0][3]}),
      new Pawn({coordinate: coordinates[2][3]}),
      new Pawn({coordinate: coordinates[4][3]}),
      new Pawn({coordinate: coordinates[6][3]}),
      new Pawn({coordinate: coordinates[8][3]})
    ]

    blackPieces.map((piece) => {
      piece.faction = 'black';
      piece.player = player;
    })
    return blackPieces;
  }
  else if (faction === 'red') {
    var redPieces = [
      new Chariot({coordinate: coordinates[0][9] }),
      new Chariot({coordinate: coordinates[8][9] }),

      new Knight({coordinate: coordinates[1][9] }),
      new Knight({coordinate: coordinates[7][9] }),

      new Minister({coordinate: coordinates[2][9] }),
      new Minister({coordinate: coordinates[6][9] }),

      new Guard({coordinate: coordinates[3][9] }),
      new Guard({coordinate: coordinates[5][9] }),

      new General({coordinate: coordinates[4][9], player}),

      new Cannon({coordinate: coordinates[1][7]}),
      new Cannon({coordinate: coordinates[7][7]}),

      new Pawn({coordinate: coordinates[0][6]}),
      new Pawn({coordinate: coordinates[2][6]}),
      new Pawn({coordinate: coordinates[4][6]}),
      new Pawn({coordinate: coordinates[6][6]}),
      new Pawn({coordinate: coordinates[8][6]})
    ]

    redPieces.map((piece) => {
      piece.faction = 'red';
      piece.player = player;
    })
    return redPieces;
  }
}



export default generatePieces
