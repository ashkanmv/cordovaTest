import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  name: string;
  text: string;
  loading = false;
  public get language(): Language { return this.languageService.language }
  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor }
  constructor(public sharedService: SharedService, private languageService: LanguageService, private contactUsService: ContactUsService) { }

  ngOnInit() { }

  submit() {
    if (!this.text) {
      this.sharedService.toast('danger', this.language.Contact_Us.msg_empty)
      return
    }
    this.loading = true;
    let post = {
      text: this.text
    }

    this.contactUsService.postContactUs(post).subscribe(() => {
      this.loading = false;
      this.text = '';
      this.sharedService.toast('success', this.language.Contact_Us.msg_sent);
    }, () => this.loading = false)
  }
}
