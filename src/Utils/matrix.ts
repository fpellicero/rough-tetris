export function getMatrix<T>(cols: number, rows: number, fill: T): T[][] {
  return Array(cols).fill(null).map(() => Array(rows).fill(fill));
}