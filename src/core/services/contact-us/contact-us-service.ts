import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private readonly _HttpClient = inject(HttpClient)

  contactUs(data:any):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}contact-us/`, data);
  }
}
