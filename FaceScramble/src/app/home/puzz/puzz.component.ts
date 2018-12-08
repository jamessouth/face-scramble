import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { OptionsService } from '../options.service';
import { GestureEventData, TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Label } from "tns-core-modules/ui/label";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Image } from "tns-core-modules/ui/image";
import { RouterExtensions } from "nativescript-angular/router";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
// import { Animation } from "tns-core-modules/ui/animation";
import { ModalComponent } from "../modal/modal.component";
import { getBoardOrder, getCanvArray, onWin } from "./puzzutils";

import { setInterval, clearInterval } from "tns-core-modules/timer";




@Component({
  selector: "Puzz",
  providers: [ModalDialogService],
  templateUrl: "./app/home/puzz/puzz.component.html",
  styleUrls: ["./app/home/puzz/puzz.component.css"]
})
export class PuzzComponent implements OnInit {
  color: string;
  size: number;
  image: Image;
  abtitle: Label;
  moves: number = 0;
  time: number = 0;
  timer: any;
  tileSize: number = 0;
  canvArray: Array<any> = [];
  boardOrder: Array<number> = [];
  grid: GridLayout;
  gameOver: boolean = false;

  onTouch(e: TouchGestureEventData): void {
    if(e && e.action === 'down'){
      this.swapTiles(e.getX(), e.getY());
    }
  }

  startTimer(): void {
    this.timer = setInterval(() => this.time++, 1000);
  }

  onPlayAgain(): void {
    this.data.changeSize(2);
    this.data.changeColor('#000000');
    this.routerExtensions.navigate(['/opts'], {
      clearHistory: true,
      transition: {
            name: "slideRight",
            duration: 900,
            curve: AnimationCurve.cubicBezier(.1, .84, .55, .96)
        }
    });
  }

  onHint(): void {
    this.showModal();
  }

  tapHandler(): void {
    this.gameOver ? this.onPlayAgain() : this.onHint();
  }

  showModal(): void {
    const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {}
    };
    this.modalService.showModal(ModalComponent, options);
  }

  constructor(
    private data: OptionsService,
    private routerExtensions: RouterExtensions,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.data.currentColor$.subscribe(color => this.color = color);
    this.data.currentSize$.subscribe(size => this.size = size);
    this.data.currentImage$.subscribe(image => this.image = image);
    this.canvArray = getCanvArray(this.size);
    this.boardOrder = getBoardOrder(this.size);
  }





  onLoadTitle(el): void {
    this.abtitle = el;
  }



  onGridLoad(el): void {
    [el.columns, el.rows] = ['auto,'.repeat(this.size - 1) + 'auto', 'auto,'.repeat(this.size - 1) + 'auto'];
    this.grid = <GridLayout>el;
    const width: number = Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
    this.tileSize = ((width * .98) / this.size);
    for(let i = 0; i < (this.size * this.size) - 1; i += 1){
      let newLabel = new Label();
      newLabel.style.backgroundImage = isAndroid ? this.image.src._android : this.image.src;
      newLabel.width = this.tileSize;
      newLabel.height = this.tileSize;
      newLabel.style.backgroundRepeat = 'no-repeat';
      newLabel.style.backgroundSize = `${this.size}00% ${this.size}00%`;
      newLabel.col = this.canvArray[i][0];
      newLabel.row = this.canvArray[i][1];
      newLabel.style.backgroundPosition = `${this.canvArray[this.boardOrder[i]][0] * 100/(this.size - 1)}% ${this.canvArray[this.boardOrder[i]][1] * 100/(this.size - 1)}%`;
      this.grid.addChild(newLabel);
    }
    let newLabel = new Label();
    newLabel.style.backgroundImage = '';
    newLabel.width = this.tileSize;
    newLabel.height = this.tileSize;
    newLabel.col = this.size - 1;
    newLabel.row = this.size - 1;
    this.grid.addChild(newLabel);
  }

  swapTiles(x: number, y: number): void {
    if (this.canvArray.length === 0) { return; }
    const tileClicked: number = (Math.floor(y / this.tileSize) * this.size) + Math.floor(x / this.tileSize);
    const blank: number = this.boardOrder.indexOf(this.canvArray.length - 1);
    const tilePos: number = tileClicked - blank;
    if (blank % this.size === 0) {
      if (tilePos !== -this.size && tilePos !== 1 && tilePos !== this.size){
        return;
      }
    } else if ((blank + 1) % this.size === 0) {
      if (tilePos !== -this.size && tilePos !== -1 && tilePos !== this.size){
        return;
      }
    } else {
      if (Math.abs(tilePos) !== 1 && Math.abs(tilePos) !== this.size){
        return;
      }
    }
    const brdInd: number = this.boardOrder[tileClicked];
    this.moves += 1;
    if (this.moves === 1) {
      // const now = ;
      this.startTimer();
    }
    this.grid.getChildAt(tileClicked).style.backgroundImage = '';
    this.grid.getChildAt(blank).style.backgroundImage = isAndroid ? this.image.src._android : this.image.src;
    this.grid.getChildAt(blank).style.backgroundSize = `${this.size}00% ${this.size}00%`;
    this.grid.getChildAt(blank).style.backgroundPosition = `${this.canvArray[brdInd][0] * 100/(this.size - 1)}% ${this.canvArray[brdInd][1] * 100/(this.size - 1)}%`;
    [this.boardOrder[tileClicked], this.boardOrder[blank]] = [this.boardOrder[blank], this.boardOrder[tileClicked]];
    let finalCheck: boolean = false;
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
      this.grid.getChildAt(this.canvArray.length - 1).style.backgroundImage = isAndroid ? this.image.src._android : this.image.src;
      this.grid.getChildAt(this.canvArray.length - 1).style.backgroundSize = `${this.size}00% ${this.size}00%`;
      this.grid.getChildAt(this.canvArray.length - 1).style.backgroundPosition = `${this.canvArray[this.canvArray.length - 1][0] * 100/(this.size - 1)}% ${this.canvArray[this.canvArray.length - 1][1] * 100/(this.size - 1)}%`;
      this.canvArray.splice(0);
      this.gameOver = true;
      clearInterval(this.timer);
      onWin(this.abtitle);
    }
  }
}
