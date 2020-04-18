export function getMatrix<T>(cols: number, rows: number, fill: T): T[][] {
  return Array(cols).fill(null).map(() => Array(rows).fill(fill));
}

export function transpose<T>(matrix: T[][]): T[][] {
  let transposed = getMatrix<T>(matrix[0].length, matrix.length, null);

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[0].length; y++) {
      transposed[y][x] = matrix[x][y];
    }
  }

  return transposed;
}