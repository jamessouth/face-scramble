import { Component, OnInit } from "@angular/core";
import { PhotoEditor, PhotoEditorControl } from "nativescript-photo-editor";
import { ImageSource } from "image-source";
import { isAndroid, screen } from "tns-core-modules/platform";

import { OptionsService } from '../options.service';

@Component({
  selector: "Edit",
  moduleId: module.id,
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  imageSrc: any;
  image: any;
  size: number;

  constructor(private data: OptionsService) { }

  ngOnInit(): void {
    this.data.currentImage$.subscribe(image => this.image = image);
    this.data.currentSize$.subscribe(size => this.size = size);
  }

  public onEditPhoto(): void {
    console.log('here');
    // console.dir(screen.mainScreen);
    // const photoEditor = new PhotoEditor();
    // this.startEdit(photoEditor)
  }

  private startEdit(photoEditor): void {
    photoEditor.editPhoto({
    // imageSource: this.imageSource,
    hiddenControls: [
        // PhotoEditorControl.Save,
        // PhotoEditorControl.Crop,
    ],
    }).then((newImage: ImageSource) => {
        // Here you can save newImage, send it to your backend or simply display it in your app
        this.imageSrc = newImage;
        this.data.changeImage(this.imageSrc);
    }).catch((e) => {
        console.error(e);
    });
  }

}
