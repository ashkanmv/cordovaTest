import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Access, ThemeColors, Language, PageDetail } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  doSearch = false;
  pages: PageDetail[] = [];
  public get language(): Language { return this.languageService.language; }
  public get isOnline() { return this.sharedService.isOnline; }

  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }
  constructor(private menuCtrl: MenuController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private languageService: LanguageService,
    public sharedService: SharedService) {
    this.languageService.languageChanged.subscribe(() => {
      this.checkAccess();
    })
  }

  ngOnInit() {
    this.checkAccess();
  }

  async checkAccess() {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    await loading.present();
    this.loadAllPages();
    this.storageService.get('access').then(acc => {
      let pages: Access[] = JSON.parse(acc);
      // this._pages.forEach(page => {   // for when you want to load all pages
      //   this.pages.push(page)
      // });
      pages.forEach(page => {
        let p = this._pages.find(p => page.name == p.key);
        if (p)
          this.pages.push(p)
      });
      this.pages.sort((a, b) => a.index - b.index)
      loading.dismiss();
    })
  }

  async openMenu() {
    this.menuCtrl.open()
  }

  loadAllPages() {
    this.pages = [];
    this._pages = [{
      index: 0,
      key: 'ch_page',
      title: this.language.MainPage.Customer_History,
      imgSrc: 'assets/mainPage/main/Customer-History.png',
      routerLink: '/customer-history',
      display: 'flex'
    },
    {
      index: 1,
      key: 'qn_page',
      title: this.language.MainPage.questionnaire,
      imgSrc: 'assets/mainPage/main/Questionnaire.png',
      routerLink: '/questionnaire',
      display: 'flex'
    },
    {
      index: 2,
      key: 'ns_page',
      title: this.language.MainPage.Notification,
      imgSrc: 'assets/mainPage/main/Notification.png',
      routerLink: '/notifications',
      display: 'flex'
    },
    {
      index: 3,
      key: 'gps_page',
      title: this.language.MainPage.gpsTracking,
      imgSrc: 'assets/mainPage/main/GPS-Tracking.png',
      routerLink: '/gps-tracking',
      display: 'flex'
    },
    {
      index: 4,
      key: 'srsales_page',
      title: this.language.MainPage.Online_Daily_Sale,
      imgSrc: 'assets/mainPage/main/Online-Daily-Sale.png',
      routerLink: '/online-daily-sales',
      display: 'flex'
    },
    {
      index: 5,
      key: 'gps-np_page',
      title: this.language.MainPage.Customer_Nearby,
      imgSrc: 'assets/mainPage/main/Customer-nearby.png',
      routerLink: '/customer-nearby',
      display: 'flex'
    },
    {
      index: 6,
      key: 'gps-sml_page',
      title: this.language.MainPage.Salesmen_Location,
      imgSrc: 'assets/mainPage/main/Salesmen Location.png',
      routerLink: '/salesmen-location',
      display: 'flex'
    },
    {
      index: 7,
      key: 'gps-sml-pl_page',
      title: this.language.MainPage.Trace_Salesman,
      imgSrc: 'assets/mainPage/main/Trace-Salesman.png',
      routerLink: '/trace-salesman',
      display: 'flex'
    },
    {
      index: 8,
      key: 'commute_pag',
      title: this.language.MainPage.Daily_Status,
      imgSrc: 'assets/mainPage/main/Daily-Status.png',
      routerLink: '/daily-status',
      display: 'flex'
    },
    {
      index: 9,
      key: 'troutes_page',
      title: this.language.MainPage.Today_Planned_Not_Buying,
      imgSrc: 'assets/mainPage/main/Today-Planned-Not-buying.png',
      routerLink: '/today-planned-not-buying',
      display: 'flex'
    },
    {
      index: 10,
      key: 'lt_page',
      title: this.language.MainPage.Loading_Truck_Status,
      imgSrc: 'assets/mainPage/main/Loading-Truck-Stauts.png',
      routerLink: '/loading-truck-status',
      display: 'flex'
    },
    {
      index: 11,
      key: 'sc_page',
      title: this.language.MainPage.Score_Cards,
      imgSrc: 'assets/mainPage/main/ScoreCard.png',
      routerLink: '/score-card',
      display: 'flex'
    },
    {
      index: 12,
      key: 'srsales_Hourly_page',
      title: this.language.MainPage.Online_Sales_Hourly,
      imgSrc: 'assets/mainPage/main/Online-Sales-Hourly.png',
      routerLink: '/online-sales-hourly',
      display: 'flex'
    },
    {
      index: 13,
      key: 'srsales_Hourly_sd_page',
      title: this.language.MainPage.Online_Sales_for_days_Hourly,
      imgSrc: 'assets/mainPage/main/Online-Sale-for-days-hourly.png',
      routerLink: '/online-sale-days-hourly',
      display: 'flex'
    },
    {
      index: 14,
      key: 'srsales_Hourly_Compare_LY_page',
      title: this.language.MainPage.Sales_Campare_Tracking_Hourly,
      imgSrc: 'assets/mainPage/main/Sales-Campare-Traking-Hourly.png',
      routerLink: '/sales-compare-tracking-hourly',
      display: 'flex'
    },
    {
      index: 15,
      key: 'srsales_Hourly_City_page',
      title: this.language.MainPage.Sales_Hourly_Day_and_Sales_Office,
      imgSrc: 'assets/mainPage/main/Sales-hourly_Day-and-Sales-Office.png',
      routerLink: '/sales-hourly-day',
      display: 'flex'
    },
    {
      index: 16,
      key: 'srpped_page',
      title: this.language.MainPage.Max_PPED,
      imgSrc: 'assets/mainPage/main/Max-PPED.png',
      routerLink: '/max-pped',
      display: 'flex'
    }
    ]
  }

  private _pages: PageDetail[];

  onSearchChange(e) {
    let search: string = e.detail.value.toLowerCase();
    if (!search)
      this.pages.forEach(_ => _.display = 'flex');
    else
      this.pages.forEach(_ => _.title.toLowerCase().includes(search) ? _.display = 'flex' : _.display = 'none')
  }
}
