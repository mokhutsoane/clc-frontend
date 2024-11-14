import { Injectable } from '@angular/core';
import { JsonHelperService } from '../helper-json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private jsonHelperService: JsonHelperService) {}
  login(body: { email: string; password: string }) {
    return this.jsonHelperService.postJson<any>('/api/auth/login/', body, '');
  }
}
