import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities, Customer } from 'src/app/shared/common';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {
  cities: Cities[] = [];
  routes: { routename: string }[] = [];
  customers: Customer[] = [];

  public get language(): Language {
    return this.languageService.language;
  }

  public get user_id(): string {
    return;
  }

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
}
