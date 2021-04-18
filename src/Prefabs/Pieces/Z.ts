import BasePiece, { TRotation } from "./BasePiece";

class Z_Piece extends BasePiece {
  Blocks = {
    0: [[-1,0], [0,0], [0,1], [1,1]],
    90: [[0, -1], [0,0], [-1,0], [-1, 1]],
    180: [[-1,0], [0,0], [0,1], [1,1]],
    270: [[0, -1], [0,0], [-1,0], [-1, 1]]
  }
  fill = "yellow";
  rotation = 0 as TRotation;  
}

export default Z_Piece;