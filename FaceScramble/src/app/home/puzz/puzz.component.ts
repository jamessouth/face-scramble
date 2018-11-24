import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import { GestureEventData } from "tns-core-modules/ui/gestures";
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
  // width: number;
  // height: number;

  public newLabel: Label;
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

  ttt(e): void {
    console.dir(e.view.row);
    e.view.row = 1;
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
    const tileSize = ((width * .98) / this.size);


    let doable = this.checkBoard();
    while (this.getInversions(doable[0]) % 2 !== 0) {
      doable = this.checkBoard();
    }
    console.log(doable);

    const canvArray = [];

    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        canvArray.push([j, i]);
      }
    }
    console.log(canvArray);

    for(let i = 0; i < (this.size * this.size) - 1; i += 1){
      let newLabel = new Label();
      newLabel.style.backgroundImage = this.image._android;
      newLabel.width = tileSize;
      newLabel.height = tileSize;
      // newLabel.stretch = 'aspectFill';
      newLabel.style.backgroundRepeat = 'no-repeat';
      newLabel.style.backgroundSize = `${this.size}00% ${this.size}00%`;
      newLabel.row = canvArray[doable[1][i]][1];
      newLabel.col = canvArray[doable[1][i]][0];
      newLabel.style.backgroundPosition = `${canvArray[i][0] * 100/(this.size - 1)}% ${canvArray[i][1] * 100/(this.size - 1)}%`;
      grid.addChild(newLabel);

      console.log('w', width, 't', tileSize);
      console.log(`${canvArray[i][0] * 100/(this.size - 1)}% ${canvArray[i][1] * 100/(this.size - 1)}%`);





    }





    // let newLabel2 = new Label();
    // newLabel2.style.backgroundImage = this.image._android;
    // newLabel2.width = tileSize;
    // newLabel2.height = tileSize;
    // // newLabel2.stretch = 'aspectFill';
    // newLabel2.style.backgroundRepeat = 'no-repeat';
    // newLabel2.style.backgroundSize = '200% 200%';
    // newLabel2.row = 0;
    // newLabel2.col = 1;
    // newLabel2.style.backgroundPosition = '100% 0%';
    // grid.addChild(newLabel2);
    //
    // let newLabel3 = new Label();
    // newLabel3.style.backgroundImage = this.image._android;
    // newLabel3.width = tileSize;
    // newLabel3.height = tileSize;
    // // newLabel3.stretch = 'aspectFill';
    // newLabel3.style.backgroundRepeat = 'no-repeat';
    // newLabel3.style.backgroundSize = '200% 200%';
    // newLabel3.row = 1;
    // newLabel3.col = 0;
    // newLabel3.style.backgroundPosition = '0% 100%';
    // grid.addChild(newLabel3);
















  }

}
