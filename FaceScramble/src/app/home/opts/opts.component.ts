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
  red: number = 0;
  green: number = 0;
  blue: number = 0;



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
    console.log('w ', args.value);
    this.data.changeWidth(args.value);
  }

  public onHeightSliderChange(args) {
    console.log('h ', args.value);
    this.data.changeHeight(args.value);
  }

  public onRedSliderChange(args) {
    this.red = args.value;
    this.getHexValue(this.red.toString(16), this.green.toString(16), this.blue.toString(16));
  }

  public onGreenSliderChange(args) {
    this.green = args.value;
    this.getHexValue(this.red.toString(16), this.green.toString(16), this.blue.toString(16));
  }

  public onBlueSliderChange(args) {
    this.blue = args.value;
    this.getHexValue(this.red.toString(16), this.green.toString(16), this.blue.toString(16));
  }

  getHexValue(r, g, b) {
    if (r.length < 2) {
      r = `0${r}`
    }
    if (g.length < 2) {
      g = `0${g}`
    }
    if (b.length < 2) {
      b = `0${b}`
    }

    const hex = `#${r}${g}${b}`;
    console.log(hex);
    this.data.changeColor(hex);
  }

  // newColor() {
  //   this.data.changeColor('#000123');
  // }
}
