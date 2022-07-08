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
  language: 'EN' | 'FR';
  public get selectedLanguage(): Language { return this.languageService.language; }
  public get backgroundColor(): BackgroundColors { return this.sharedService.backgroundColor }
  constructor(public sharedService: SharedService, private languageService: LanguageService) { }
  ngOnInit() { }

  ionViewDidEnter() {
    this.languageService.selectedLanguage == 'FR' ? this.language = 'FR' : this.language = 'EN'
  }
  languageChanged() {
    if (this.language == 'FR') localStorage.setItem('selectedLanguage', 'FR')
    else localStorage.setItem('selectedLanguage', 'EN')
  }
}
