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

  setGridDimensions(el): void {
    // console.log(screen.mainScreen.widthDIPs)
    // const width = Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
    // const tileSize = ((width * .98) / this.size);
    [el.columns, el.rows] = ['auto,'.repeat(this.size - 1) + 'auto', 'auto,'.repeat(this.size - 1) + 'auto'];
    console.log('auto,'.repeat(this.size - 1) + 'auto');
  }

  onGridLoad(el): void {
    let grid = <GridLayout>el;
    this.setGridDimensions(el);





    this.newLabel = new Label();
    this.newLabel.style.backgroundImage = this.image._android;
    this.newLabel.width = 250;
    this.newLabel.height = 250;
    // this.newLabel.stretch = 'aspectFill';
    this.newLabel.style.backgroundRepeat = 'no-repeat';
    this.newLabel.style.backgroundSize = '100% 100%';
    this.newLabel.row = 0;
    this.newLabel.col = 0;
    // this.newLabel.style.backgroundPosition = '100% 100%';
    // this.newImage.rowSpan = 2;
    // this.newImage.colSpan = 2;

    grid.addChild(this.newLabel);




  }

}
