import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const KEY_TOKEN = 'CLC_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  async clearSession() {
    console.log('Clear');
    await Preferences.remove({ key: KEY_TOKEN });
  }

  async putSessionToken(sessionToken: string) {
    await Preferences.set({
      key: KEY_TOKEN,
      value: sessionToken,
    });
  }

  async getSessionToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: KEY_TOKEN });
    return value || null;
  }
}
