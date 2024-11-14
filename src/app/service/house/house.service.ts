import { Injectable } from '@angular/core';
import { JsonHelperService } from '../helper-json';
import { AppStorageService } from '../app-storage.service';
import { House, HouseModel } from 'src/app/model/HouseModel';
import { HouseDetailModel } from 'src/app/model/HouseDetailModel';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  token: string = '';

  constructor(
    private jsonHelperService: JsonHelperService,
    private appStorageService: AppStorageService,
  ) {}
  async getHouses(body: {}) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.postJson<HouseModel>(
      '/api/houses/',
      body,
      sessionToken ?? '',
    );
  }

  async getHouse(body: { house_id: string }) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.postJson<HouseDetailModel>(
      '/api/house/show/',
      body,
      sessionToken ?? '',
    );
  }

  async removeHouse(body: { house_id: string }) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.deleteJson<HouseDetailModel>(
      '/api/house/delete/',
      body,
      sessionToken ?? '',
    );
  }

  async addHouse(body: House) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.postJson<HouseDetailModel>(
      '/api/house/add/',
      body,
      sessionToken ?? '',
    );
  }

  async updateHouse(body: House) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.updateJson<HouseDetailModel>(
      `/api/house/${body.id}/update/`,
      body,
      sessionToken ?? '',
    );
  }

  async addImage(formData: FormData) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.postImage<any>(
      '/api/house/damage-images/',
      formData,
      sessionToken ?? '',
    );
  }

  async removeImage(body: { id: string }) {
    const sessionToken = await this.appStorageService.getSessionToken();
    return this.jsonHelperService.deleteJson<any>(
      `/api/house/damage-images/${body.id}/delete/`,
      body,
      sessionToken ?? '',
    );
  }
}
