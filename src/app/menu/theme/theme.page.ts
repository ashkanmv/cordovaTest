import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  public get language(): Language {
    return this.languageService.language;
  }

  public get selectedLanguage(): Language {
    return this.languageService.language;
  }

  public get fontSize(): number { return this.shareService.fontSize ; }
  set fontSize(v: number) {
    this.shareService.fontSize = v
  }

  public get boldFontWeight(): boolean { return this.shareService.boldFontWeight ; }
  set boldFontWeight(v: boolean) {
    this.shareService.boldFontWeight = v
  }

  constructor(private languageService: LanguageService,
    private shareService : SharedService) {}

  ngOnInit() {}
}
