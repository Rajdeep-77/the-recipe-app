import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService:AuthServiceService, private loggingService:LoggingService){}

  ngOnInit(){
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent');
  }
  // loadedFeature='recipe';

  // onNavigate(feature:string){
  //   this.loadedFeature=feature;
  // }
}
