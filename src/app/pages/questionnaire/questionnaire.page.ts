import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cities, Customer } from 'src/app/shared/common';
import { StorageService } from 'src/app/shared/storage.service';
import { QuestionnaireService } from './questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {
  form: FormGroup;
  cities: Cities[] = [];
  routes: { routename: string }[] = [];
  customers: Customer[] = [];
  routedailys: any[] = [];
  userId: string;
  customerNumber: string;
  typeSubscription: Subscription;
  kgqtySubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadForm();
    this.getDataFromStorage();
  }
  backButton() {
    this.router.navigate(['/']);
  }

  loadForm() {
    this.form = this.formBuilder.group({
      DC: [null],
      Route: [null],
      Customer: [null],
      QuestionCategory: [null],
      RouteDaily: [null],
    });
    // this.typeSubscription = this.form.controls['type'].valueChanges.subscribe(
    //   (v) => this.typeChanged(v)
    // );
    // this.kgqtySubscription = this.form.controls['kgqty'].valueChanges.subscribe(
    //   (v) => this.kgqtyChanged(v)
    // );
  }

  get f() {
    return this.form.controls;
  }

  getDataFromStorage() {
    this.storageService.get('user_id').then((userId) => {
      this.userId = userId;
    });

    this.storageService
      .get('Customer_Number')
      .then((customerNumber: string) => {
        if (!customerNumber) this.get_cities();
        else this.open_OtherForm(customerNumber);
      });
  }

  async get_cities() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService.getCityByUserId(this.userId).subscribe(
      (cities: Cities[]) => {
        this.cities = cities;
        if (cities.length) {
          this.patchValue('DC', cities[0].City);
          this.selectCity(cities[0].City);
        }
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  async selectCity(value: string | any) {
    this.routes = [];
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    console.log(typeof value);

    let cityName = typeof value == 'string' ? value : value.detail.value;
    this.questionnaireService.getRouteByUserId(cityName, this.userId).subscribe(
      (routes: { routename: string }[]) => {
        this.routes = routes;
        console.log(routes);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  async selectRoute(routeName: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService
      .routedailySelectByRouteByUser(routeName, this.userId)
      .subscribe(
        (data: Data[]) => {
          console.log(data);
          this.routedailys = data;
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }

  async open_OtherForm(CustomerNumber: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService.getCustomersByNumber('21001009').subscribe(
      (data: Data) => {
        console.log(data);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  typeChanged(value: string) {}

  kgqtyChanged(value: string) {}

  onSubmit() {}

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
