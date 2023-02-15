export class Life {
  grid: number[][];

  constructor(existing_grid: number[][]) {
    this.grid = this.grid_cleanup(existing_grid);
  }

  // Takes a grid in a variety of forms and returns the grid format that our routines expect.
  grid_cleanup(cleanme): number[][] {
    return cleanme;
  }

  print() {
    this.grid.forEach(function (row) {
      let printrow: string = '';
      row.forEach(function (cell) {
        printrow += cell + ' ';
      })
      console.log(printrow);
    })
  }

  // returns the number of neighbors for a given cell in the grid
  num_neighbors(grid:number[][], row:number, column:number):number {
    let count = 0;
    [row-1, row, row+1].forEach(function (cur_row) {
      [column-1, column, column+1].forEach(function (cur_column) {
        if (cur_column == column && cur_row == row) { return; }  // don't count ourselves
        if (cur_row >= 0 && cur_row < grid.length && cur_column >= 0 && cur_column < grid[row].length) {
          count += grid[cur_row][cur_column];
        }
      })
    })
    return count;
  }

  // Transitions our grid to the next state.
  transition() {
    let self = this;
    let old_grid = self.grid;
    let new_grid: number[][] = [];
    let row_idx = 0;
    old_grid.forEach(function (row) {
      new_grid.push([]);
      let column_idx = 0;
      row.forEach(function (cell) {
        let neighbs:number = self.num_neighbors(old_grid, row_idx, column_idx);
        if (neighbs < 2)
        {
          // Any live cell at time T with < 2 live neighbors dies (by underpopulation)
          new_grid[row_idx].push(0); 
        } 
        else if ((neighbs == 2 || neighbs == 3) && old_grid[row_idx][column_idx] == 1)
        {
          // Any live cell at time T with exactly 2 or 3 live neighbors survives
          new_grid[row_idx].push(1); 
        } 
        else if (neighbs > 3)
        {
          // Any live cell at time T with > 3 live neighbors dies (by overpopulation)
          new_grid[row_idx].push(0);
        }
        else if (neighbs == 3 && old_grid[row_idx][column_idx] == 0)
        {
          // Any dead cell with exactly 3 live neighbors becomes alive (by reproduction)
          new_grid[row_idx].push(1);
        }
        else
        {
          // Copy all other cells from old grid
          new_grid[row_idx].push(old_grid[row_idx][column_idx]);
        }
        column_idx++;
      })
      row_idx++;
    })

    this.grid = new_grid;
  }
}

let conway = new Life([[0,1,0],[0,1,0],[0,1,0]]);
conway.transition();
conway.print();