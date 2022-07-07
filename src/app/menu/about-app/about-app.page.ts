import { Component, OnInit } from '@angular/core';
import { BackgroundColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {
  public get language() : Language { return this.languageService.language}
  public get backgroundColor() : BackgroundColors{ return this.sharedService.backgroundColor}
  constructor( public sharedService : SharedService, private languageService : LanguageService) {}

  ngOnInit() {}
}
