import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItem,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  ModalController,
  IonModal,
  IonLabel,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { House } from 'src/app/model/HouseModel';
import { HouseService } from 'src/app/service/house/house.service';

import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonButtons,
    IonLabel,
    IonModal,
    IonCardContent,
    IonContent,
    IonToolbar,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonList,
    IonItem,
    IonFabButton,
    IonFab,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddHouseComponent implements OnInit, OnDestroy {
  @Input() house: House = {
    address: '',
    description: '',
    latitude: null,
    longitude: null,
  };
  @Input() isUpdating: boolean = false;

  @ViewChild('map')
  mapRef!: ElementRef;
  newMap!: GoogleMap;
  marker!: Marker;

  name: string | undefined;
  latitude: any = null;
  longitude: any = null;
  address: string = '';

  isToastOpen: boolean = false;
  toastMessage: string = '';

  pageTitel: string = '';

  private subsink = new SubSink();
  isLoading: boolean = false;

  // house: House = {
  //   address: '',
  //   description: '',
  //   latitude: "",
  //   longitude: ""
  // }

  constructor(
    private modalCtrl: ModalController,
    private houseService: HouseService,
  ) {}

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
    await this.newMap.addMarker(marker);
    this.newMap.setOnMarkerDragEndListener(async marker => {
      (this.house.latitude = String(marker.latitude)),
        (this.house.longitude = String(marker.longitude));
    });
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    if (this.isUpdating) {
      this.updateHouse();
    } else {
      this.addHouse();
    }
  }

  async addHouse() {
    if (
      !this.house.latitude ||
      !this.house.longitude ||
      !this.house.address ||
      !this.house.description
    ) {
      this.toastMessage = 'All fields must be filled';
      this.setOpen(true);
      return;
    }
    this.isLoading = true;
    this.subsink.add(
      (await this.houseService.addHouse(this.house)).subscribe({
        next: response => {
          this.isLoading = false;
          this.toastMessage = 'House Added';
          this.setOpen(true);

          this.modalCtrl.dismiss(this.name, 'confirm');
        },
        error: error => {
          this.isLoading = false;
          console.error(error);
          this.toastMessage = error;
          this.setOpen(true);
        },
      }),
    );
  }

  async updateHouse() {
    if (
      !this.house.latitude ||
      !this.house.longitude ||
      !this.house.address ||
      !this.house.description
    ) {
      this.toastMessage = 'All fields must be filled';
      this.setOpen(true);
      return;
    }
    this.isLoading = true;
    this.subsink.add(
      (await this.houseService.updateHouse(this.house)).subscribe({
        next: response => {
          this.isLoading = false;
          this.toastMessage = 'House Updated';
          this.setOpen(true);

          this.modalCtrl.dismiss(this.name, 'confirm');
        },
        error: error => {
          this.isLoading = false;
          console.error(error);
          this.toastMessage = error;
          this.setOpen(true);
        },
      }),
    );
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  isHouseDataEmpty() {
    return (
      !this.house.address &&
      !this.house.description &&
      !this.house.latitude &&
      !this.house.longitude
    );
  }
  ngOnInit() {
    if (!this.isHouseDataEmpty()) {
      this.pageTitel = 'Edit House';
    } else {
      this.pageTitel = 'add House';
    }
    this.latitude =
      Number(this.house.latitude) == 0
        ? -25.741583431753494
        : Number(this.house.latitude);
    this.longitude =
      Number(this.house.longitude) == 0
        ? 28.196763182055655
        : Number(this.house.longitude);
    console.log(this.latitude);
  }
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
