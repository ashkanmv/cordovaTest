import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {
  Cities,
  Customer,
  Language,
  Languages,
  Question,
  Questioncat,
} from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
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
  questioncats: Questioncat[] = [];
  questions: Question[] = [];
  userId: string;
  customerNumber: string;

  public get language(): Language {
    return this.languageService.language;
  }

  public get selectedLanguage(): Languages {
    return this.languageService.selectedLanguage;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private languageService: LanguageService
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
    let cityName = typeof value == 'string' ? value : value.detail.value;
    this.questionnaireService.getRouteByUserId(cityName, this.userId).subscribe(
      (routes: { routename: string }[]) => {
        this.routes = routes;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  async selectRoute(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService
      .routedailySelectByRouteByUser(value.detail.value, this.userId)
      .subscribe(
        (data: Data[]) => {
          this.routedailys = data;
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }

  async open_OtherForm(customerNumber: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService.getCustomersByNumber(customerNumber).subscribe(
      (data: Data) => {
        console.log(data);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  async selectRouteDaily(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService
      .getCustomersByRouteIdStep(value.detail.value)
      .subscribe(
        (customers: Customer[]) => {
          this.customers = customers;
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }

  async selectCustomer(customer: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questioncats = [];
    this.questionnaireService.getQuestionCatsByUserId(this.userId).subscribe(
      (questioncats: Questioncat[]) => {
        this.questioncats = questioncats;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  async selectQuestion(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService
      .getQuestionsByCat('fa', value.detail.value)
      .subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          console.log(this.questions);
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }
  onSubmit() {}

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
