import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {

  templateSwitch = [ 'On', 'Off'];

  constructor() { }

  getButtons(){
    return this.templateSwitch;
  }
}
