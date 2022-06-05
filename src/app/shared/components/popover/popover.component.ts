import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverItem } from '../../common';



@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() items: PopoverItem[] = [];
  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() { }

  dismiss(value: any) {
    this.popoverCtrl.dismiss(value);
  }
}
