import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import { GestureEventData, TouchGestureEventData } from "tns-core-modules/ui/gestures";
// import { Image } from "tns-core-modules/ui/image";
// import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Label } from "tns-core-modules/ui/label";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";


@Component({
  selector: "Puzz",
  templateUrl: "./app/home/puzz/puzz.component.html",
  styleUrls: ["./app/home/puzz/puzz.component.css"]
})
export class PuzzComponent implements OnInit {
  color: string;
  size: number;
  image: any;


  public coordX: number = 0;
  public coordY: number = 0;
  public tileSize: number = 0;

  canvArray: any = [];

  boardOrder: any = [];

  onTouch(e: TouchGestureEventData) {
      // console.log("Object that triggered the event: " + e.object);
      // console.log("View that triggered the event: " + e.view);
      // console.log("Event name: " + e.eventName);
      // console.log("Touch action (up, down, cancel or move)" + e.action);
      // console.log("Touch point: [" + e.getX() + ", " + e.getY() + "]");
      // console.log("activePointers: " + e.getActivePointers().length);
      if(e && e.action === 'down'){
        this.coordX = e.getX();
        this.coordY = e.getY();
        console.log(this.coordX, this.coordY);
        this.swapTiles(this.coordX, this.coordY, e.view);
      }

      // console.log();
      // console.dir(args);
  }


  // width: number;
  // height: number;

  // public newLabel: Label;
  // public IMAGE_URL: string = '~/images/project12.jpg';

  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // this.data.currentWidth$.subscribe(width => this.width = width);
    // this.data.currentHeight$.subscribe(height => this.height = height);
    this.data.currentColor$.subscribe(color => this.color = color);
    this.data.currentSize$.subscribe(size => this.size = size);
    this.data.currentImage$.subscribe(image => this.image = image);

  }



  getRands(amt) {
    const nums = new Set();
    while (nums.size < amt) {
      const n = Math.floor(Math.random() * amt);
      nums.add(n);
    }
    return Array.from(nums);
  }

  checkBoard() {
    const randos = this.getRands(this.size * this.size - 1);
    const solArray = [];
    randos.forEach((x, i) => {
      solArray[x] = i;
    });
    return [solArray.concat([this.size * this.size - 1]), randos.concat([this.size * this.size - 1])];
  }

  getInversions(arr) {
    let inversions = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] == null) { continue; }
      for (let j = 0; j < arr.length; j += 1) {
        if (arr[i] > arr[j + i]) {
          inversions += 1;
        }
      }
    }
    return inversions;
  }






  onGridLoad(el): void {
    let grid = <GridLayout>el;
    [el.columns, el.rows] = ['auto,'.repeat(this.size - 1) + 'auto', 'auto,'.repeat(this.size - 1) + 'auto'];
    console.log('auto,'.repeat(this.size - 1) + 'auto');

    const width = Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
    this.tileSize = ((width * .98) / this.size);


    let doable = this.checkBoard();
    while (this.getInversions(doable[0]) % 2 !== 0) {
      doable = this.checkBoard();
    }
    console.log('do', doable);

    this.boardOrder = doable[1].slice();



    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        this.canvArray.push([j, i]);
      }
    }
    console.log(this.canvArray);




    for(let i = 0; i < (this.size * this.size) - 1; i += 1){
      let newLabel = new Label();
      newLabel.style.backgroundImage = this.image._android;
      newLabel.width = this.tileSize;
      newLabel.height = this.tileSize;
      // newLabel.stretch = 'aspectFill';
      newLabel.style.backgroundRepeat = 'no-repeat';
      newLabel.style.backgroundSize = `${this.size}00% ${this.size}00%`;
      newLabel.col = this.canvArray[i][0];
      newLabel.row = this.canvArray[i][1];
      newLabel.style.backgroundPosition = `${this.canvArray[doable[1][i]][0] * 100/(this.size - 1)}% ${this.canvArray[doable[1][i]][1] * 100/(this.size - 1)}%`;
      console.log(newLabel.row, newLabel.col);
      // this.boardOrder.push(newLabel);
      grid.addChild(newLabel);

      console.log('w', width, 't', this.tileSize);
      console.log(`${this.canvArray[i][0] * 100/(this.size - 1)}% ${this.canvArray[i][1] * 100/(this.size - 1)}%`);

    }

  }



    swapTiles(x, y, el) {

      if (this.canvArray.length === 0) { return; }
      const tileClicked = (Math.floor(y / this.tileSize) * this.size) + Math.floor(x / this.tileSize);
      console.log('tile', tileClicked);
      // console.log('board', this.boardOrder[tileClicked].col, this.boardOrder[tileClicked].row);
      console.log('coords', el.getChildAt(tileClicked).col, el.getChildAt(tileClicked).row);

      const blank = this.boardOrder.indexOf(this.canvArray.length - 1);
      let finalCheck;
      const brdInd = this.boardOrder[tileClicked];
      if (![1, this.size].includes(Math.abs(tileClicked - blank))) {
        return;
      }
      // ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], 75, 75);
      ctx.drawImage(contact, canvArray[brdInd][0], canvArray[brdInd][1], 75, 75,
        canvArray[blank][0], canvArray[blank][1], 75, 75);
      [this.boardOrder[tileClicked], this.boardOrder[blank]] = [this.boardOrder[blank], this.boardOrder[tileClicked]];
      if (this.boardOrder[0] === 0 && this.boardOrder[3] === 3
        && this.boardOrder[11] === 11 && this.boardOrder[14] === 14) {
        finalCheck = true;
        for (let f = 0; f < this.boardOrder.length; f += 1) {
          if (this.boardOrder[f] !== f) {
            finalCheck = false;
            break;
          }
        }
      }
      if (finalCheck) {
        faderCanv.style.display = 'block';
        canvasbutton.style.display = 'none';
        animateFader();
        ctx.drawImage(contact, 225, 225, 75, 75,
          225, 225, 75, 75);
        canvArray.splice(0);
      }
    }














}
