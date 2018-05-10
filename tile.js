class Tile {

  constructor(x, y, r, c, w, h) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.w = w;
    this.h = h;
    this.b = false;
    this.f = false;
    this.pickedBomb = false;
    this.revealed = false;
    this.flagCount = 0;
    this.neighborCount = 0;
    this.revealedCount = 0;
    this.unrevealedCount = 0;
    this.playableCount = 0;
  }

  show() {
    stroke(229);
    this.revealed ? fill(0) : fill(45);
    rect(this.x, this.y, this.w, this.h);
    if (this.revealed) {
      switch (this.neighborCount) {
        case -1:
          this.pickedBomb ? fill(255) : this.f ? fill(0, 0, 0) : fill(255, 0, 0);
          ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2);
          break;
        case 0:
          break;
        case 1:
          fill(0, 0, 200);
          break;
        case 2:
          fill(0, 200, 200);
          break;
        case 3:
          fill(0, 200, 0);
          break;
        case 4:
          fill(200, 200, 0);
          break;
        case 5:
          fill(200, 0, 0);
          break;
        case 6:
          fill(200, 0, 200);
          break;
        case 7:
          fill(200, 100, 200);
          break;
        case 8:
          fill(200, 200, 200);
          break;
        default:
          break;
      }
      if (this.neighborCount > 0) {
        text(this.neighborCount, this.x + this.w / 2, this.y + 7 * this.h / 8);
      }
    } else if (this.f) {
      fill(200, 75, 0);
      triangle(this.x, this.y, this.x, this.y + this.h, this.x + sqrt(3) * this.w / 2, this.y + this.h / 2);
    }
  }

  clicked() {
    return this.x < mouseX && mouseX < this.x + this.w && this.y < mouseY && mouseY < this.y + this.h;
  }

  countPlayable() {
    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let c = this.c + xoff;
        let r = this.r + yoff;
        if (!(xoff == 0 && yoff == 0) && c > -1 && c < board[0].length && r > -1 && r < board.length) {
          let neighbor = board[r][c];
          if (!neighbor.f && !neighbor.revealed) {
            total++;
          }
        }
      }
    }
    this.playableCount = total;
  }

  countRevealed() {
    let total = 0;
    let sum = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let c = this.c + xoff;
        let r = this.r + yoff;
        if (!(xoff == 0 && yoff == 0) && c > -1 && c < board[0].length && r > -1 && r < board.length) {
          let neighbor = board[r][c];
          if (neighbor.revealed) {
            total++;
          } else {
            sum++;
          }
        }
      }
    }
    this.revealedCount = total;
    this.unrevealedCount = sum;
  }

  countNeighbors() {
    if (this.b) {
      this.neighborCount = -1;
      return;
    }
    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let c = this.c + xoff;
        let r = this.r + yoff;
        if (!(xoff == 0 && yoff == 0) && c > -1 && c < board[0].length && r > -1 && r < board.length) {
          let neighbor = board[r][c];
          if (neighbor.b) {
            total++;
          }
        }
      }
    }
    this.neighborCount = total;
  }

  countFlags() {
    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let c = this.c + xoff;
        let r = this.r + yoff;
        if (!(xoff == 0 && yoff == 0) && c > -1 && c < board[0].length && r > -1 && r < board.length) {
          let neighbor = board[r][c];
          if (neighbor.f) {
            total++;
          }
        }
      }
    }
    this.flagCount = total;
  }

  reveal() {
    // console.log(this);
    if (this.b) {
      this.pickedBomb = true;
      gameover = true;
    }
    this.revealed = true;
    this.f = false;
    if (this.neighborCount == 0) {
      this.floodFill();
    }
  }

  update() {
    this.countNeighbors();
    this.countRevealed();
    this.countPlayable();
    this.countFlags();
  }

  floodFill() {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let c = this.c + xoff;
        let r = this.r + yoff;
        if (c > -1 && c < board[0].length && r > -1 && r < board.length) {
          let neighbor = board[r][c];
          if (!neighbor.b && !neighbor.revealed) {
            neighbor.reveal();
          }
        }
      }
    }
  }

  autoFill() {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let c = this.c + xoff;
        let r = this.r + yoff;
        if (c > -1 && c < board[0].length && r > -1 && r < board.length) {
          let neighbor = board[r][c];
          if (!neighbor.f && !neighbor.revealed) {
            neighbor.reveal();
          }
        }
      }
    }
  }

}