import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  typeSwitch = false;
  textButton = 'Off';
  constructor() { }

  ngOnInit() {}

  click() {
    this.typeSwitch = !this.typeSwitch;
    this.onChange(this.typeSwitch);
  }
  onChange(type: boolean) {
    this.typeSwitch = type;
    this.textButton = type ? 'On' : 'Off';
  }

}
