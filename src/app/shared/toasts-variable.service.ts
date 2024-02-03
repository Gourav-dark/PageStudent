import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastsVariableService {
  type: string = "";
  message: string = "";
  appear: boolean = false;

  constructor() {
    this.closeTimeToast();
  }

  closeTimeToast = () => {
    setTimeout(() => {
      this.closeToast();
    }, 5000);
  }

  closeToast() {
    this.appear = false;
  }
}
