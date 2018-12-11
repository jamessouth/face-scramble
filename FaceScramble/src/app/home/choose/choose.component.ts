import { Component, OnInit } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageSource } from "image-source";
import { isAndroid, screen } from "tns-core-modules/platform";
import { Image } from "tns-core-modules/ui/image";
import { path, knownFolders } from "tns-core-modules/file-system";

import { OptionsService } from '../options.service';

@Component({
  selector: "Choose",
  moduleId: module.id,
  templateUrl: "./choose.component.html",
  styleUrls: ["./choose.component.css"]
})
export class ChooseComponent implements OnInit {
  image: Image;
  width: number = 300;
  counter: number = 0;

  constructor(private data: OptionsService) { }

  ngOnInit(): void {
    this.data.currentImage$.subscribe(image => this.image = image);
    const dips = Math.min(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
    this.width = isAndroid ? .9 * dips : dips;
  }

  private onChoosePhoto(): void {
    const context = imagepicker.create({
        mode: "single"
    });
    this.startSelection(context);
  }

  private startSelection(context): void {
    context.authorize()
    .then(() => context.present())
    .then(selection => {
      if (isAndroid) {
        const img = new Image();
        img.src = selection[0];
        this.data.changeImage(img);
      } else {
        const iosImg = new ImageSource();
        iosImg.fromAsset(selection[0]).then(imsr => {
          this.counter += 1;
          const folder = knownFolders.documents();
          const path2 = path.join(folder.path, `Image${this.counter}.jpg`);
          const saved = imsr.saveToFile(path2, "jpg");
          console.log(path2);
          const img = new Image();
          img.src = path2;
          this.data.changeImage(img);
        });
      }
    }).catch(e => console.log(e));
  }
}
