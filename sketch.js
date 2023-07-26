let tileMapString;
function preload() {
  grassTileSet = loadImage("autotileTest.png");
}
function setup() {
  new Canvas(160, 160, "pixelated");
  document.body.style.backgroundColor = color(255);
  grass = new Group();
  grass.collider = "static";
  grass.w = 8;
  grass.h = 8;
  grass.tile = "g";
  tileMapString = [
    "....................",
    "....................",
    "....................",
    "....................",
    "....................",
    "....................",
    "..............g.....",
    ".....ggg.....gg.....",
    ".....ggg.....gg.....",
    ".....ggg.....ggg....",
    ".....ggg.....ggg....",
    "....gggg.....gggg...",
    "....ggggg...gggggg..",
    "....ggggg.gggggggg..",
    ".ggggggggggggggggggg",
    ".ggggggggggggggggggg",
    ".ggggggggggggggggggg",
    ".ggggggggggggggggggg",
    ".ggggggggggggggggggg",
    ".ggggggggggggggggggg",
  ];
  new Tiles(tileMapString, 0, 0, 8, 8);
  for (let g of grass) {
    g.spriteSheet = grassTileSet;
    g.frameSize = [8, 8];
    g.addAnis({
      imgEmpty: { row: 3, col: 3 },
      imgTop: { row: 2, col: 3 },
      imgRight: { row: 3, col: 0 },
      imgTopRight: { row: 2, col: 0 },
      imgBottom: { row: 0, col: 3 },
      imgTopBottom: { row: 1, col: 3 },
      imgBottomRight: { row: 0, col: 0 },
      imgTopBottomRight: { row: 1, col: 0 },
      imgLeft: { row: 3, col: 2 },
      imgTopLeft: { row: 2, col: 2 },
      imgRightLeft: { row: 3, col: 1 },
      imgTopRightLeft: { row: 2, col: 1 },
      imgBottomLeft: { row: 0, col: 2 },
      imgTopBottomLeft: { row: 1, col: 2 },
      imgBottomRightLeft: { row: 0, col: 1 },
      imgAll: { row: 1, col: 1 },
    });
  }
}
function draw() {
  clear();
  background(255);
  for (let g of grass) {
    let distance = sqrt((mouse.x - g.x) ** 2 + (mouse.y - g.y) ** 2);
    if (distance <= g.w / 2) {
      g.remove();
    }
  }
  autoTile(grass);
}

function autoTile(tileGroup) {
  for (let t of tileGroup) {
    // Assume no neighbors initially
    let tileIndex = 0;
    // Check top neighbor
    for (let otherT of tileGroup) {
      if (t !== otherT && t.y === otherT.y + otherT.h && t.x === otherT.x) {
        tileIndex += 1;
        break;
      }
    }
    // Check right neighbor
    for (let otherT of tileGroup) {
      if (t !== otherT && t.x === otherT.x - t.w && t.y === otherT.y) {
        tileIndex += 2;
        break;
      }
    }
    // Check bottom neighbor
    for (let otherT of tileGroup) {
      if (t !== otherT && t.y === otherT.y - t.h && t.x === otherT.x) {
        tileIndex += 4;
        break;
      }
    }
    // Check left neighbor
    for (let otherT of tileGroup) {
      if (t !== otherT && t.x === otherT.x + otherT.w && t.y === otherT.y) {
        tileIndex += 8;
        break;
      }
    }
    // Update the tile's animation based on the tile index
    switch (tileIndex) {
      case 0: // No neighbors
        t.ani = "imgEmpty";
        break;
      case 1: // Only top neighbor
        t.ani = "imgTop";
        break;
      case 2: // Only right neighbor
        t.ani = "imgRight";
        break;
      case 3: // Top and right neighbors
        t.ani = "imgTopRight";
        break;
      case 4: // Only bottom neighbor
        t.ani = "imgBottom";
        break;
      case 5: // Top and bottom neighbors
        t.ani = "imgTopBottom";
        break;
      case 6: // Right and bottom neighbors
        t.ani = "imgBottomRight";
        break;
      case 7: // Top, right, and bottom neighbors
        t.ani = "imgTopBottomRight";
        break;
      case 8: // Only left neighbor
        t.ani = "imgLeft";
        break;
      case 9: // Top and left neighbors
        t.ani = "imgTopLeft";
        break;
      case 10: // Right and left neighbors
        t.ani = "imgRightLeft";
        break;
      case 11: // Top, right, and left neighbors
        t.ani = "imgTopRightLeft";
        break;
      case 12: // Bottom and left neighbors
        t.ani = "imgBottomLeft";
        break;
      case 13: // Top, bottom, and left neighbors
        t.ani = "imgTopBottomLeft";
        break;
      case 14: // Right, bottom, and left neighbors
        t.ani = "imgBottomRightLeft";
        break;
      case 15: // All neighbors
        t.ani = "imgAll";
        break;
    }
  }
}
