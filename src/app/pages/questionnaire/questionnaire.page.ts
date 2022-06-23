import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UtilService } from 'src/app/shared/util.service';
import { AnswerLogService } from './answer-log.service';
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
  txtanswers = [];
  userId: string;
  customerNumber: string;

  public get language(): Language {
    return this.languageService.language;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private languageService: LanguageService,
    private answerLogService: AnswerLogService,
    private persianCalendarService: PersianCalendarService,
    private utilService: UtilService
  ) {
    let customerNumber = this.route.snapshot.queryParams['customerNumber'];
    if (customerNumber) this.open_OtherForm(customerNumber);
    else this.get_cities();
  }
  // added lang and get_lang to utili service
  get_direction() {
    let lang = this.utilService.get_lang();
    if (lang == 'en') {
      return 'ltr';
    } else {
      return 'rtl';
    }
  }
  //

  ngOnInit() {
    this.storageService.get('user_id').then((userId) => {
      console.log(userId);
      this.userId = userId;
      // this.get_cities();
    });

    this.loadForm();
    // this.getDataFromStorage();
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

  // getDataFromStorage() {
  //   this.storageService
  //     .get('Customer_Number')
  //     .then((customerNumber: string) => {
  //       if (!customerNumber) this.get_cities();
  //       else this.open_OtherForm(customerNumber);
  //     });
  // }

  async get_cities() {
    this.userId = await this.storageService.get('user_id');
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.questionnaireService.getCityByUserId(this.userId).subscribe(
      (cities: Cities[]) => {
        this.cities = cities;
        if (cities.length) this.patchValue('DC', cities[0].City);

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
      (customers: Customer[]) => {
        if (customers.length) {
          this.customers = customers;
          this.patchValue('Customer', customers[0]);
        }

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
    this.answerLogs = [];
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
          this.getAnswers();
          loading.dismiss();
          this.getAnswers();
        },
        () => loading.dismiss()
      );
  }

  answers = [];
  getAnswers() {
    this.questionnaireService.getAnswers().subscribe((response: Data[]) => {
      console.log(response);
      this.answers = response;
      this.getAnswerLogs();
    });
  }

  ids = [];
  answerLogs = [];
  getAnswerLogs() {
    this.answerLogService
      .getAnswerlog(
        this.userId,
        this.f.Customer.value.CustCode,
        this.persianCalendarService.getVPPreviousMonthTodayFormat(new Date()),
        this.persianCalendarService.getVPTodayFormat(new Date())
      )
      .subscribe((response: Data[]) => {
        console.log(response);
        this.answerLogs = response;
        if (this.answerLogs.length)
          this.answerLogs.forEach((r) => this.ids.push(r.id));

        this.createQuestion(response);
      });
  }

  createQuestion(answerLogRes: any[]) {
    this.questions.forEach((question, index) => {
      question.answers = [];
      let temp = this.searchQuestionId(question.id, answerLogRes);
      // let al = {};
      switch (question.type) {
        case 'yn':
          if (temp) question.pic = temp.img;
          let yn = {
            img: temp ? temp.img : '',
            answer_id: temp ? temp.answer_id : 0,
            question_id: question.id,
            need_answer: question.need_answer,
            need_pic: false,
            wrong_answer: false,
            wrong_pic: false,
            answer_text: question.answer_text,
          };
          this.answerLogs.push(yn);
          break;

        case 'tx':
          if (temp) question.pic = temp.img;
          let tx = {
            img: temp ? temp.img : '',
            answer_id: -1,
            question_id: question.id,
            need_answer: question.need_answer,
            need_pic: false,
            wrong_answer: false,
            wrong_pic: false,
            answer_text: temp ? temp.answer_text : '',
          };
          this.txtanswers[index] = tx.answer_text; //this.txtanswers[i];
          // al.answer_text=temp.answer_text;
          this.answerLogs.push(tx);
          break;

        default:
          let def = {
            img: '',
            answer_id: [],
            question_id: question.id,
            need_answer: question.need_answer,
            wrong_answer: false,
          };
          this.answerLogs.push(def);
          break;
      }

      this.answers.forEach((answer) => {
        if (answer.question_id == question.id) {
          if (question.type == 'ml') {
            let temp1 = this.searchQuestionAnswerId(
              question.id,
              answer.id,
              answerLogRes
            );
            this.answerLogs[index].answer_id.push(temp1 ? answer.id : 0);
          }
          question.answers.push(answer);
        }
      });
    });
    console.log(this.answerLogs);
    console.log(this.questions);
  }

  searchQuestionAnswerId(question_id, answer_id, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (
        myArray[i].question_id == question_id &&
        myArray[i].answer_id == answer_id
      ) {
        return myArray[i];
      }
    }
  }

  searchQuestionId(question_id, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].question_id == question_id) {
        return myArray[i];
      }
    }
  }

  getAnswerStatus(i: number) {
    if (this.answerLogs[i]) return this.answerLogs[i].wrong_answer;
    else return false;
  }

  radioSelect(i, j) {
    this.answerLogs[i].answer_id = this.questions[i].answers[j].id;
    this.answerLogs[i].need_pic = this.questions[i].answers[j].need_pic;
    this.answerLogs[i].wrong_answer = false;
  }

  active_camera(i) {
    if (this.answerLogs[i]) {
      return this.answerLogs[i].need_pic;
    } else {
      return false;
    }
  }

  get_pic_status(i) {
    if (this.answerLogs[i]) {
      if (this.answerLogs[i].wrong_pic) {
        return 'danger';
      } else {
        return 'secondary';
      }
    } else {
      return 'secondary';
    }
  }

  onCamera(i) {
    this.getPicture(1, i);
  }

  getPicture(type: number, i) {
    // var options = {
    //   sourceType: type,
    //   cameraDirection: 0,//back
    //   quality: 75,
    //   destinationType: Camera.DestinationType.DATA_URL,
    //   //sourceType: Camera.PictureSourceType.CAMERA,
    //   allowEdit: true,
    //   encodingType: Camera.EncodingType.JPEG,
    //   targetWidth: 500,
    //   targetHeight: 500,
    //   saveToPhotoAlbum: false,
    //   correctOrientation: true
    // };
    // Camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = "data:image/jpeg;base64," + imageData;
    //   const fileTransfer = new Transfer();
    //   let uploadOptions = {
    //     fileKey: 'file',
    //     mimeType: 'image/jpeg',
    //     httpMethod: "PUT",
    //   };
    //   fileTransfer.upload(base64Image, "http://77.104.65.168:8002/api/v1/answerlogs", uploadOptions)
    //     .then((result: any) => {
    //       this.server = true;
    //       this.utilService.set_server(true);
    //       var content = JSON.parse(result.response);
    //       this.questions[i].pic = content.destination_name;
    //       this.answerLogs[i].img = content.destination_name;
    //       this.answerLogs[i].wrong_pic = false;
    //     }).catch((error: any) => {
    //       this.server = false;
    //       this.utilService.set_server(false);
    //       this.utilService.presentToast(this.translateService.instant('connection_error'));
    //       console.log(error);
    //     });
    // }, (err) => {
    //   console.log(JSON.stringify(err));
    // });
  }

  check_value(i, j) {
    // console.log(this.answerLogs[i].answer_id);

    if (this.answerLogs[i].answer_id == this.questions[i].answers[j].id) {
      return true;
    } else if (this.answerLogs[i].answer_id[j] == -1) {
      this.radioSelect(i, j);
      return true;
    } else {
      return false;
    }
  }

  checkboxSelect(i, j) {
    // console.log(i + '/' + j);
    if (this.answerLogs[i].answer_id[j] == 0) {
      this.answerLogs[i].answer_id[j] = this.questions[i].answers[j].id;
      this.answerLogs[i].wrong_answer = false;
    } else {
      this.answerLogs[i].answer_id[j] = 0;
    }
  }
  checkbox_value(i, j) {
    if (this.answerLogs[i].answer_id[j] == 0) {
      return false;
    } else {
      return true;
    }
  }

  answer_textValue(i) {
    this.answerLogs[i].answer_text = this.txtanswers[i];
  }

  // checkValue(i, j) {
  //   // console.log(this.answerLogs[i].answer_id);

  //   if (this.answerLogs[i].answer_id == this.questions[i].answers[j].id) {
  //     return true;
  //   }else if (this.answerLogs[i].answer_id[j]==-1){
  //     this.radioSelect(i, j);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  onSubmit() {}

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
