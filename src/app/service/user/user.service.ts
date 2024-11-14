import { Injectable } from '@angular/core';
import { JsonHelperService } from '../helper-json';
import { AppStorageService } from '../app-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private jsonHelperService: JsonHelperService,
    private appStorageService: AppStorageService,
  ) {}
  login(body: { email: string; password: string }) {
    return this.jsonHelperService.postJson<any>('/api/auth/login/', body, '');
  }

  register(body: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return this.jsonHelperService.postJson<any>(
      '/api/auth/register/',
      body,
      '',
    );
  }

  async logout(body: {}) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.postJson<any>(
      '/api/auth/logout/',
      body,
      sessionToken ?? '',
    );
  }
}
