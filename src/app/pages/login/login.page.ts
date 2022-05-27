import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Language, LoginResponse } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isLoading = false;

  public get language(): Language {
    return this.languageService.language;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private sharedService: SharedService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      'Username': [null, [Validators.required]],
      'Password': [null, [Validators.required]],
      'RememberMe': [null],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.getAccess(this.form.value.Username, this.form.value.Password, null)
      .subscribe((res: LoginResponse) => {
        this.isLoading = false;
        // if (res.hasbusinesserror == 1 && res.Message == "UserPassIncorrect") 
        //   this.sharedService.toast('danger',);
        if (this.form.value.RememberMe)
          this.storageService.set('RememberUser', true);

      }, () => this.isLoading = false)
  }
}
