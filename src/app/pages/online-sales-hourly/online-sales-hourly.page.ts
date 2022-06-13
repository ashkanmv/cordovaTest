import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-online-sales-hourly',
  templateUrl: './online-sales-hourly.page.html',
  styleUrls: ['./online-sales-hourly.page.scss'],
})
export class OnlineSalesHourlyPage implements OnInit {
  public get language(): Language {
    return this.languageService.language;
  }

  public get selectedLanguage(): Language {
    return this.languageService.language;
  }
  dateNow = new Date();
  selectedSegment: string = 'per-kilo';

  nestedTableIsShowingRow_1: boolean = false;

  constructor(private languageService: LanguageService) {}

  public routeData: Array<any> = [
    {
      route: 1131,
      city: 'Tehran',
      visitorName: 'Behnam Ezadi',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
    {
      route: 1132,
      city: 'Tabriz',
      visitorName: 'Behnaz Azadi',
      sale: 4.12,
      PPED: 9,
      percentage: 7.82,
    },
    {
      route: 1133,
      city: 'Esfahan',
      visitorName: 'Behzad Azari',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
    {
      route: 1134,
      city: 'Amol',
      visitorName: 'Behrooz Ezraee',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
  ];
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }
  toggleNestedTabelRow_1() {
    this.nestedTableIsShowingRow_1 = !this.nestedTableIsShowingRow_1;
  }
  ngOnInit() {}
}
