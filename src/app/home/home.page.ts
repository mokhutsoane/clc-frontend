import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, IonFabList, IonItem, IonList, IonLabel, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, heart, addOutline, addCircleSharp, add, chevronUpCircle, document, colorPalette, globe } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonLabel, IonList, IonItem, IonFabList, IonFabButton, IonFab, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit, OnDestroy {
  constructor() {
    addIcons({add,chevronUpCircle,document,colorPalette,globe,addCircleSharp,addOutline,heart,logoIonic});
  }

  myName: string = '';
  ngOnDestroy(): void { }
  ngOnInit(): void {
    this.myName = 'Thabo';
  }
}
