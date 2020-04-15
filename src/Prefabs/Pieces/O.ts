import BasePiece, { TRotation } from "./BasePiece";

const blocks = [[0,0], [1,0], [0,1], [1,1]];

class O_Piece extends BasePiece {
  Blocks = {
    0: blocks,
    90: blocks,
    180: blocks,
    270: blocks
  }
  fill = "red";
  rotation = 0 as TRotation;

  
}

export default O_Piece;