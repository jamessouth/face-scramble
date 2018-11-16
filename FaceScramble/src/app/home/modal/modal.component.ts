import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "Modal",
    templateUrl: "./app/home/modal/modal.html",
    styleUrls: ["./app/home/modal/modal.css"]
})

export class ModalComponent implements OnInit {
  textFieldValue: string;
    @Output() www = new EventEmitter<string>();
    constructor(private params: ModalDialogParams) {}

    ngOnInit() {}

    close() {
        this.www.emit(this.textFieldValue);
        this.params.closeCallback();
    }
}
