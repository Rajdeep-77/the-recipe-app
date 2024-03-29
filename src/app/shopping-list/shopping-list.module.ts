import { CommonModule } from "@angular/common";
import { NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path:'', component: ShoppingListComponent }
        ]),
        SharedModule
    ],
    // providers: [LoggingService]
})
export class ShoppingListModule implements OnInit{

    ngOnInit(){
        console.log("Shopping-List module loaded !!");
    }

}