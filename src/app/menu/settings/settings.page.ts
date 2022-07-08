import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public get language() : Language { return this.languageService.language;}
  public get backgroundColor() : ThemeColors { return this.sharedService.themeColor;}
  constructor(public sharedService : SharedService, private languageService : LanguageService) {}

  ngOnInit() {}
}
