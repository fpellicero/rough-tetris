import BasePiece, { TRotation } from "./BasePiece";

class T_Piece extends BasePiece {
  Blocks = {
    0: [[-1,0], [0,0], [0,-1], [1,0]],
    90: [[0, -1], [0,0], [0,1], [1, 0]],
    180: [[-1,0], [0,0], [1,0], [0,1]],
    270: [[0, -1], [0,0], [0,1], [-1, 0]]
  }
  fill = "green";
  rotation = 0 as TRotation;  
}

export default T_Piece;