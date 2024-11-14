import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JsonHelperService {
  private readonly baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }
  fullUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }
  postJson<T>(url: string, body: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      accept: 'application/json',
    });
    return this.http.post<T>(this.fullUrl(url), body, { headers });
  }

  postImage<T>(url: string, body: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    });
    return this.http.post<T>(this.fullUrl(url), body, { headers });
  }

  deleteJson<T>(url: string, body: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      accept: 'application/json',
    });
    const options = {
      headers,
      body,
    };
    return this.http.delete<T>(this.fullUrl(url), options);
  }

  updateJson<T>(url: string, body: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      accept: 'application/json',
    });

    return this.http.put<T>(this.fullUrl(url), body, { headers });
  }
}
