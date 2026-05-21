import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient)

  login(body:any):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}users/login/`, body);
  }

  register(body:any):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}users/me/?from_mobile=true`, body);
  }

  updateUser(data:any):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}users/me/`, data);
  }

  changePassword(data:any):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}users/me/change-password/`, data);
  }

}
