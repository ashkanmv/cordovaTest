import { Component, OnInit } from '@angular/core';
import { BackgroundColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  public get language() : Language { return this.languageService.language}
  public get backgroundColor() : BackgroundColors{ return this.sharedService.backgroundColor}
  constructor( public sharedService : SharedService, private languageService : LanguageService) {}
  ngOnInit() {}
}
