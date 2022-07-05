import { Component, OnInit } from '@angular/core';
import { Language } from '../../common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-logOut',
  templateUrl: './logOut.component.html',
  styleUrls: ['./logOut.component.scss'],
})
export class LogOutComponent implements OnInit {

  public get language(): Language{
    return this.languageService.language;
  }

  constructor(private languageService: LanguageService) { }

  ngOnInit() {}

}
