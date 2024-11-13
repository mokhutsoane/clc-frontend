import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonToast,
  IonCardContent,
  IonLabel,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonLabel,
    IonCardContent,
    ReactiveFormsModule,
    FormsModule,
    IonToast,
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    RouterLink,
  ],
})
export class LoginPage implements OnInit {
  password: string = '';
  email: string = '';
  isLoading: boolean = false;
  isToastOpen: boolean = false;
  toastMessage: string = '';
  constructor(private router: Router) {}

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  login() {
    const email = this.email?.trim();
    const password = this.password?.trim();
    if (!email) {
      this.toastMessage = 'Email is requred';
      this.setOpen(true);
      return;
    }
    if (!password) {
      this.toastMessage = 'Password is requred';
      this.setOpen(true);
      return;
    }
    if (!this.regexp.test(email)) {
      this.toastMessage = 'Invalid Email address';
      this.setOpen(true);
      return;
    }

    console.log(this.password);
    console.log(this.email);
  }
}
