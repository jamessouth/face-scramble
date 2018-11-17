import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { OptsComponent } from "./opts/opts.component";
import { PuzzComponent } from "./puzz/puzz.component";
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
        PuzzComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
