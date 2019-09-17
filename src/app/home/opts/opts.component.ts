import { Component, OnInit } from "@angular/core";
// import { Slider } from "tns-core-modules/ui/slider";

import { OptionsService } from '../options.service';

@Component({
  selector: "Opts",
  moduleId: module.id,
  templateUrl: "./opts.component.html",
  styleUrls: ["./opts.component.css"]
})
export class OptsComponent implements OnInit {
  color: string;
  size: number;
  red: string = '00';
  green: string = '00';
  blue: string = '00';

  constructor(private data: OptionsService) { }

  ngOnInit(): void {
    this.data.currentColor$.subscribe(color => this.color = color);
    this.data.currentSize$.subscribe(size => this.size = size);
  }

  onSizeSliderChange(args): void {
    this.data.changeSize(Math.floor(args.value));
  }

  onRedSliderChange(args): void {
    this.red = (Math.floor(args.value)).toString(16);
    this.getHexValue(this.red, this.green, this.blue);
  }

  onGreenSliderChange(args): void {
    this.green = (Math.floor(args.value)).toString(16);
    this.getHexValue(this.red, this.green, this.blue);
  }

  onBlueSliderChange(args): void {
    this.blue = (Math.floor(args.value)).toString(16);
    this.getHexValue(this.red, this.green, this.blue);
  }

  getHexValue(r, g, b): void {
    const hex = `#${r.padStart(2, '0')}${g.padStart(2, '0')}${b.padStart(2, '0')}`;
    this.data.changeColor(hex);
  }
}
