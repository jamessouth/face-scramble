import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { OptsComponent } from "./opts/opts.component";
import { ChooseComponent } from "./choose/choose.component";
import { EditComponent } from "./edit/edit.component";
import { PuzzComponent } from "./puzz/puzz.component";
import { ModalComponent } from "./modal/modal.component";
import { OptionsService } from './options.service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule
    ],
    providers: [
      OptionsService
    ],
    declarations: [
        HomeComponent,
        OptsComponent,
        ChooseComponent,
        EditComponent,
        PuzzComponent,
        ModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        ModalComponent
    ]
})
export class HomeModule { }
