import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Label } from "tns-core-modules/ui/label";
import { isAndroid, screen } from "tns-core-modules/platform";
import { Image } from "tns-core-modules/ui/image";
import { RouterExtensions } from "nativescript-angular/router";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { setTimeout, clearTimeout } from "tns-core-modules/timer";
import { ModalComponent } from "../modal/modal.component";
import { getBoardOrder, getCanvArray, onWinAnd, onWinIOS } from "./puzzutils";
import { OptionsService } from '../options.service';

@Component({
  selector: "Puzz",
  moduleId: module.id,
  providers: [ModalDialogService],
  templateUrl: "./puzz.component.html",
  styleUrls: ["./puzz.component.css"]
})
export class PuzzComponent implements OnInit {
  color: string;
  size: number;
  image: Image;
  abtitle: Label;
  moves: number = 0;
  time: number = 0;
  timer: number;
  tileSize: number = 0;
  canvArray: Array<Array<number>> = [];
  boardOrder: Array<number> = [];
  grid: GridLayout;
  gameOver: boolean = false;

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

  onTouch(e: TouchGestureEventData): void {
    if (e && e.action === 'down') {
      this.swapTiles(e.getX(), e.getY());
    }
  }

  timerCtrl(mil: number): void {
    function adj(mil: number): void {
      this.timer = setTimeout((): void => {
        this.time += 1000;
        adj.call(this, mil);
      }, 1000 - new Date().getMilliseconds() + mil);
    }
    adj.call(this, mil);
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

  onLoadTitle(el: Label): void {
    this.abtitle = el;
  }

  onGridLoad(el): void {
    [el.columns, el.rows] = ['auto,'.repeat(this.size - 1) + 'auto', 'auto,'.repeat(this.size - 1) + 'auto'];
    this.grid = <GridLayout>el;
    const width: number = Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
    this.tileSize = ((width * .98) / this.size);
    for(let i = 0; i < (this.size * this.size) - 1; i += 1){
      const newLabel = new Label();
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
    const newLabel = new Label();
    newLabel.style.backgroundImage = '';
    newLabel.width = this.tileSize;
    newLabel.height = this.tileSize;
    newLabel.col = this.size - 1;
    newLabel.row = this.size - 1;
    this.grid.addChild(newLabel);
  }

  isInvalidTile(tile, blank): boolean {
    if (blank % this.size === 0) {
      if (tile !== -this.size && tile !== 1 && tile !== this.size) {
        return true;
      }
    } else if ((blank + 1) % this.size === 0) {
      if (tile !== -this.size && tile !== -1 && tile !== this.size) {
        return true;
      }
    } else {
      if (Math.abs(tile) !== 1 && Math.abs(tile) !== this.size) {
        return true;
      }
    }
    return false;
  }

  getTileAndBlank(x, y): Array<number> {
    const tile = (Math.floor(y / this.tileSize) * this.size) + Math.floor(x / this.tileSize);
    const blank = this.boardOrder.indexOf(this.canvArray.length - 1);
    return [tile, blank];
  }

  setImageSizePosition(tile, pos): void {
    this.grid.getChildAt(tile).style.backgroundImage = isAndroid ? this.image.src._android : this.image.src;
    this.grid.getChildAt(tile).style.backgroundSize = `${this.size}00% ${this.size}00%`;
    this.grid.getChildAt(tile).style.backgroundPosition = `${pos[0] * 100/(this.size - 1)}% ${pos[1] * 100/(this.size - 1)}%`;
  }

  updatePuzzle(tile, ind, blank): void {
    this.grid.getChildAt(tile).style.backgroundImage = '';
    this.setImageSizePosition(blank, this.canvArray[ind]);
  }

  updateBoardOrder(tile, blank): void {
    [this.boardOrder[tile], this.boardOrder[blank]] = [this.boardOrder[blank], this.boardOrder[tile]];
  }

  checkForWin(): boolean {
    let finalCheck = false;
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
    return finalCheck;
  }

  swapTiles(x: number, y: number): void {
    if (this.canvArray.length === 0) { return; }
    const [tileClicked, blank] = this.getTileAndBlank(x, y);
    if (this.isInvalidTile(tileClicked - blank, blank)) { return; }
    this.moves += 1;
    this.moves === 1 && this.timerCtrl(new Date().getMilliseconds());
    const brdInd: number = this.boardOrder[tileClicked];
    this.updatePuzzle(tileClicked, brdInd, blank);
    this.updateBoardOrder(tileClicked, blank);
    if (this.checkForWin()) {
      this.setImageSizePosition(this.canvArray.length - 1, this.canvArray[this.canvArray.length - 1]);
      this.canvArray.splice(0);
      this.gameOver = true;
      clearTimeout(this.timer);
      isAndroid ? onWinAnd(this.abtitle) : onWinIOS(this.abtitle);
    }
  }
}
