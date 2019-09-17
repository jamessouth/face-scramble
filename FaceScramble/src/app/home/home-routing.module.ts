import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { OptsComponent } from "./opts/opts.component";
import { ChooseComponent } from "./choose/choose.component";
import { EditComponent } from "./edit/edit.component";
import { PuzzComponent } from "./puzz/puzz.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "opts", component: OptsComponent },
    { path: "choose", component: ChooseComponent },
    { path: "edit", component: EditComponent },
    { path: "puzz", component: PuzzComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
