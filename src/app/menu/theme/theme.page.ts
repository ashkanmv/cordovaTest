import { Component, OnInit } from '@angular/core';
import { BackgroundColors, Language } from 'src/app/shared/common';
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

  public get fontSize(): number { return this.sharedService.fontSize; }
  set fontSize(v: number) {
    this.sharedService.fontSize = v
  }

  public get boldFontWeight(): boolean { return this.sharedService.boldFontWeight; }
  set boldFontWeight(v: boolean) {
    this.sharedService.boldFontWeight = v
  }

  public get backgroundColor(): BackgroundColors { return this.sharedService.backgroundColor; }
  set backgroundColor(v: BackgroundColors) {
    this.sharedService.backgroundColor = v
  }

  constructor(private languageService: LanguageService,
    private sharedService: SharedService) { }

  ngOnInit() { }

  changeBackgroundColor(color: BackgroundColors) {
    this.sharedService.backgroundColor = color;
  }

  handleBackgroundColor() {
    switch (this.backgroundColor) {
      case BackgroundColors.blue:
        return "#0095EB"
      case BackgroundColors.green:
        return "#55c595"
      case BackgroundColors.purple:
        return "#7495fe"
      case BackgroundColors.red:
        return "#fe7376"
      case BackgroundColors.yellow:
        return "#facb01"
    }
  }
  handleColor() {
    return 'var(--ion-color-light)';
  }
}
