import { Component, OnInit } from "@angular/core";
import { OptionsService } from '../options.service';
import { PhotoEditor, PhotoEditorControl } from "nativescript-photo-editor";
import { ImageSource } from "image-source";

@Component({
  selector: "Edit",
  templateUrl: "./app/home/edit/edit.component.html",
  styleUrls: ["./app/home/edit/edit.component.css"]
})

export class EditComponent implements OnInit {
  imageSrc: any;
  // previewSize: number = 300;
  image: string;


  constructor(private data: OptionsService) {
      // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.data.currentImage$.subscribe(image => this.image = image);
    // this.data.currentWidth$.subscribe(width => this.width = width);
    // this.data.currentHeight$.subscribe(height => this.height = height);
      // Init your component properties here.
  }

  public onEditPhoto(): void {
    console.log('here');
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
    }).catch((e) => {
        console.error(e);
    });
  }

}
