import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main-page/main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./menu/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./menu/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./menu/contact-us/contact-us.module').then(
        (m) => m.ContactUsPageModule
      ),
  },
  {
    path: 'about-app',
    loadChildren: () =>
      import('./menu/about-app/about-app.module').then(
        (m) => m.AboutAppPageModule
      ),
  },
  {
    path: 'language',
    loadChildren: () =>
      import('./menu/language/language.module').then(
        (m) => m.LanguagePageModule
      ),
  },
  {
    path: 'theme',
    loadChildren: () =>
      import('./menu/theme/theme.module').then((m) => m.ThemePageModule),
  },
  {
    path: 'customer-history',
    loadChildren: () =>
      import('./pages/customer-history/customer-history.module').then(
        (m) => m.CustomerHistoryPageModule
      ),
  },
  {
    path: 'questionnaire',
    loadChildren: () =>
      import('./pages/questionnaire/questionnaire.module').then(
        (m) => m.QuestionnairePageModule
      ),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'customer-nearby',
    loadChildren: () =>
      import('./pages/customer-nearby/customer-nearby.module').then(
        (m) => m.CustomerNearbyPageModule
      ),
  },
  {
    path: 'gps-tracking',
    loadChildren: () =>
      import('./pages/gps-tracking/gps-tracking.module').then(
        (m) => m.GpsTrackingPageModule
      ),
  },
  {
    path: 'online-daily-sales',
    loadChildren: () =>
      import('./pages/online-daily-sales/online-daily-sales.module').then(
        (m) => m.OnlineDailySalesPageModule
      ),
  },
  {
    path: 'score-card',
    loadChildren: () =>
      import('./pages/score-card/score-card.module').then(
        (m) => m.ScoreCardPageModule
      ),
  },
  {
    path: 'max-pped',
    loadChildren: () =>
      import('./pages/max-pped/max-pped.module').then(
        (m) => m.MaxPPEDPageModule
      ),
  },
  {
    path: 'salesmen-location',
    loadChildren: () =>
      import('./pages/salesmen-location/salesmen-location.module').then(
        (m) => m.SalesmenLocationPageModule
      ),
  },
  {
    path: 'today-planned-not-buying',
    loadChildren: () =>
      import(
        './pages/today-planned-not-buying/today-planned-not-buying.module'
      ).then((m) => m.TodayPlannedNotBuyingPageModule),
  },
  {
    path: 'add-item',
    loadChildren: () =>
      import('./pages/add-item/add-item.module').then(
        (m) => m.AddItemPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },  {
    path: 'sales-hourly-day',
    loadChildren: () => import('./pages/sales-hourly-day/sales-hourly-day.module').then( m => m.SalesHourlyDayPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
