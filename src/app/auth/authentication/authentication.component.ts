import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor( private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error:string = null;

  // This function changes mode login/signup
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error = null;
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
                                    this.isLoading = false; 
                                  });
    
    formData.reset();
  }

}
