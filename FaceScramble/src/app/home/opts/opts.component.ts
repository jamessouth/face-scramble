import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import { Slider } from "tns-core-modules/ui/slider";

@Component({
  selector: "Opts",
  templateUrl: "./app/home/opts/opts.component.html",
  styleUrls: ["./app/home/opts/opts.component.css"]
})
export class OptsComponent implements OnInit {
  color: string;
  // widths: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  // selectedIndex: number;
  width: number;
  height: number;
  red: string = '00';
  green: string = '00';
  blue: string = '00';



  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.data.currentColor$.subscribe(color => this.color = color);
    this.data.currentWidth$.subscribe(width => this.width = width);
    this.data.currentHeight$.subscribe(height => this.height = height);
      // Init your component properties here.
  }

  public onWidthSliderChange(args) {
    // console.log('w ', args.value);
    this.data.changeWidth(Math.floor(args.value));
  }

  public onHeightSliderChange(args) {
    // console.log('h ', Math.floor(args.value));
    this.data.changeHeight(Math.floor(args.value));
  }

  public onRedSliderChange(args) {
    this.red = (Math.floor(args.value)).toString(16);
    this.getHexValue(this.red, this.green, this.blue);
  }

  public onGreenSliderChange(args) {
    this.green = (Math.floor(args.value)).toString(16);
    this.getHexValue(this.red, this.green, this.blue);
  }

  public onBlueSliderChange(args) {
    this.blue = (Math.floor(args.value)).toString(16);
    this.getHexValue(this.red, this.green, this.blue);
  }

  getHexValue(r, g, b) {
    const hex = `#${r.padStart(2, '0')}${g.padStart(2, '0')}${b.padStart(2, '0')}`;
    console.log(hex);
    this.data.changeColor(hex);
  }

}
