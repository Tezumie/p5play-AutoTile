# p5Play-AutoTile
a function you can add to your projects to allow for autotiling at runtime. great for mining games and simpler level designing.

How to use:

![tileLayout](https://github.com/Tezumie/p5Play-AutoTile/assets/102488626/6b9b9216-2398-4a3a-84d5-afb95dd6aa57)

- you will need to create a tileset for the tile you want to have autotile enabled with, it must be in this exact layout to work.
  
- preload your image: grassTileSet = loadImage("autotileTest.png");
  
- create a group that you will use with your tileset: 
   grass = new Group();
  grass.collider = "static";
  grass.w = 8;
  grass.h = 8;
  grass.tile = "g";
  
- make a tilemap with new Tiles(), use "g" or your tiles ID.
 I have a great tool available where you can draw and edit maps easily here:https://tezumie.github.io/p5play-Tile-Map-Editor/

-add the animations to your Group like this, after making the new Tiles() ;
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
  
- and Finally whenever you want to autotile your tiles, just call  autoTile(grass), or the name of your group as the argument. thats it!
  you can call it when a block breaks, or you place a block, or just once after level creation if you dont plan on runtime map editing.

 ![autotile](https://github.com/Tezumie/p5Play-AutoTile/assets/102488626/d4ea046f-d5e4-46a9-8a2a-6082ca267a72)
