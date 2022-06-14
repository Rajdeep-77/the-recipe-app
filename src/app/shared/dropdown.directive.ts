// This is the example of dependency injection
//____________This code is for toggling dropdowns, (on click on the button, the dropdown will open, but it can be closed by clicking anywhere)
import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

//____________This code is for toggling dropdowns, (per clicks on drop-down button, the dropdown will open/close)
// import { Directive, HostBinding, HostListener } from "@angular/core";

// @Directive({
//     selector: '[appDropdown]'
// })

// export class DropdownDirective{
//     @HostBinding('class.open') isOpen = false;

//     @HostListener('click') toggleOpen(){
//         this.isOpen = !this.isOpen;
//     }
// }