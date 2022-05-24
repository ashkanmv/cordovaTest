import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import { Marker } from '../shared/common';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private _showMap: boolean;
  private _markers: Marker[] = [];

  public get showMap(): boolean {
    return this._showMap;
  }
  @Input() set showMap(v: boolean) {
    this._showMap = v;
    if (v == true) this.loadMap();
  }

  public get markers(): Marker[] {
    return this._markers;
  }

  @Input() set markers(v: Marker[]) {
    this.setMarkers(v);
  }

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  constructor(private plt: Platform, private mapService: MapService) {}

  ngOnInit() {}

  ionViewDidEnter() {}

  loadMap() {
    this.plt.ready().then(() => {
      const geoapifyAPIKey = this.mapService.geoapifyAPIKey;
      const initialState = {
        lng: 51.395,
        lat: 35.713,
        zoom: 11,
      };

      this.map = new L.Map(this.mapContainer.nativeElement).setView(
        [initialState.lat, initialState.lng],
        initialState.zoom
      );

      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${geoapifyAPIKey}`,
        {
          maxZoom: 20,
          id: 'osm-bright',
        }
      ).addTo(this.map);

      var circle = L.circle([35.745853, 51.441404], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(this.map);

      var polygon = L.polygon([
        [35.747956, 51.441753],
        [35.747843, 51.438985],
        [35.74672, 51.439843],
      ]).addTo(this.map);
    });
  }

  setMarkers(markers: Marker[]) {
    if (!markers.length) L.marker;
    var greenIcon = L.icon({
      iconUrl: 'assets/icon/location.svg',
      iconSize: [38, 95],
    });

    markers.forEach((m: Marker) => {
      var marker = L.marker([m.latitude, m.longitude], {
        icon: greenIcon,
      }).addTo(this.map);
      // .bindPopup(m.description ?? null, { closeButton: false });
    });
  }
}
