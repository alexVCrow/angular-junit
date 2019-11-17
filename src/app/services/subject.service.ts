import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subject = new Subject<any>();
  constructor() { }

  sendMessage(msg) {
    this.subject.next(msg);
  }
  accessMessage() {
    return this.subject.asObservable();
  }

}
