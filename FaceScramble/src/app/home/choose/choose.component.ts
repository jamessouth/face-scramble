import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import * as imagepicker from "nativescript-imagepicker";
// import { ImageSource, fromFile } from "image-source";

import { Image } from "tns-core-modules/ui/image";

@Component({
  selector: "Choose",
  templateUrl: "./app/home/choose/choose.component.html",
  styleUrls: ["./app/home/choose/choose.component.css"]
})

export class ChooseComponent implements OnInit {
  // imageSrc: any;
  image: Image;



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
    // let that = this;

    context
    .authorize()
    .then(() => {

        // this.imageSrc = null;
        return context.present();
    })
    .then((selection) => {
        // console.log("Selection done: " + JSON.stringify(selection));
        // console.dir(selection);
        let img = new Image();
        img.src = selection[0];
        // this.imageSrc = selection.length > 0 ?  : null;
        // console.dir(this.imageSrc);
        // console.dir();

        this.data.changeImage(img);
        // console.log('imagesrc', fromFile(this.imageSrc._android).width);
        // console.log();
        // console.log('this', this.image);

    }).catch(function (e) {
        console.log(e);
    });
  }

}
