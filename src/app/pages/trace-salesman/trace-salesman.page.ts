import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-trace-salesman',
  templateUrl: './trace-salesman.page.html',
  styleUrls: ['./trace-salesman.page.scss'],
})
export class TraceSalesmanPage implements OnInit {
  show = false;
  showMap = false;
  selectedDate = new Date().toISOString();
  mapInitSubscription: Subscription;
  public get language(): Language {
    return this.languageService.language;
  }

  constructor(
    private languageService: LanguageService,
    private mapService : MapService
  ) { 
    this.mapInitSubscription = this.mapService.mapInitialized.subscribe(
      (initialized: boolean) => {
        if (initialized ) {
          
        }
      }
    );
  }

  ionViewDidEnter() {
    this.showMap = true;
  }

  ngOnInit() { }

  ionViewWillLeave() {
    this.showMap = false;
    if (this.mapInitSubscription) this.mapInitSubscription.unsubscribe();
  }

  dateChanged() {

  }
}
