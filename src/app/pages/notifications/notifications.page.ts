import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ThemeColors, Language, News } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { AddEditNotificationComponent } from './add-edit-notification/add-edit-notification.component';
import { NotificationsService } from './notifications.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  loadings: LoadingController[] = [];
  hasAccess = false;
  skip = 0;
  limit = 5;
  all_news = [];
  lastPageReached = false;

  public get language(): Language {
    return this.languageService.language;
  }
  public get isOnline() {
    return this.sharedService.isOnline
  }
  public get backgroundColor(): ThemeColors {
    return this.sharedService.themeColor;
  }

  constructor(
    private storageService: StorageService,
    private notificationService: NotificationsService,
    private languageService: LanguageService,
    public sharedService: SharedService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  ngOnInit() {
    this.storageService.get('access').then(access => {
      if (!access)
        return
      let json_access = JSON.parse(access);
      json_access.forEach(acc => {
        if (acc.name == 'ns_action')
          this.hasAccess = true;
      });

      this.getNews();
    })
  }

  async getNews(event?: any) {
    if (!event) {
      const key = 'getNews';
      await this.presentLoading(key);
    }

    this.notificationService.getNews(this.skip, this.limit)
      .subscribe(
        (news: any) => {
          this.all_news.push.apply(this.all_news, news);

          if (news.length == 0 || news.length < 5) {
            this.lastPageReached = true;
          }

          this.skip += this.limit;
          if (!event) {
            this.removeAllLoadings();
          } else
            event.target.complete();
        },
        error => {
          if (event)
            event.target.complete();
        });
  }

  async deleteNotification(id: number) {
    const key = 'deleteNotification';
    await this.presentLoading(key);

    this.notificationService.deleteNews(id).subscribe(() => {
      this.sharedService.toast('success', this.language.News.NotificationDeleted);
      this.skip = 0;
      this.all_news = [];
      this.lastPageReached = false;
      this.getNews();
      this.dismissLoading(key);
    })
  }

  addNotification() {
    this.modalCtrl.create({
      component: AddEditNotificationComponent,
      cssClass: "modal-fullscreen"
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      if (!resultData.data)
        return

      this.skip = 0;
      this.all_news = [];
      this.lastPageReached = false;
      this.getNews();
    })
  }

  editNews(news: News) {
    this.modalCtrl.create({
      component: AddEditNotificationComponent,
      componentProps: { news },
      cssClass: "modal-fullscreen"
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      if (!resultData.data)
        return

      this.skip = 0;
      this.all_news = [];
      this.lastPageReached = false;
      this.getNews();
    })
  }

  doRefresh(event) {
    this.lastPageReached = false;
    this.skip = 0;
    this.all_news = [];
    this.getNews();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  doInfinite(event) {
    if (this.lastPageReached) {
      this.sharedService.toast('warning', this.language.News.EndOfNotifications);
      event.target.complete();
      return
    }
    this.getNews(event);
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  async presentLoading(key: string) {
    this.loadings[key] = await this.loadingCtrl.create({
      message: this.language.Loading,
    });
    await this.loadings[key].present();
  }

  dismissLoading(key: string) {
    this.loadings[key]?.dismiss();
    delete this.loadings[key];
  }

  removeAllLoadings() {
    for (const key in this.loadings)
      this.loadings[key].dismiss()
    this.loadings = [];
  }
}
