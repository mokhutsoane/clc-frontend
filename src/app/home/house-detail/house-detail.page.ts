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
  IonCardSubtitle,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencilOutline, createOutline } from 'ionicons/icons';
import { AddHouseComponent } from '../add-house/add-house.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { HouseService } from 'src/app/service/house/house.service';
import { HouseDetailModel } from 'src/app/model/HouseDetailModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.page.html',
  styleUrls: ['./house-detail.page.scss'],
  standalone: true,
  imports: [
    IonProgressBar,
    IonCardSubtitle,
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
  private subsink = new SubSink();
  readonly baseUrl: string;

  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private houseService: HouseService,
  ) {
    addIcons({ createOutline, add, pencilOutline });
    this.baseUrl = environment.apiUrl;
  }

  isLoading: boolean = false;
  id: string | null = null;
  houseModel: HouseDetailModel = {
    house: {
      id: 0,
      user_id: 0,
      address: '',
      description: '',
      latitude: '',
      longitude: '',
      created_at: '',
      updated_at: '',
    },
    images: [],
  };

  async fetHouse() {
    const requestBody = {
      house_id: this.id ?? '',
    };
    this.isLoading = true;
    this.subsink.add(
      (await this.houseService.getHouse(requestBody)).subscribe({
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

  async deleteHouseImage(imageId?: number) {
    const requestBody = {
      id: String(imageId),
    };
    this.isLoading = true;
    this.subsink.add(
      (await this.houseService.removeImage(requestBody)).subscribe({
        next: response => {
          this.isLoading = false;
          this.fetHouse();
        },
        error: error => {
          this.isLoading = false;
          console.error(error);
        },
      }),
    );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddHouseComponent,
      componentProps: {
        house: this.houseModel.house,
        isUpdating: true,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.fetHouse();
    }

    modal.onDidDismiss().then(result => {
      const { data, role } = result;

      if (role === 'confirm') {
        console.log(role);
      } else {
        console.log(role);
      }
    });
  }

  async openImageModal() {
    const modal = await this.modalCtrl.create({
      component: ImageUploaderComponent,
      componentProps: {
        houseId: this.houseModel.house.id,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role !== 'cancel') {
      this.fetHouse();
    }
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  async ionViewDidEnter() {
    await this.fetHouse();
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
