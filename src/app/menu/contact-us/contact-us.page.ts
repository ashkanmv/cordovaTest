import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  public get language() : Language { return this.languageService.language}
  public get backgroundColor() : BackgroundColors { return this.sharedService.backgroundColor}
  constructor( public sharedService : SharedService, private languageService : LanguageService) {}

  ngOnInit() {}
}
