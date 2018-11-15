import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';

@Component({
  selector: "Puzz",
  templateUrl: "./app/home/puzz/puzz.component.html",
  styleUrls: ["./app/home/puzz/puzz.component.css"],
  providers: [OptionsService]
})
export class PuzzComponent implements OnInit {
  color: string;

  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.data.currentColor$.subscribe(color => this.color = color);
      // Init your component properties here.
  }

}
