import { Injectable } from '@angular/core';
import { JsonHelperService } from './helper-json';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { AppStorageService } from './app-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jsonHelperService: JsonHelperService,
    private http: HttpClient,
    private appStorageService: AppStorageService,
  ) {}
  isLoggedIn(): Observable<boolean> {
    return this.validateToken();
  }

  private validateToken(): Observable<boolean> {
    return from(this.appStorageService.getSessionToken()).pipe(
      switchMap(sessionToken => {
        if (!sessionToken) {
          return of(false);
        }
        const body = {};
        return this.jsonHelperService
          .postJson<any>('/api/user/', body, sessionToken)
          .pipe(
            map(response => {
              if (response) {
                return true;
              } else {
                this.appStorageService.clearSession();
                return false;
              }
            }),
            catchError(error => {
              console.error(error);
              this.appStorageService.clearSession();
              return of(false);
            }),
          );
      }),
    );
  }
}
