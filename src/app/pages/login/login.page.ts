import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import {
  BackgroundGeolocation,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from '@awesome-cordova-plugins/background-geolocation/ngx';
import { AuthService } from 'src/app/auth/auth.service';
import { Language, LoginResponse, UserLog } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UtilService } from 'src/app/shared/util.service';
import { environment } from 'src/environments/environment';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Platform } from '@ionic/angular';

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
    private backgroundGeolocation: BackgroundGeolocation,
    // private device : Device,
    private plt: Platform
  ) { }

  ngOnInit() {
    this.loadForm();
    this.plt
      .ready()
      .then(() => {
        // if (this.plt.is('android')){
        //   var d = new Device();
        //   console.log(d.uuid);
        //   console.log(d.cordova);
        //   console.log(d.isVirtual);
        //   console.log(d.manufacturer);
        //   console.log(d.model);
        //   console.log(d.platform);
        //   console.log(d.serial);
        //   console.log(d.version);
        // }
        // this.UUid = "";
      })
      .catch((error) => {
        console.log(error);
      });
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
          this.isLoading = false;
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
    if (this.form.value.RememberMe)
      this.storageService.set('passwordSave', this.form.value.Password);
  }

  startTracking(loginRes: LoginResponse) {
    let url =
      environment.RepoerURL +
      '/api/v1/visitorpoints?user_id=' +
      loginRes.user_id +
      '&uuid=' +
      this.UUid +
      '&route_name=' +
      loginRes.route_name.replace(' ', '%20') +
      '&route_code=' +
      loginRes.route_code;
    this.storageService.set('start_tracking_url', url);
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 50,
      distanceFilter: 15,
      stopOnTerminate: false,
      startOnBoot: true,
      interval: 10000,
      locationProvider: 0,
      url: url,
    };
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });
    });

    // start recording location
    this.backgroundGeolocation.start();
  }

  stopTracking() {
    this.backgroundGeolocation.stop();
  }
}
