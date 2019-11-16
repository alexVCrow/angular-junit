import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'firstName': ['', [Validators.required,Validators.pattern(/[a-zA-Z]/)]],
      'lastName': ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    console.log(this.loginForm);
  }

}
