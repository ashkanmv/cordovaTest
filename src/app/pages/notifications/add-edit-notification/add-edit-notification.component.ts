import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Language, News } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-add-edit-notification',
  templateUrl: './add-edit-notification.component.html',
  styleUrls: ['./add-edit-notification.component.scss'],
})
export class AddEditNotificationComponent implements OnInit {
  @Input() news: News;
  form: FormGroup;


  public get language(): Language {
    return this.languageService.language
  }


  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private notificationService : NotificationsService
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      title: [this.news ? this.news.title : null, [Validators.required]],
      description: [this.news ? this.news.text : null, [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.news) this.update();
    else this.add()
  }

  add(){
    // camera
    // let news = {
    //   pic: this.pic,
    //   title: this.f.title.value,
    //   text: this.f.description.value,
    //   type: this.fileTyep
    // };
    // this.notificationService.postNews()
  }

  update(){

  }

  camera() {

  }

  gallery() {

  }

  dismiss(submitted: boolean) {
    this.modalCtrl.dismiss(submitted);
  }
}
