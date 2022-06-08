import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-trace-salesman',
  templateUrl: './trace-salesman.page.html',
  styleUrls: ['./trace-salesman.page.scss'],
})
export class TraceSalesmanPage implements OnInit {
  show = true;
  dateNow = new Date();
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  constructor() {}
  confirm() {
    this.datetime.confirm();
  }

  reset() {
    this.datetime.reset();
  }
  ngOnInit() {}
}
