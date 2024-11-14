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
} from '@ionic/angular/standalone';
import { AppStorageService } from 'src/app/service/app-storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
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
export class RegisterPage implements OnInit {
  private subsink = new SubSink();

  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  fullName: string = '';
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
  register() {
    const email = this.email?.trim();
    const password = this.password?.trim();
    const confirmPassword = this.confirmPassword?.trim();

    if (!this.fullName) {
      this.toastMessage = 'Full Name is requred';
      this.setOpen(true);
      return;
    }
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

    if (password != confirmPassword) {
      this.toastMessage = 'Passwords do not match';
      this.setOpen(true);
      return;
    }
    if (!this.regexp.test(email)) {
      this.toastMessage = 'Invalid Email address';
      this.setOpen(true);
      return;
    }

    const requestBody = {
      name: this.fullName,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };
    this.isLoading = true;
    this.subsink.add(
      this.userService.register(requestBody).subscribe({
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
