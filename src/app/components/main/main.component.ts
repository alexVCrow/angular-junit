import { Component, OnInit } from '@angular/core';
import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  typeSwitch = false;
  textButton = 'Off';
  constructor(private subjectService: SubjectService) { }

  ngOnInit() {}

  click() {
    this.typeSwitch = !this.typeSwitch;
    this.onChange(this.typeSwitch);
    this.subjectService.sendMessage('Hello!');
  }
  onChange(type: boolean) {
    this.typeSwitch = type;
    this.textButton = type ? 'On' : 'Off';
  }

}
