import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  ModalController,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencilOutline, createOutline } from 'ionicons/icons';
import { AddHouseComponent } from '../add-house/add-house.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.page.html',
  styleUrls: ['./house-detail.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    IonFabButton,
    IonFab,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonItem,
    IonButton,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class HouseDetailPage implements OnInit {
  constructor(private modalCtrl: ModalController) {
    addIcons({ createOutline, add, pencilOutline });
  }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddHouseComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  async openImageModal() {
    const modal = await this.modalCtrl.create({
      component: ImageUploaderComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
}
