import { Component, OnInit, ViewChild } from '@angular/core';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-online-sale-days-hourly',
  templateUrl: './online-sale-days-hourly.page.html',
  styleUrls: ['./online-sale-days-hourly.page.scss'],
})
export class OnlineSaleDaysHourlyPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
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

  // mock  invoices data
  public invoicesData: Array<any> = [
    {
      route: 1101,
      zeroToNine: 34,
      nineToTwelve: 3,
      twelveToFifteen: 7.2,
      fifteenToEighteen: 62,
      EighteenToTwentyOne: 8.2,
      TwentyOnToTwentyFour: 85.2,
      total: 782,
    },
    {
      route: 1102,
      zeroToNine: 3,
      nineToTwelve: 5,
      twelveToFifteen: 27,
      fifteenToEighteen: 2,
      EighteenToTwentyOne: 82,
      TwentyOnToTwentyFour: 92,
      total: 782,
    },
    {
      route: 1103,
      zeroToNine: 14,
      nineToTwelve: 9,
      twelveToFifteen: 72,
      fifteenToEighteen: 2,
      EighteenToTwentyOne: 82,
      TwentyOnToTwentyFour: 8,
      total: 782,
    },
    {
      route: 1104,
      zeroToNine: 24,
      nineToTwelve: 3,
      twelveToFifteen: 92,
      fifteenToEighteen: 2,
      EighteenToTwentyOne: 52,
      TwentyOnToTwentyFour: 2,
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
  confirm() {
    // this.datetime.nativeEl.confirm();
    this.datetime.confirm();
  }

  reset() {
    // this.datetime.nativeEl.reset();
    this.datetime.reset();
  }
  ngOnInit() {}
}
