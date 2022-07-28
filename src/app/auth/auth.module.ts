import { CommonModule } from "@angular/common";
import { NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthenticationComponent } from "./authentication/authentication.component";

@NgModule({
    declarations: [
        AuthenticationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path:'', component: AuthenticationComponent}
        ]),
        SharedModule
    ]
})
export class AuthModule implements OnInit{

    ngOnInit(){
        console.log("Auth module loaded !!");
    }

}