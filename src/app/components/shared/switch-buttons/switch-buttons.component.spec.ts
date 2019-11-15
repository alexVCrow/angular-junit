import { async, TestBed } from '@angular/core/testing';

import { SwitchButtonsComponent } from './switch-buttons.component';
import {By} from '@angular/platform-browser';
import {SimpleChange} from '@angular/core';
import {ButtonsService} from '../../../services/buttons.service';

describe('SwitchButtonsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ SwitchButtonsComponent ]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(SwitchButtonsComponent);
    const app = fixture.componentInstance;
    const buttonsService = fixture.debugElement.injector.get(ButtonsService);
    return { fixture, app, buttonsService };
  }
  function searchSpans(fixture) {
    return fixture.debugElement.queryAll(By.css('span'));
  }
  function isContainsClass(span) {
    return span.nativeElement.classList.contains('switch-active');
  }

  it('should create the switch component', async(() => {
    const { app } = setup();
    expect(app).toBeTruthy();
  }));

  it('should change INPUT false', async(() => {
    const { app, fixture, buttonsService } = setup();
    app.typeSwitch = false;
    spyOn(buttonsService, 'getButtons').and.returnValue([ 'On', 'Off']);
    fixture.detectChanges();
    const spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeFalsy();
    expect(isContainsClass(spans[1])).toBeTruthy();
  }));

  it('should change INPUT true', async(() => {
    const { app, fixture, buttonsService } = setup();
    app.typeSwitch = true;
    spyOn(buttonsService, 'getButtons').and.returnValue([ 'On', 'Off']);
    fixture.detectChanges();
    const spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeTruthy();
    expect(isContainsClass(spans[1])).toBeFalsy();
  }));

  it('should click called', async(() => {
    const { app, fixture, buttonsService } = setup();
    spyOn(buttonsService, 'getButtons').and.returnValue([ 'On', 'Off']);
    fixture.detectChanges();
    spyOn(app, 'onClick');
    const spans = searchSpans(fixture);
    spans[0].nativeElement.click();

    fixture.whenStable().then(() => {
      expect(app.onClick).toHaveBeenCalled();
    });

    spans[1].nativeElement.click();
    fixture.whenStable().then(() => {
      expect(app.onClick).toHaveBeenCalled();
    });

  }));

  it('should click change variable', async(() => {
    const { app, fixture, buttonsService } = setup();
    app.typeSwitch = false;
    spyOn(app.type, 'emit');
    spyOn(buttonsService, 'getButtons').and.returnValue([ 'On', 'Off']);
    fixture.detectChanges();
    let spans = searchSpans(fixture);
    const spanOn = spans[0];
    spanOn.triggerEventHandler('click', app.templateSwitch[0]);
    fixture.detectChanges();
    spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeTruthy();
    expect(isContainsClass(spans[1])).toBeFalsy();
    expect(app.typeSwitch).toBeFalsy();
    expect(app.selectSwitch).toEqual(app.templateSwitch[0]);
    expect(app.type.emit).toHaveBeenCalledWith(true);

  }));

  it('should double-click not change class', async(() => {
    const { app, fixture, buttonsService } = setup();
    // повторный клик не должен поменять класс
    spyOn(app.type, 'emit');
    spyOn(buttonsService, 'getButtons').and.returnValue([ 'On', 'Off']);
    app.typeSwitch = true;
    fixture.detectChanges();
    let spans = searchSpans(fixture);
    const spanOn = spans[0];
    spanOn.triggerEventHandler('click', app.templateSwitch[0]);
    fixture.detectChanges();
    spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeTruthy();
    expect(isContainsClass(spans[1])).toBeFalsy();
    expect(app.typeSwitch).toBeTruthy();
    expect(app.selectSwitch).toEqual(app.templateSwitch[0]);
    expect(app.type.emit).not.toHaveBeenCalled();
  }));

  it('should onChanges change type', async(() => {
    const { app, fixture, buttonsService } = setup();
    app.typeSwitch = true;
    spyOn(buttonsService, 'getButtons').and.returnValue([ 'On', 'Off']);
    fixture.detectChanges();
    let spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeTruthy();
    expect(isContainsClass(spans[1])).toBeFalsy();
    expect(app.selectSwitch).toEqual(app.templateSwitch[0]);
    app.ngOnChanges({
      typeSwitch: new SimpleChange(null, false, false)
    });
    fixture.detectChanges();
    spans = searchSpans(fixture);
    expect(isContainsClass(spans[1])).toBeTruthy();
    expect(isContainsClass(spans[0])).toBeFalsy();
    expect(app.selectSwitch).toEqual(app.templateSwitch[1]);
  }));

});
