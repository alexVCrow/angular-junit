import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ], imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setup() {
    const fixture = TestBed.createComponent(FormComponent);
    const app = fixture.componentInstance;
    const fb = fixture.debugElement.injector.get(FormBuilder);
    return { fixture, app, fb };
  }

  function searchInputs(fixture){
    return fixture.debugElement.queryAll(By.css('input'));
  }
  function searchButton(fixture){
    return fixture.debugElement.query(By.css('button'));
  }

  function sendInput(text: string, inputElement) {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  it('should create component', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it('should create form', () => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    expect(app.loginForm instanceof FormGroup).toBe(true);
    expect(app.loginForm).toBeTruthy();
    expect(Object.keys(app.loginForm.controls)).toEqual([
      'firstName', 'lastName'
    ]);
    expect(app.loginForm.controls['firstName'].invalid).toBeTruthy();
    expect(app.loginForm.controls['lastName'].invalid).toBeTruthy();
    expect(app.loginForm.controls['firstName'].errors['required']).toBeTruthy();
    expect(app.loginForm.controls['lastName'].errors['required']).toBeTruthy();
    expect(app.loginForm.valid).toBeFalsy();
  });

  it('should check name form and disabled button', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const button = searchButton(fixture);
    expect(button.nativeElement.innerText).toEqual('Сохранить');
    expect(button.nativeElement.disabled).toBeTruthy();
    const inputs = searchInputs(fixture);
    expect(inputs[0].attributes['formControlName']).toEqual('firstName');
    expect(inputs[1].attributes['formControlName']).toEqual('lastName');
    expect(inputs[0].nativeElement.placeholder).toEqual('Имя');
    expect(inputs[1].nativeElement.placeholder).toEqual('Фамилия');
  });

  it('should check valid form', () => {
    const { app, fixture } = setup();
    let inputs = searchInputs(fixture);
    fixture.detectChanges();
    sendInput('test', inputs[0].nativeElement);
    sendInput('test', inputs[1].nativeElement);
    expect(app.loginForm.valid).toBeTruthy();
    fixture.detectChanges();
    const button = searchButton(fixture);
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should check error form', () => {
    const { app, fixture } = setup();
    let inputs = searchInputs(fixture);
    fixture.detectChanges();
    sendInput('ааааа', inputs[0].nativeElement);
    sendInput('test', inputs[1].nativeElement);
    expect(app.loginForm.valid).toBeFalsy();
    fixture.detectChanges();
    const button = searchButton(fixture);
    expect(button.nativeElement.disabled).toBeTruthy();
    expect(app.loginForm.controls.firstName.errors['pattern']).toBeTruthy();
    inputs = searchInputs(fixture);
    expect(inputs[0].nativeElement.nextElementSibling).toBeTruthy();
    expect(inputs[1].nativeElement.nextElementSibling).toBeFalsy();
  });

});
