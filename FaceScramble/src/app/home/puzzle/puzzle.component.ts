import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
// import { OptionsService } from '../options.service';

import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "Puzzle",
  providers: [ModalDialogService],
  templateUrl: "./app/home/puzzle/puzzle.component.html",
  styleUrls: ["./app/home/puzzle/puzzle.component.css"],
  // providers: [OptionsService]
})
export class PuzzleComponent implements OnInit {
  // color: string;

  constructor(private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
      }

      ngOnInit(): void {}

          showModal() {
              const options: ModalDialogOptions = {
                  viewContainerRef: this.viewContainerRef,
                  fullscreen: false,
                  context: {}
              };
              this.modalService.showModal(ModalComponent, options);
          }
}
