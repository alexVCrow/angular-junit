import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ButtonsService} from '../../../services/buttons.service';
import {Subscription} from 'rxjs';
import {SubjectService} from '../../../services/subject.service';

@Component({
  selector: 'app-switch-buttons',
  templateUrl: './switch-buttons.component.html',
  styleUrls: ['./switch-buttons.component.css']
})
export class SwitchButtonsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() typeSwitch: boolean;
  @Output() type = new EventEmitter<boolean>();
  templateSwitch = [];
  selectSwitch: string;
  subscription: Subscription = new Subscription();
  message: string;
  constructor(private buttonsService: ButtonsService, private subjectService: SubjectService) { }

  ngOnInit() {
    this.templateSwitch = this.buttonsService.getButtons();
    this.setCurrentSwitch(this.typeSwitch);
    this.subscription = this.subjectService.accessMessage()
      .subscribe(msg => { this.message = msg;});
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
