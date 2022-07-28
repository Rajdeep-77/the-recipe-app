import { NgForOf } from '@angular/common';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  private closeSub:Subscription;

  constructor( private authService:AuthServiceService, 
               private router:Router,
               private cfr:ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnDestroy(){
          if(this.closeSub){
            this.closeSub.unsubscribe();
          }  
  }

  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error:string = null;
  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;

  // This function changes mode login/signup
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(msg:string){
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.cfr.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = msg;
    this.closeSub = componentRef.instance.close.subscribe( () => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    } );
  }

  // This function submits the form data
  onSubmit(formData:NgForm){
    console.log(formData.value);

    if(!formData.valid){ return; }
    const email = formData.value.email;
    const password = formData.value.password;

    let authObs: Observable<AuthResponseData>;
    
    this.isLoading =true;
    if(this.isLoginMode){

      authObs = this.authService.login( email, password);
    
    }
    else{
    
      authObs = this.authService.signup( email, password);
    
    }

    authObs.subscribe( resData => {
                                    console.log(resData);
                                    this.isLoading = false; 
                                    this.router.navigate(['/recipes']);
                                  }
                      , errorMessage => {
                                    console.log(errorMessage); 
                                    this.error = errorMessage;
                                    this.showErrorAlert(errorMessage);
                                    this.isLoading = false; 
                                  });
    
    formData.reset();
  }

}
