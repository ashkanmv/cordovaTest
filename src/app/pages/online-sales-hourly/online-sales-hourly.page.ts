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
  // mock data
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
  // mock  invoices data
  public invoicesData: Array<any> = [
    {
      route: 1101,
      zeroToEight: 3,
      nine: 9,
      ten: 12,
      eleven: 19,
      twelve: 72,
      thirteen: 78,
      fourteen: 782,
      fifteen: 2,
      sixteenToTwentyFour: 82,
      total: 782,
    },
    {
      route: 1102,
      zeroToEight: 7,
      nine: 5,
      ten: 4.12,
      eleven: 9,
      twelve: 7.82,
      thirteen: 7.82,
      fourteen: 7.82,
      fifteen: 7.82,
      sixteenToTwentyFour: 7.82,
      total: 7.82,
    },
    {
      route: 1103,
      zeroToEight: 3,
      nine: 7,
      ten: 3.12,
      eleven: 19,
      twelve: 782,
      thirteen: 782,
      fourteen: 782,
      fifteen: 782,
      sixteenToTwentyFour: 782,
      total: 782,
    },
    {
      route: 1104,
      zeroToEight: 4,
      nine: 8,
      ten: 32,
      eleven: 9,
      twelve: 6,
      thirteen: 82,
      fourteen: 78,
      fifteen: 2,
      sixteenToTwentyFour: 72,
      total: 782,
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
