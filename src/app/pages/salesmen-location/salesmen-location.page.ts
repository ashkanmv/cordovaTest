import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';

@Component({
  selector: 'app-salesmen-location',
  templateUrl: './salesmen-location.page.html',
  styleUrls: ['./salesmen-location.page.scss'],
})
export class SalesmenLocationPage implements OnInit {
  dateNow = new Date();
  // mock data
  salesmansData = [];

  constructor(private router: Router, public popoverctrl: PopoverController) {
    this.salesmansData = [
      { name: 'John' },
      { name: 'Michael' },
      { name: 'Michael' },
      { name: 'Tanya' },
    ];
  }

  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverctrl.create({
      component: PopoverComponent,
      cssClass: 'custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
