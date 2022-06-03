import { Component, OnInit } from '@angular/core';
import { Language, Languages } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  public get language(): Language {
    return this.languageService.language;
  }

  public get selectedLanguage(): Languages {
    return this.languageService.selectedLanguage;
  }
  constructor(private languageService: LanguageService) {}

  ngOnInit() {}
}
