import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import { Subscription } from 'rxjs';
import { MapView, Marker, Polyline } from '../shared/common';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private _showMap: boolean;
  layerGroup: L.LayerGroup;
  public get showMap(): boolean {
    return this._showMap;
  }

  @Input() set showMap(v: boolean) {
    this._showMap = v;
    if (v == true) this.init();
  }

  private _markers: Marker[] = [];
  public get markers(): Marker[] { return this._markers; }
  @Input() set markers(v: Marker[]) { if (v?.length) this.setMarkers(v); }
  private _polylines: Polyline[];
  public get polylines(): Polyline[] { return this._polylines; }
  @Input() set polylines(v: Polyline[]) {
    if (v) this.setPolyline(v);
  }

  @Input() set mapView(v: MapView) {
    if (v)
      this.flyTo(v)
  }

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  clearMapSubscription: Subscription;
  constructor(private plt: Platform, private mapService: MapService, private router: Router) {
    this.clearMapSubscription = this.mapService.clearMarkers.subscribe(() => this.clearMarkers());
  }

  ngOnInit() { }

  ionViewDidEnter() { }

  clearMarkers() {
    this.mapService.mapInitialized.next(false);
    this.layerGroup.clearLayers();
    this.mapService.mapInitialized.next(true);
  }

  loadMap() {
    const geoapifyAPIKey = this.mapService.geoapifyAPIKey;

    this.map = new L.Map(this.mapContainer.nativeElement).setView(
      [33.786271, 51.7933669],
      6
    );

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${geoapifyAPIKey}`,
      {
        maxZoom: 20,
        id: 'osm-bright',
      }
    ).addTo(this.map);

    // var circle = L.circle([35.745853, 51.441404], {
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5,
    //   radius: 500,
    // }).addTo(this.map);

    // var polyline = L.polyline([
    //   [35.747956, 51.441753],
    //   [35.747843, 51.438985],
    //   [35.74672, 51.439843],
    // ]).addTo(this.map);
    this.mapService.mapInitialized.next(true);
  }

  init() {
    this.plt.ready().then(() => {
      const geoapifyAPIKey = this.mapService.geoapifyAPIKey;

      this.map = new L.Map(this.mapContainer.nativeElement).setView(
        [33.786271, 51.7933669],
        6
      );

      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${geoapifyAPIKey}`,
        {
          maxZoom: 20,
          id: 'osm-bright',
        }
      ).addTo(this.map);
      this.layerGroup = L.layerGroup().addTo(this.map);

      this.mapService.mapInitialized.next(true);
    });
  }

  setPolyline(polylines: Polyline[]) {
    polylines.forEach(polyline => {
      let p = L.polyline(polyline.latLng,polyline.options)
        .addTo(this.layerGroup);
    });
  }

  setMarkers(markers: Marker[]) {
    markers.forEach((m: Marker) => {
      let marker = L.marker([m.latitude, m.longitude], {
        icon: L.icon(m.icon),
      }).bindPopup(m.description ?? null, { closeButton: false })
        .addTo(this.layerGroup);
      if (m.customerCode)
        marker.on("popupopen", (a) => {
          var popUp = a.target.getPopup()
          popUp.getElement()
            .querySelector("#chBtn")
            .addEventListener("click", () => {
              this.customerHistoryButtonAction(m.customerCode);
            });
          popUp.getElement()
            .querySelector("#quBtn")
            .addEventListener("click", () => {
              this.questionnaireButtonAction(m.customerCode);
            });
        })
    });
  }

  questionnaireButtonAction(customerCode: number) {
    this.router.navigate(['/questionnaire'], { queryParams: { 'customerNumber': customerCode } })
  }

  customerHistoryButtonAction(customerCode: number) {
    this.router.navigate(['/customer-history'], { queryParams: { 'customerNumber': customerCode } })
  }

  flyTo(mapView: MapView) {
    this.map.flyTo([mapView.lat, mapView.lng], mapView.zoom);
  }
}
