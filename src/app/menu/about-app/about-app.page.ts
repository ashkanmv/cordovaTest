import { Component, OnInit } from '@angular/core';
import { ThemeColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {
  public get language() : Language { return this.languageService.language}
  public get backgroundColor() : ThemeColors{ return this.sharedService.themeColor}
  constructor( public sharedService : SharedService, private languageService : LanguageService) {}

  ngOnInit() {}
}
