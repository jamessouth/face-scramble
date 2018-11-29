import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import { GestureEventData, TouchGestureEventData } from "tns-core-modules/ui/gestures";
// import { Image } from "tns-core-modules/ui/image";
// import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Label } from "tns-core-modules/ui/label";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Image } from "tns-core-modules/ui/image";

@Component({
  selector: "Puzz",
  templateUrl: "./app/home/puzz/puzz.component.html",
  styleUrls: ["./app/home/puzz/puzz.component.css"]
})
export class PuzzComponent implements OnInit {
  color: string;
  size: number;
  image: Image;

  public taps: number = 0;
  public coordX: number = 0;
  public coordY: number = 0;
  public tileSize: number = 0;

  canvArray: Array<any> = [];

  boardOrder: Array<number> = [];



  onTouch(e: TouchGestureEventData): void {
      // console.log("Object that triggered the event: " + e.object);
      // console.log("View that triggered the event: " + e.view);
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



  getRands(amt: number): Array<number> {
    const nums = new Set();
    while (nums.size < amt) {
      const n: number = Math.floor(Math.random() * amt);
      nums.add(n);
    }
    return Array.from(nums);
  }

  checkBoard() {
    const randos: Array<number> = this.getRands(this.size * this.size - 1);
    const solArray: Array<number> = [];
    randos.forEach((x, i) => {
      solArray[x] = i;
    });
    return [solArray.concat([this.size * this.size - 1]), randos.concat([this.size * this.size - 1])];
  }

  getInversions(arr: Array<number>): number {
    let inversions: number = 0;
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
    // this.blankCoords = [this.size - 1, this.size - 1];
    [el.columns, el.rows] = ['auto,'.repeat(this.size - 1) + 'auto', 'auto,'.repeat(this.size - 1) + 'auto'];
    // console.log('auto,'.repeat(this.size - 1) + 'auto');

    const width: number = Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
    this.tileSize = ((width * .98) / this.size);


    let doable = this.checkBoard();
    while (this.getInversions(doable[0]) % 2 !== 0) {
      doable = this.checkBoard();
    }
    // console.log('do', doable);

    this.boardOrder = doable[1].slice();
    // console.log();
    // console.log('src', this.image.src);
    // console.log();
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        this.canvArray.push([j, i]);
      }
    }
    // console.log(this.canvArray);

    console.log();
    // if(isIOS){
    //   console.log('androiddddddddddddddddddddd');
    // }

    console.dir(this.image.src);


    for(let i = 0; i < (this.size * this.size) - 1; i += 1){
      let newLabel = new Label();
      newLabel.style.backgroundImage = this.image.src;
      newLabel.width = this.tileSize;
      newLabel.height = this.tileSize;
      // newLabel.stretch = 'aspectFill';
      newLabel.style.backgroundRepeat = 'no-repeat';
      newLabel.style.backgroundSize = `${this.size}00% ${this.size}00%`;
      newLabel.col = this.canvArray[i][0];
      newLabel.row = this.canvArray[i][1];
      newLabel.style.backgroundPosition = `${this.canvArray[doable[1][i]][0] * 100/(this.size - 1)}% ${this.canvArray[doable[1][i]][1] * 100/(this.size - 1)}%`;
      // console.log(newLabel.row, newLabel.col);
      // this.boardOrder.push(newLabel);
      grid.addChild(newLabel);

      // console.log('w', width, 't', this.tileSize);
      // console.log(`${this.canvArray[i][0] * 100/(this.size - 1)}% ${this.canvArray[i][1] * 100/(this.size - 1)}%`);


    }

    let newLabel = new Label();
    newLabel.style.backgroundImage = '';
    newLabel.width = this.tileSize;
    newLabel.height = this.tileSize;



    newLabel.col = this.size - 1;
    newLabel.row = this.size - 1;


    grid.addChild(newLabel);


  }




    swapTiles(x: number, y: number, el): void {


      if (this.canvArray.length === 0) { return; }
      this.taps += 1;
      const tileClicked: number = (Math.floor(y / this.tileSize) * this.size) + Math.floor(x / this.tileSize);


      const blank: number = this.boardOrder.indexOf(this.canvArray.length - 1);
      let finalCheck: boolean = false;
      const brdInd: number = this.boardOrder[tileClicked];

      // console.log('nums', blank, brdInd);
      // console.log('bo', this.boardOrder);


      const tilePos: number = Math.abs(tileClicked - blank);

      if (tilePos !== 1 && tilePos !== this.size){
        return;
      }

      el.getChildAt(tileClicked).style.backgroundImage = '';

      // el.getChildAt(tileClicked).style.backgroundImage = '';
      el.getChildAt(blank).style.backgroundImage = this.image.src;
      el.getChildAt(blank).style.backgroundSize = `${this.size}00% ${this.size}00%`;
      el.getChildAt(blank).style.backgroundPosition = `${this.canvArray[brdInd][0] * 100/(this.size - 1)}% ${this.canvArray[brdInd][1] * 100/(this.size - 1)}%`;


      // console.log('bo', this.boardOrder);



      [this.boardOrder[tileClicked], this.boardOrder[blank]] = [this.boardOrder[blank], this.boardOrder[tileClicked]];




      if (this.boardOrder[0] === 0
        && this.boardOrder[this.size - 1] === this.size - 1
        && this.boardOrder[this.size * (this.size - 1) - 1] === this.size * (this.size - 1) - 1
        && this.boardOrder[this.size * this.size - 2] === this.size * this.size - 2
      ) {
        finalCheck = true;
        for (let f = 0; f < this.boardOrder.length; f += 1) {
          if (this.boardOrder[f] !== f) {
            finalCheck = false;
            break;
          }
        }
      }
      if (finalCheck) {
        // faderCanv.style.display = 'block';
        // canvasbutton.style.display = 'none';
        // animateFader();
        // ctx.drawImage(contact, 225, 225, 75, 75,
          // 225, 225, 75, 75);
        el.getChildAt(this.canvArray.length - 1).style.backgroundImage = this.image.src;
        el.getChildAt(this.canvArray.length - 1).style.backgroundSize = `${this.size}00% ${this.size}00%`;
        el.getChildAt(this.canvArray.length - 1).style.backgroundPosition = `${this.canvArray[this.canvArray.length - 1][0] * 100/(this.size - 1)}% ${this.canvArray[this.canvArray.length - 1][1] * 100/(this.size - 1)}%`;
        this.canvArray.splice(0);
      }
    }




}
