import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';

@Component({
  selector: "Opts",
  templateUrl: "./app/home/opts/opts.component.html",
  styleUrls: ["./app/home/opts/opts.component.css"],
  providers: [OptionsService]
})
export class OptsComponent implements OnInit {
  color: string;

  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.data.currentColor$.subscribe(color => this.color = color);
      // Init your component properties here.
  }

  newColor() {
    this.data.changeColor('#000123');
  }
}
