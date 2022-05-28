import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../component/popover/popover.component';

@Component({
  selector: 'app-gps-tracking',
  templateUrl: './gps-tracking.page.html',
  styleUrls: ['./gps-tracking.page.scss'],
})
export class GpsTrackingPage implements OnInit {
  Date: string = 'Date';
  constructor(
    private router: Router,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
