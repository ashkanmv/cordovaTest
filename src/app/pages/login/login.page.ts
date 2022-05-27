import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(){
    this.form = this.formBuilder.group({
      'Username': [null, [Validators.required]],
      'Password': [null, [Validators.required]]
    });
  }

  onSubmit(){

  }
}
