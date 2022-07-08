import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  loading = false;
  public get language(): Language { return this.languageService.language }
  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor }
  constructor(
    public sharedService: SharedService,
    public languageService: LanguageService,
    private storageService: StorageService,
    private profileService: ProfileService,
    private router: Router
  ) { }
  ngOnInit() { }
  show = false;
  showPassword(input) {
    if (this.show == true) {
      this.show = false;
      input.type = 'password';
    } else {
      this.show = true;
      input.type = 'text';
    }
  }


  submit() {
    if (!this.currentPassword || !this.newPassword || !this.confirmNewPassword) {
      this.sharedService.toast('danger', this.language.Profile.FillAllFields)
      return
    }
    if (!this.newPassword != !this.confirmNewPassword) {
      this.sharedService.toast('danger', this.language.Profile.Password_Miss_Match)
      return
    }

    this.loading = true;

    this.storageService.get('org_user_id').then(userId => {
      this.profileService.PostpassChanged(JSON.parse(userId), this.currentPassword, this.newPassword).subscribe(() => {
        this.loading = false;
        this.sharedService.toast('success', this.language.Profile.PasswordChanged);
        this.router.navigate(['/main'])
      }, () => this.loading = false)
    })

  }
}