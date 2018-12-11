import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Image } from "tns-core-modules/ui/image";

import { OptionsService } from '../options.service';

@Component({
    selector: "Modal",
    moduleId: module.id,
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
    image: Image;
    constructor(private params: ModalDialogParams, private data: OptionsService) {}

    ngOnInit(): void {
      setTimeout(() => {this.close()}, 3000);
      this.data.currentImage$.subscribe(image => this.image = image);
    }

    close(): void {
        this.params.closeCallback();
    }
}
