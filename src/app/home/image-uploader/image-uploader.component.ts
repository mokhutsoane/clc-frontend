import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
  IonImg,
  IonLabel,
  IonAvatar,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { HouseService } from 'src/app/service/house/house.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: true,

  imports: [
    IonButton,
    IonButtons,
    IonLabel,
    IonImg,
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
})
export class ImageUploaderComponent implements OnInit, OnDestroy {
  @Input() houseId: any;

  imageUrl: string | null = null;
  file: File | null = null;
  isLoading: boolean = false;
  isToastOpen: boolean = false;
  toastMessage: string = '';
  private subsink = new SubSink();

  constructor(private modalCtrl: ModalController,
    private houseService: HouseService,

  ) { }
  ngOnInit() { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    this.uploadImage()
  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imageUrl = image.webPath ?? null;
    if (this.imageUrl) {
      // Fetch the image as a blob from the URL
      const response = await fetch(this.imageUrl);
      const blob = await response.blob();

      // Create a file from the blob
      this.file = new File([blob], `image.${image.format}`, { type: `image/${image.format}` });

      // Log to verify file data
      console.log(this.file);
    }
  };

  async uploadImage() {
    if (!this.file) {
      console.error("No image file selected for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("house_id", this.houseId);
    formData.append('images', this.file, this.file.name);

    this.isLoading = true;
    this.subsink.add(
      (await this.houseService.addImage(formData)).subscribe({
        next: response => {
          this.isLoading = false;
          this.toastMessage = 'House Added';
          this.setOpen(true);

          this.modalCtrl.dismiss();
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
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
