import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: 'customer-historytory',
    loadChildren: () =>
      import('./pages/customer-historytory/customer-historytory.module').then(
        (m) => m.CustomerHistorytoryPageModule
      ),
  },  {
    path: 'questionnaire',
    loadChildren: () => import('./pages/questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
