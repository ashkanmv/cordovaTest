import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openMenu(){
    const modal = await  this.modalCtrl.create({
      component : MenuComponent,
      id : 'modal'
    })
    await modal.present();

    const response = modal.onDidDismiss()

    console.log(response);
  }
}
