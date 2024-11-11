import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit, OnDestroy {
  constructor() {}

  myName: string = '';
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.myName = 'Thabo';
  }
}
