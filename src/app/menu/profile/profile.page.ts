import { Component, OnInit } from '@angular/core';
import { BackgroundColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public get language() : Language { return this.languageService.language}
  public get backgroundColor() : BackgroundColors{ return this.sharedService.backgroundColor}
  constructor( public sharedService : SharedService, private languageService : LanguageService) {}
  ngOnInit() {}
  show = false;
  showPassword(input) {
    if (this.show == true) {
      this.show = false;
      input.type = 'password';
    } else {
      this.show = true;
      input.type = 'text';
    }
  }
}
