import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../language.service';
import { PersianCalendarService } from '../../persian-calendar.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  today = new Date();

  constructor(public persianCalendarService: PersianCalendarService,
    private languageService: LanguageService) { }

  ngOnInit() {

    this.persianCalendarService.PersianCalendar(new Date())
  }


  weekDay() {
    if (this.languageService.selectedLanguageEnum == 'EN')
      return this.persianCalendarService.gregorianWeekDay[this.today.getDay()]
    else
      return this.persianCalendarService.strWeekDay
  }

  dayAndMonth() {
    if (this.languageService.selectedLanguageEnum == 'EN')
      return this.today.getUTCDate() + ' ' + this.today.toLocaleString('en-us', { month: 'long' });
    else
      return this.persianCalendarService.day + ' ' + this.persianCalendarService.strMonth

  }

}
