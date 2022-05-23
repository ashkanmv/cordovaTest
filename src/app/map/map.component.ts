import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private _showMap: boolean;

  public get showMap(): boolean { return this._showMap }
  @Input() set showMap(v: boolean) {
    this._showMap = v;
    if (v == true)
      this.loadMap()
  }


  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  constructor(private plt: Platform) { }

  ngOnInit() {

  }

  ionViewDidEnter() {

  }

  loadMap() {    
    this.plt.ready().then(() => {
      const geoapifyAPIKey = "5908d42d2c0344b2af400a77ab03ed10";
      // const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

      const initialState = {
        lng: 51.395,
        lat: 35.713,
        zoom: 11
      };

      const map = new L.Map(this.mapContainer.nativeElement).setView(
        [initialState.lat, initialState.lng],
        initialState.zoom
      );

      L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${geoapifyAPIKey}`, {
        maxZoom: 20, id: 'osm-bright'
      }).addTo(map);
    })
  }
}
