import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker,  } from '@capacitor/google-maps';

import {
  ModalController
} from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AddHouseComponent implements OnInit {
  @ViewChild('map')
  mapRef!: ElementRef;
  newMap!: GoogleMap;
  marker!: Marker;

  name: string | undefined;
  latitude: number = -25.741583431753494;
  longitude: number = 28.196763182055655;
  address: string = '';
  markerId: string | undefined;

  constructor(private modalCtrl: ModalController) { }


  async ionViewDidEnter() {
    if (this.mapRef?.nativeElement) {
      await this.createMap();
      await this.addDraggableMarker(this.latitude, this.longitude);
    } else {
      console.error('mapRef is undefined');
    }
  }
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapApiKey,
      forceCreate: true,
      config: {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 8,
        styles: [] as google.maps.MapTypeStyle[],
      },
    });
  }

  async addDraggableMarker(lat: number, lng: number) {
    const marker: Marker = {
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: '',
      snippet: '',
      draggable: true,
    };
    await this.newMap.addMarker(marker)

    this.newMap.setOnMarkerDragEndListener(async (marker) => {
      this.latitude = marker.latitude,
        this.longitude = marker.longitude;
    });

  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    console.log(this.latitude)
    console.log(this.longitude)
    // return this.modalCtrl.dismiss(this.name, 'confirm');

  }
  ngOnInit() {
  }
}