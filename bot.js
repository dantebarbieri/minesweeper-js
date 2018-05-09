class Bot {
  constructor() {
    this.revealedCount = 0;
    let r = int(random(board.length));
    let c = int(random(board[r].length));
    if (!generated) {
      do {
        initialize();
        generate();
      } while (board[r][c].neighborCount != 0);
      generated = true;
    }
    board[r][c].reveal();
  }

  select() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].revealed) {
          if (board[i][j].playableCount > 0 && board[i][j].flagCount == board[i][j].neighborCount) {
            for (let xoff = -1; xoff <= 1; xoff++) {
              for (let yoff = -1; yoff <= 1; yoff++) {
                let c = j + xoff;
                let r = i + yoff;
                if (c > -1 && c < board[0].length && r > -1 && r < board.length) {
                  if (!board[r][c].revealed && !board[r][c].f) {
                    if (cheats) {
                      if (!board[r][c].b) {
                        board[r][c].reveal();
                        return;
                      }
                    } else {
                      board[r][c].reveal();
                      return;
                    }
                  }
                }
              }
            }
          }
          if (board[i][j].playableCount == board[i][j].neighborCount - board[i][j].flagCount) {
            for (let xoff = -1; xoff <= 1; xoff++) {
              for (let yoff = -1; yoff <= 1; yoff++) {
                let c = j + xoff;
                let r = i + yoff;
                if (c > -1 && c < board[0].length && r > -1 && r < board.length) {
                  if (!board[r][c].f && !board[r][c].revealed) {
                    board[r][c].f = true;
                    num_flags++;
                    return;
                  }
                }
              }
            }
          }
        }
      }
    }
    let r;
    let c;
    do {
      r = int(random(board.length));
      c = int(random(board[r].length));
    } while (board[r][c].revealed || board[r][c].f);
    if (cheats) {
      if (!board[r][c].b) {
        board[r][c].reveal();
        return;
      }
    } else {
      board[r][c].reveal();
      return;
    }
    return;
  }
}