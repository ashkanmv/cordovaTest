import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AutoLogin, Language, LoginResponse, UserLog } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UtilService } from 'src/app/shared/util.service';
import { environment } from 'src/environments/environment';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { GeoLocationService } from 'src/app/shared/geo-location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isLoading = false;
  orgUserId: string;
  UUid: string;
  version = environment.Version;
  public get language(): Language {
    return this.languageService.language;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private sharedService: SharedService,
    private languageService: LanguageService,
    private utilService: UtilService,
    private geoLocationService: GeoLocationService,
    private device: Device,
    private plt: Platform,
    private router: Router,
    private loadingCtrl : LoadingController
  ) { }

  ionViewWillEnter() {
    this.sharedService.disableSplitPane = true;
  }

  ngOnInit() {
    this.loadForm();
    this.plt
      .ready()
      .then(() => {
        if (this.plt.is('cordova')) {
          this.UUid = this.device.uuid;
        } else
          this.UUid = undefined;

        this.storageService.get('RememberUser').then(remember => {
          if (remember)
            this.autoLogin()
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async autoLogin() {
    const loading = await this.loadingCtrl.create({
      message : this.language.Loading
    });
    loading.present();
    this.storageService.get('autoLogin').then(data =>{
      loading.dismiss();
      let autoLoginData : AutoLogin = JSON.parse(data);
      
      if(autoLoginData){
        this.patchValue('Username',autoLoginData.userName)
        this.patchValue('Password',autoLoginData.password)
        // if(this.UUid ) this.UUid = autoLoginData.uuid;

        this.login()
      }
    })
  }

  show = false;
  showPassword(input: any) {
    if (this.show == true) {
      this.show = false;
      input.type = 'password';
    } else {
      this.show = true;
      input.type = 'text';
    }
  }

  loadForm() {
    this.form = this.formBuilder.group({
      Username: [null, [Validators.required]],
      Password: [null, [Validators.required]],
      RememberMe: [false],
    });
  }

  login() {    
    this.isLoading = true;
    this.authService
      .getAccess(this.form.value.Username, this.form.value.Password, this.UUid)
      .subscribe(
        (res: LoginResponse) => {
          if (res.hasbusinesserror == 1 && res.Message == 'UserPassIncorrect') {
            this.sharedService.toast(
              'danger',
              this.language.login.UserPassIncorrect
            );
            return;
          }
          if (this.form.value.RememberMe)
            this.storageService.set('RememberUser', true);

          this.orgUserId = res.user_id;

          if (res.Equivalent_User_ID)
            this.getAccessByID(res.Equivalent_User_ID);
          else this.postUserLog(res);
        },
        () => (this.isLoading = false)
      );
  }

  getAccessByID(equivalentUserId: string) {
    this.authService
      .getAccessByID(equivalentUserId)
      .subscribe((res: LoginResponse) => {
        if (!res.access.length) return;

        this.postUserLog(res);
      });
  }

  postUserLog(loginRes: LoginResponse) {
    let user_log: UserLog = {
      user_id: loginRes.user_id,
      task: 'login',
      version: environment.Version,
    };
    this.utilService.post_user_log(user_log).subscribe(() => {
      this.saveLoginResponseToStorage(loginRes);

      this.stopTracking();
      this.startTracking(loginRes);
      this.isLoading = false;
      this.sharedService.disableSplitPane = false;
      this.router.navigate(['/main'])
    });
  }

  saveLoginResponseToStorage(loginRes: LoginResponse) {
    this.storageService.set('access', JSON.stringify(loginRes.access));
    this.storageService.set('route_name', loginRes.route_name);
    this.storageService.set('user_id', loginRes.user_id);
    this.storageService.set('org_user_id', this.orgUserId);
    this.storageService.set('route_code', loginRes.route_code);
    this.storageService.set('FullName', loginRes.FullName);
    this.storageService.set('UserName', this.form.value.Username);
    if (this.form.value.RememberMe){
      let autoLogin : AutoLogin = {
        password : this.form.value.Password,
        userName : this.form.value.Username,
        uuid : this.UUid
      }
      this.storageService.set('autoLogin', JSON.stringify(autoLogin));
    }
  }

  startTracking(loginRes: LoginResponse) {
    let url = environment.RepoerURL + '/api/v1/visitorpoints?user_id=' + loginRes.user_id + '&uuid=' + this.UUid + '&route_name=' + loginRes.route_name.replace(' ', '%20') + '&route_code=' + loginRes.route_code;
    this.storageService.set('start_tracking_url', url);
    this.geoLocationService.startTracking(url);
  }

  stopTracking() {
    this.geoLocationService.stopTracking();
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
