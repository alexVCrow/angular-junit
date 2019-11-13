import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-switch-buttons',
  templateUrl: './switch-buttons.component.html',
  styleUrls: ['./switch-buttons.component.css']
})
export class SwitchButtonsComponent implements OnInit {
  @Input() typeSwitch: boolean;
  @Output() type = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() { }

  onClick(type: boolean) {
    this.typeSwitch = !type;
    this.type.emit(this.typeSwitch);
  }

}
