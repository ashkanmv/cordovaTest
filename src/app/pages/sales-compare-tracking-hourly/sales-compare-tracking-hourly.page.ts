import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-sales-compare-tracking-hourly',
  templateUrl: './sales-compare-tracking-hourly.page.html',
  styleUrls: ['./sales-compare-tracking-hourly.page.scss'],
})
export class SalesCompareTrackingHourlyPage implements OnInit {
  public get language(): Language {
    return this.languageService.language;
  }
  public get selectedLanguage(): Language {
    return this.languageService.language;
  }
  // mock data
  nestedTableIsShowingRow: boolean = false;
  public compareFirstRow: Array<any> = [
    {
      route: 1101,
      SSV: 29.4,
      ASM: 284,
      RR_LY: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 44459,
    },
    {
      route: 1102,
      SSV: 26.4,
      H9: 284,
      RR_LY: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 45649,
    },
    {
      route: 1103,
      SSV: 27.4,
      H9: 284,
      RR_LY: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 456459,
    },
    {
      route: 1104,
      SSV: 249.4,
      H9: 284,
      RR_LY: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 45459,
    },
  ];
  public compare: Array<any> = [
    {
      route: 1101,
      H8: 29.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 44459,
    },
    {
      route: 1102,
      H8: 26.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 45649,
    },
    {
      route: 1103,
      H8: 27.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 456459,
    },
    {
      route: 1104,
      H8: 249.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 45459,
    },
  ];
  constructor(private languageService: LanguageService) {}
  // delete later
  toggleNestedTabelRow() {
    this.nestedTableIsShowingRow = !this.nestedTableIsShowingRow;
  }

  ngOnInit() {}
}
