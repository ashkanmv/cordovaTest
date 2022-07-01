import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Language, News } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { NotificationsService } from '../notifications.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { SharedService } from 'src/app/shared/shared.service';


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
    private notificationService: NotificationsService,
    private cam: Camera,
    private fileTransfer: FileTransfer,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      title: [this.news ? this.news.title : null, [Validators.required]],
      text: [this.news ? this.news.text : null, [Validators.required]],
      fileType: [this.news ? this.news.type : null],
      pic: [this.news ? this.news.pic : null],
      id: [this.news ? this.news.id : null]
    });
  }

  get f() {
    return this.form.controls;
  }

  camera() {
    this.getPicture(1)
  }

  gallery() {
    this.getPicture(0)
  }


  getPicture(type: number) {
    var options = {
      sourceType: type,
      destinationType: this.cam.DestinationType.DATA_URL,
      mediaType: this.cam.MediaType.ALLMEDIA,
    };

    this.cam.getPicture(options).then((imageData) => {
      let uploadType = imageData.substring(imageData.length - 3, (imageData.length))
      switch (uploadType) {
        case '3gp':
          this.patchValue('fileType', 'video');
          break;
        case 'mp4':
          this.patchValue('fileType', 'video');
          break;
        case 'jpg':
          this.patchValue('fileType', 'image');
          break;
        case 'gif':
          this.patchValue('fileType', 'image');
          break;
        case 'png':
          this.patchValue('fileType', 'image');
          break;
        default:
          this.patchValue('fileType', 'other');
          break;
      }      

      if (this.f.fileType.value != 'video' || this.f.fileType.value != 'image') {
        this.sharedService.toast('danger', this.language.Add_Edit_News.OutOfType);
        return
      }

      let uploadOptions: FileUploadOptions = {
        fileKey: 'file',
        mimeType: String.prototype.concat(this.f.fileType.value, '/', uploadType),
        httpMethod: "PUT",
      };
      let transfer: FileTransferObject = this.fileTransfer.create();
      transfer.upload(imageData, this.notificationService.uploadUrl, uploadOptions)
        .then((result: any) => {
          
          var content = JSON.parse(result.response);
          console.log(content);
          this.patchValue('pic', content.destination_name);
        });
    });
  }

  onSubmit() {
    if (this.news) this.update();
    else this.add()
  }

  add() {
    this.notificationService.postNews(this.f).subscribe(()=>{
      this.sharedService.toast('success',this.language.Add_Edit_News.NewsCreated);
      this.dismiss(true)
    })
  }

  update() {
    this.notificationService.patchNews(this.f).subscribe(()=>{
      this.sharedService.toast('success',this.language.Add_Edit_News.NewsUpdated);
      this.dismiss(true)
    })
  }

  dismiss(submitted: boolean) {
    this.modalCtrl.dismiss(submitted);
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
