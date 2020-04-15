import BasePiece, { TRotation } from "./BasePiece";

class I_Piece extends BasePiece {
  Blocks = {
    0: [[-1,0], [0,0], [1,0], [2,0]],
    90: [[0,-1], [0,0], [0,1], [0,2]],
    180: [[-2,0], [-1,0], [0,0], [1,0]],
    270: [[0,-2], [0,-1], [0,0], [0, 1]]
  }
  fill = "black";
  rotation = 270 as TRotation;  
}

export default I_Piece;