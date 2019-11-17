import { async, TestBed } from '@angular/core/testing';

import {MainComponent} from './main.component';
import {SwitchButtonsComponent} from '../shared/switch-buttons/switch-buttons.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {SubjectService} from '../../services/subject.service';

describe('MainComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ MainComponent, MockComponent(SwitchButtonsComponent) ]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.componentInstance;
    const subjectService = fixture.debugElement.injector.get(SubjectService);
    return { fixture, app, subjectService};
  }

  function searchButton(fixture){
    return fixture.debugElement.query(By.css('button'));
  }
  function findText(buttons){
    return buttons.nativeElement.innerText;
  }

  it('should create the Main component', async(() => {
    const { app } = setup();
    expect(app).toBeTruthy();
  }));

  it('should click button main component', async(() => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    expect(app.textButton).toEqual('Off');
    expect(app.typeSwitch).toEqual(false);
    let buttons = searchButton(fixture);
    expect(findText(buttons)).toEqual('Off');
    buttons.nativeElement.click();
    fixture.detectChanges();
    expect(app.textButton).toEqual('On');
    expect(app.typeSwitch).toEqual(true);
    buttons = searchButton(fixture);
    expect(findText(buttons)).toEqual('On');

  }));

  it('should input main component', async(() => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    let buttons = searchButton(fixture);
    expect(findText(buttons)).toEqual('Off');
    const element = fixture.debugElement.query(By.css('app-switch-buttons'))
      .componentInstance as SwitchButtonsComponent;
    expect(element).toBeTruthy();
    expect(element.typeSwitch).toBeFalsy();
    buttons = searchButton(fixture);
    buttons.nativeElement.click();
    fixture.detectChanges();
    expect(element.typeSwitch).toBeTruthy();
    element.onClick('Off');
    fixture.detectChanges();
    expect(app.typeSwitch).toBeTruthy();
    buttons = searchButton(fixture);
    expect(findText(buttons)).toEqual('On');
  }));

  it('should call subjectService', async(() => {
    const { fixture, subjectService }  = setup();
    const buttons = searchButton(fixture);
    spyOn(subjectService, 'sendMessage');
    buttons.nativeElement.click();
    fixture.detectChanges();
    expect(subjectService.sendMessage).toHaveBeenCalledWith('Hello!');
  }));

});
