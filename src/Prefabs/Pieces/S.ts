import BasePiece, { TRotation } from "./BasePiece";

class S_Piece extends BasePiece {
  Blocks = {
    0: [[-1,-1], [0,-1], [0,0], [1,0]],
    90: [[0,-1], [0,0], [1,0], [1,1]],
    180: [[-1,-1], [0,-1], [0,0], [1,0]],
    270: [[0,-1], [0,0], [1,0], [1,1]]
  }
  fill = "purple";
  rotation = 0 as TRotation;  
}

export default S_Piece;