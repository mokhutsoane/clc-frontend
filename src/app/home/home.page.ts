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
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
  ) {
    addIcons({
      add,
    });
  }
  message =
    'This modal example uses the modalController to present and dismiss modals.';
  ngOnInit(): void {}
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddHouseComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  goToDetailPage(id: number) {
    this.router.navigate(['/house-detail', id]);
  }
  ngOnDestroy(): void {}
}
