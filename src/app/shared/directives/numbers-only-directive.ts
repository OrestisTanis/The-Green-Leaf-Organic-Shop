import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, ''); // allow only numbers
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}