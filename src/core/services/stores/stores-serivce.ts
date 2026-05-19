import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class StoresSerivce {
  private readonly _HttpClient = inject(HttpClient)

  getStores():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}stores/`);
  }
}
