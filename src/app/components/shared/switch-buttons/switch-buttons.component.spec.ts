import { async, TestBed } from '@angular/core/testing';

import { SwitchButtonsComponent } from './switch-buttons.component';
import {By} from '@angular/platform-browser';

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
    return { fixture, app };
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
    const { app, fixture } = setup();
    app.typeSwitch = false;
    fixture.detectChanges();
    const spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeFalsy();
    expect(isContainsClass(spans[1])).toBeTruthy();
  }));

  it('should change INPUT true', async(() => {
    const { app, fixture } = setup();
    app.typeSwitch = true;
    fixture.detectChanges();
    const spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeTruthy();
    expect(isContainsClass(spans[1])).toBeFalsy();
  }));

  it('should click called', async(() => {
    const { app, fixture } = setup();
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
    const { app, fixture } = setup();
    const value = false;
    app.typeSwitch = value;
    let spans = searchSpans(fixture);
    const spanOn = spans[0];
    spyOn(app.type, 'emit');
    spanOn.triggerEventHandler('click', value);
    fixture.detectChanges();
    spans = searchSpans(fixture);
    expect(isContainsClass(spans[0])).toBeTruthy();
    expect(isContainsClass(spans[1])).toBeFalsy();
    expect(app.typeSwitch).toBeTruthy();
    expect(app.type.emit).toHaveBeenCalledWith(app.typeSwitch);

  }));

});
