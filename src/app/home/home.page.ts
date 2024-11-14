/// <reference types="@types/google.maps" />

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { AddHouseComponent } from './add-house/add-house.component';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { HouseService } from '../service/house/house.service';
import { House, HouseModel } from '../model/HouseModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
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
})
export class HomePage implements OnInit, OnDestroy {
  private subsink = new SubSink();
  isLoading: boolean = false;
  houseModel: HouseModel = {
    houses: [],
  };

  isToastOpen: boolean = false;
  toastMessage: string = '';
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private houseService: HouseService,
  ) {
    addIcons({
      add,
    });
  }
  message =
    'This modal example uses the modalController to present and dismiss modals.';

  async fetHouses() {
    const requestBody = {};
    this.isLoading = true;
    this.subsink.add(
      (await this.houseService.getHouses(requestBody)).subscribe({
        next: response => {
          this.houseModel = response;
          this.isLoading = false;
        },
        error: error => {
          this.isLoading = false;
          console.error(error);
        },
      }),
    );
  }

  async deleteHouse(id?: number) {
    const requestBody = {
      house_id: String(id),
    };
    this.isLoading = true;
    this.subsink.add(
      (await this.houseService.removeHouse(requestBody)).subscribe({
        next: response => {
          this.isLoading = false;
          this.toastMessage = 'House Deleted';
          this.setOpen(true);
          this.fetHouses();
        },
        error: error => {
          this.isLoading = false;
          console.error(error);
        },
      }),
    );
  }
  async ionViewDidEnter() {
    await this.fetHouses();
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddHouseComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log(this.message);
      this.fetHouses();
    }
    modal.onDidDismiss().then(result => {
      const { data, role } = result;

      if (role === 'confirm') {
      } else {
      }
    });
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  goToDetailPage(id: number | null) {
    this.router.navigate(['/house-detail', id]);
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
