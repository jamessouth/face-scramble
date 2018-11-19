import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import { GestureEventData } from "tns-core-modules/ui/gestures";

@Component({
  selector: "Puzz",
  templateUrl: "./app/home/puzz/puzz.component.html",
  styleUrls: ["./app/home/puzz/puzz.component.css"]
})
export class PuzzComponent implements OnInit {
  color: string;
  width: number;
  height: number;

  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.data.currentWidth$.subscribe(width => this.width = width);
    this.data.currentHeight$.subscribe(height => this.height = height);
    this.data.currentColor$.subscribe(color => this.color = color);
      // Init your component properties here.
      // , e.view._styleScope, e.view.cssClasses
  }

  ttt(e): void {
    console.dir(e.view.row);
    e.view.row = 1;

  }

}
