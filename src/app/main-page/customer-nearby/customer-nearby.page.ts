import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MapService } from 'src/app/map/map.service';

@Component({
  selector: 'app-customer-nearby',
  templateUrl: './customer-nearby.page.html',
  styleUrls: ['./customer-nearby.page.scss'],
})
export class CustomerNearbyPage implements OnInit {
  showMap = false;
  constructor(private plt: Platform,private mapService : MapService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.plt.ready().then(()=>{
      setTimeout(() => {
        this.showMap = true
      }, 500);
    })
  }
}
