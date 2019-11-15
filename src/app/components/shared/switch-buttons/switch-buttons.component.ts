import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ButtonsService} from '../../../services/buttons.service';

@Component({
  selector: 'app-switch-buttons',
  templateUrl: './switch-buttons.component.html',
  styleUrls: ['./switch-buttons.component.css']
})
export class SwitchButtonsComponent implements OnInit, OnChanges {
  @Input() typeSwitch: boolean;
  @Output() type = new EventEmitter<boolean>();
  templateSwitch = [];
  selectSwitch: string;
  constructor(private buttonsService: ButtonsService) { }

  ngOnInit() {
    this.templateSwitch = this.buttonsService.getButtons();
    this.setCurrentSwitch(this.typeSwitch);
  }

  onClick(type: string) {
    if(type !== this.selectSwitch) {
      const result = type.includes(this.templateSwitch[0]);
      this.setCurrentSwitch(result);
      this.type.emit(result);
    }
  }

  setCurrentSwitch(type: boolean){
    this.selectSwitch = type ? this.templateSwitch[0] : this.templateSwitch[1];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setCurrentSwitch(changes.typeSwitch.currentValue);
  }

}
