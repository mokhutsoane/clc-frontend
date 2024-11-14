import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonToast,
  IonLabel,
} from '@ionic/angular/standalone';
import { AppStorageService } from 'src/app/service/app-storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
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
export class LoginPage implements OnInit, OnDestroy {
  private subsink = new SubSink();

  password: string = '';
  email: string = '';
  isLoading: boolean = false;
  isToastOpen: boolean = false;
  toastMessage: string = '';
  constructor(
    private router: Router,
    private userService: UserService,
    private appStorageService: AppStorageService,
  ) {}

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

    const requestBody = {
      email: email,
      password: password,
    };
    this.isLoading = true;
    this.subsink.add(
      this.userService.login(requestBody).subscribe({
        next: response => {
          this.appStorageService.putSessionToken(response.token);
          this.router
            .navigate(['/'])
            .then(value1 => {})
            .catch(reason => {});
          this.isLoading = false;
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
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
