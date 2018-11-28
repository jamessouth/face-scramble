import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import * as imagepicker from "nativescript-imagepicker";
import { ImageSource, fromFile } from "image-source";

@Component({
  selector: "Choose",
  templateUrl: "./app/home/choose/choose.component.html",
  styleUrls: ["./app/home/choose/choose.component.css"]
})

export class ChooseComponent implements OnInit {
  imageSrc: any;
  image: any;


  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.data.currentImage$.subscribe(image => this.image = image);
    // this.data.currentWidth$.subscribe(width => this.width = width);
    // this.data.currentHeight$.subscribe(height => this.height = height);
      // Init your component properties here.
  }

  public onChoosePhoto(): void {
    const context = imagepicker.create({
        mode: "single"
    });
    this.startSelection(context);
  }

  private startSelection(context) {
    let that = this;

    context
    .authorize()
    .then(() => {

        that.imageSrc = null;
        return context.present();
    })
    .then((selection) => {
        console.log("Selection done: " + JSON.stringify(selection));
        console.dir(selection);

        that.imageSrc = selection.length > 0 ? selection[0] : null;
        console.dir(this.imageSrc);
        // console.dir();

        this.data.changeImage(this.imageSrc);
        // console.log('imagesrc', fromFile(this.imageSrc._android).width);
        console.log();
        console.log('this', this.image);

    }).catch(function (e) {
        console.log(e);
    });
  }

}
