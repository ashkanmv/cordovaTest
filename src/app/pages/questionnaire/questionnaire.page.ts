import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { BackgroundGeolocationResponse } from '@awesome-cordova-plugins/background-geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  ThemeColors,
  Cities,
  Customer,
  Language,
  Question,
  Questioncat,
} from 'src/app/shared/common';
import { GeoLocationService } from 'src/app/shared/geo-location.service';
import { LanguageService } from 'src/app/shared/language.service';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { SharedService } from 'src/app/shared/shared.service';
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
  loadings: LoadingController[] = [];
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
  paramSubscription: Subscription;

  public get language(): Language { return this.languageService.language; }

  public get isOnline() { return this.sharedService.isOnline; }

  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    public languageService: LanguageService,
    private answerLogService: AnswerLogService,
    public persianCalendarService: PersianCalendarService,
    private utilService: UtilService,
    private cam: Camera,
    private fileTransfer: FileTransfer,
    public sharedService: SharedService,
    private geoLocationService: GeoLocationService
  ) {
    this.paramSubscription = this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params['customerNumber'])
          this.open_OtherForm(params['customerNumber']);
      }
    );
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

  ngOnInit() {
    this.storageService.get('user_id').then((userId) => {
      this.userId = userId;
    });
    this.get_cities();
    this.loadForm();    
  }

  ionViewWillLeave() {
    if(this.paramSubscription)
      this.paramSubscription.unsubscribe()
    this.removeAllLoadings();
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

  async get_cities() {
    const key = '';
    this.userId = await this.storageService.get('user_id');
    this.presentLoading(key);
    this.questionnaireService.getCityByUserId(this.userId).subscribe(
      (cities: Cities[]) => {
        this.cities = cities;
        if (cities.length) this.patchValue('DC', cities[0].City);

        this.dismissLoading(key);
      },
      () => this.dismissLoading(key)
    );
  }

  async selectCity(value: string | any) {
    this.routes = [];
    const key = 'selectCity';
    this.presentLoading(key);
    let cityName = typeof value == 'string' ? value : value.detail.value;
    this.questionnaireService.getRouteByUserId(cityName, this.userId).subscribe(
      (routes: { routename: string }[]) => {
        this.routes = routes;
        this.dismissLoading(key);
      },
      () => this.dismissLoading(key)
    );
  }

  async selectRoute(value: any) {
    const key = 'selectRoute';
    this.presentLoading(key);
    this.questionnaireService
      .routedailySelectByRouteByUser(value.detail.value, this.userId)
      .subscribe(
        (data: Data[]) => {
          this.routedailys = data;
          this.dismissLoading(key);
        },
        () => this.dismissLoading(key)
      );
  }

  async open_OtherForm(customerNumber: string) {
    const key = 'open_OtherForm';
    this.presentLoading(key);
    this.questionnaireService.getCustomersByNumber(customerNumber).subscribe(
      (customers: Customer[]) => {
        if (customers.length) {
          this.customers = customers;
          this.patchValue('Customer', customers[0]);
        }

        this.dismissLoading(key);
      },
      () => this.dismissLoading(key)
    );
  }

  async selectRouteDaily(value: any) {
    const key = 'selectRouteDaily';
    this.presentLoading(key);
    this.questionnaireService
      .getCustomersByRouteIdStep(value.detail.value)
      .subscribe(
        (customers: Customer[]) => {
          this.customers = customers;
          this.dismissLoading(key);
        },
        () => this.dismissLoading(key)
      );
  }

  async selectCustomer(customer: any) {
    const key = 'selectCustomer';
    this.presentLoading(key);
    this.questioncats = [];
    this.questionnaireService.getQuestionCatsByUserId(this.userId).subscribe(
      (questioncats: Questioncat[]) => {
        this.questioncats = questioncats;
        this.dismissLoading(key);
      },
      () => this.dismissLoading(key)
    );
  }

  async selectQuestion(value: any) {
    this.answerLogs = [];
    const key = 'selectQuestion';
    this.presentLoading(key);
    this.questionnaireService
      .getQuestionsByCat('fa', value.detail.value)
      .subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          this.getAnswers();
          this.dismissLoading(key);
          this.getAnswers();
        },
        () => this.dismissLoading(key)
      );
  }

  answers = [];
  getAnswers() {
    this.questionnaireService.getAnswers().subscribe((response: Data[]) => {
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
    var options: CameraOptions = {
      sourceType: type,
      cameraDirection: 0,//back
      quality: 75,
      destinationType: this.cam.DestinationType.DATA_URL,
      allowEdit: true,
      encodingType: this.cam.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.cam.getPicture(options).then((imageData) => {
      let transfer: FileTransferObject = this.fileTransfer.create();
      let base64Image = "data:image/jpeg;base64," + imageData;

      let uploadOptions: FileUploadOptions = {
        fileKey: 'file',
        mimeType: 'image/jpeg',
        httpMethod: "PUT",
      };
      transfer.upload(base64Image, "http://77.104.65.168:8002/api/v1/answerlogs", uploadOptions)
        .then((result: any) => {
          this.utilService.set_server(true);
          var content = JSON.parse(result.response);
          this.questions[i].pic = content.destination_name;
          this.answerLogs[i].img = content.destination_name;
          this.answerLogs[i].wrong_pic = false;
        });
    });
  }

  check_value(i, j) {

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

  //   if (this.answerLogs[i].answer_id == this.questions[i].answers[j].id) {
  //     return true;
  //   }else if (this.answerLogs[i].answer_id[j]==-1){
  //     this.radioSelect(i, j);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  async onSubmit() {
    this.userId = await this.storageService.get('user_id');
    const key = 'onSubmit';
    this.presentLoading(key);
    let validationError = this.checkAnswers()

    if (validationError) {
      this.sharedService.toast('danger', validationError.message);
      this.dismissLoading(key);
      return
    }

    this.geoLocationService.getCurrentLocation().then(location => {
      let temp = this.handleRows(location);

      if (this.ids.length)
        this.patchAnswerlog(temp);
      else
        this.postAnswerlog(temp);
    }).catch(() => {
      this.sharedService.toast('danger', this.language.Gps_error);
      this.dismissLoading(key)
    })
  }

  patchAnswerlog(createdRows) {
    this.answerLogService.patchAnswerlog(
      createdRows, this.ids.join(','), this.f.DC.value,
      this.f.Route.value, this.f.RouteDaily.value, this.f.QuestionCategory.value).subscribe(() => {
        this.removeAllLoadings();
        this.sharedService.toast('success', this.language.Questionnaire.Msg_update);
      })
  }

  postAnswerlog(createdRows) {
    this.answerLogService.postAnswerlog(createdRows, this.f.DC.value,
      this.f.Route.value, this.f.RouteDaily.value, this.f.QuestionCategory.value).subscribe(() => {
        this.removeAllLoadings();
        this.sharedService.toast('success', this.language.Questionnaire.Msg_submit);
        this.router.navigate(['/'])
      })
  }

  handleRows(location: BackgroundGeolocationResponse) {
    let temp = {
      rows: []
    }
    for (var i = 0; i < this.answerLogs.length; i++) {
      //yn
      if ((typeof this.answerLogs[i].answer_id) == "number" && this.answerLogs[i].answer_id != -1) {
        if (this.answerLogs[i].answer_id != 0) {
          let row = {
            img: this.answerLogs[i].img,
            user_id: this.userId,
            customer_code: this.f.Customer.value.CustCode,
            user_lat: location.latitude,
            user_lng: location.longitude,
            question_id: this.answerLogs[i].question_id,
            answer_id: this.answerLogs[i].answer_id,
            answer_text: ""
          }
          temp.rows.push(row);
        }
      } else if (this.answerLogs[i].answer_id == -1) {
        if (this.answerLogs[i].answer_id != 0) {
          let row = {
            img: this.answerLogs[i].img,
            user_id: this.userId,
            customer_code: this.f.Customer.value.CustCode,
            user_lat: location.latitude,
            user_lng: location.longitude,
            question_id: this.answerLogs[i].question_id,
            answer_id: this.answerLogs[i].answer_id,
            answer_text: this.answerLogs[i].answer_text
          }
          temp.rows.push(row);
        }
      } else {//ml
        for (var j = 0; j < this.answerLogs[i].answer_id.length; j++) {
          if (this.answerLogs[i].answer_id[j] != 0) {
            let row = {
              img: this.answerLogs[i].img,
              user_id: this.userId,
              customer_code: this.f.Customer.value.CustCode,
              user_lat: location.latitude,
              user_lng: location.longitude,
              question_id: this.answerLogs[i].question_id,
              answer_id: this.answerLogs[i].answer_id[j],
              answer_text: ""

            }
            temp.rows.push(row);
          }
        }
      }
    }
    return temp;
  }

  checkAnswers() {
    let pass = true;
    let message = '';
    for (var i = 0; i < this.answerLogs.length; i++) {
      if ((typeof this.answerLogs[i].answer_id) == "number" && this.answerLogs[i].answer_id != -1) {
        if (this.answerLogs[i].need_answer && this.answerLogs[i].answer_id == 0) {
          pass = false;
          message = this.language.Questionnaire.Msg_answer_neccesary;
          this.answerLogs[i].wrong_answer = true;
          // break;
        } else if (this.answerLogs[i].need_pic && this.answerLogs[i].img == '') {
          pass = false;
          message = this.language.Questionnaire.Msg_image_neccesary;
          this.answerLogs[i].wrong_pic = true;
          // break;
        }
      } else if (this.answerLogs[i].answer_id == -1) {
        if (this.answerLogs[i].need_answer && (this.answerLogs[i].answer_text == undefined || this.answerLogs[i].answer_text == '')) {
          pass = false;
          message = this.language.Questionnaire.Msg_answer_neccesary;
          this.answerLogs[i].wrong_answer = true;
          // break;
        } else if (this.answerLogs[i].need_pic && this.answerLogs[i].img == '') {
          pass = false;
          message = this.language.Questionnaire.Msg_image_neccesary;
          this.answerLogs[i].wrong_pic = true;
          // break;
        }
      } else {
        if (this.answerLogs[i].need_answer && this.answerLogs[i].answer_id.length == 0) {
          pass = false;
          message = this.language.Questionnaire.Msg_answer_neccesary;
          this.answerLogs[i].wrong_answer = true;
        } else if (this.answerLogs[i].need_pic && this.answerLogs[i].img == '') {
          pass = false;
          message = this.language.Questionnaire.Msg_image_neccesary;
          this.answerLogs[i].wrong_pic = true;
        }
      }
    }

    return pass == true ? null : { pass, message };
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
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
