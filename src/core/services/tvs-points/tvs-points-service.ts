import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TvsPointsService {
 private readonly _HttpClient = inject(HttpClient);

  history: any[] = [];
  tvc_points: any;
  data: any;

  getInfo(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}users/me/`);
  }

  getPointsToken(): Observable<any> {
    return this._HttpClient.post(
      'https://api.tradelinestores.net/token',
      'grant_type=password&Password=Tr%40deLin3&Username=Tradeline'
    );
  }

  getPoints(phone: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.tradelinestores.net/api/Account/GetPoints/${phone}`
    );
  }

  getPointsHistory(phone: string): Observable<any> {
    return this._HttpClient.post(
      'https://api.tradelinestores.net/api/Account/GetCustomersPoints/',
      { id: phone }
    );
  }

  getHistory(history: any = null): any {
    if (history === null) {
      return this.history;
    }

    this.history = history;
    return this.history;
  }

}
