import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { OptionsService } from '../options.service';
import { Image } from "tns-core-modules/ui/image";

@Component({
    selector: "Modal",
    templateUrl: "./app/home/modal/modal.component.html",
    styleUrls: ["./app/home/modal/modal.component.css"]
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
