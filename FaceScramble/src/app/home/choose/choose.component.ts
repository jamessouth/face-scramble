import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import * as imagepicker from "nativescript-imagepicker";
import { ImageSource } from "image-source";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Image } from "tns-core-modules/ui/image";
import { path, knownFolders } from "tns-core-modules/file-system";

@Component({
  selector: "Choose",
  templateUrl: "./app/home/choose/choose.component.html",
  styleUrls: ["./app/home/choose/choose.component.css"]
})

export class ChooseComponent implements OnInit {
  // imageSrc: any;
  image: Image;
  width: number = 300;
  counter: number = 0;
  // height: number = 300;

  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }










  ngOnInit(): void {
    this.data.currentImage$.subscribe(image => this.image = image);
    // this.data.currentWidth$.subscribe(width => this.width = width);
    // this.data.currentHeight$.subscribe(height => this.height = height);
      // Init your component properties here.
    this.width = isAndroid ? .9 * Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs) : Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
    // console.log(Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs));
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
      if (isAndroid) {
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
      } else {
      console.log('here', screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
        // let localPath = null;
        let nnnn = new ImageSource();
        nnnn.fromAsset(selection[0]).then(imsr => {
          console.log('then');
          this.counter += 1;
          let folder = knownFolders.documents();
          let path2 = path.join(folder.path, "Image" + this.counter + ".jpg");
          let saved = imsr.saveToFile(path2, "jpg");



          // localPath = path2;
          console.log(path2);
          let img = new Image();
          img.src = path2;
          // this.imageSrc = selection.length > 0 ?  : null;
          // console.dir(this.imageSrc);
          // console.dir();

          this.data.changeImage(img);

        });




      }
    }).catch(function (e) {
        console.log(e);
    });
  }

}
