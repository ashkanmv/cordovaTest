import { Component, OnInit } from '@angular/core';
import { ThemeColors, Language, ColorSchemes } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  ColorSchemes = ColorSchemes;
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

  public get themeColor(): ThemeColors { return this.sharedService.themeColor; }
  set themeColor(v: ThemeColors) {
    this.sharedService.themeColor = v
  }

  public get colorScheme(): ColorSchemes { return this.sharedService.colorScheme; }
  set colorScheme(v: ColorSchemes) {
    this.sharedService.colorScheme = v
  }

  constructor(private languageService: LanguageService,
    public sharedService: SharedService) { }

  ngOnInit() { }

  changeThemeColor(color: ThemeColors) {
    this.themeColor = color;
  }

  colorSchemeChanged(event){    
    let value = event.detail.value;
    this.colorScheme = value;
  }
}
