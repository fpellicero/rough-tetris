import BasePiece, { TRotation } from "./BasePiece";

class L_Piece extends BasePiece {
  Blocks = {
    0: [[1,1], [0,1], [0,0], [0,-1]],
    90: [[-1,1], [-1,0], [0,0], [1,0]],
    180: [[0,-1], [0,0], [0,1], [-1,-1]],
    270: [[-1,0], [0,0], [1,0], [1,-1]]
  }
  fill = "grey";
  rotation = 0 as TRotation;  
}

export default L_Piece;