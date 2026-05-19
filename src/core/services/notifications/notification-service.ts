import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _HttpClient = inject(HttpClient)

  getNotificationsListing():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}notifications/`);
  }

}
