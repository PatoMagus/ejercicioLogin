import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iLogin } from '../models/login.interface';
import { iResponse } from '../models/response.interface';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/';
  }

  loginByEmail(form:iLogin):Observable<iResponse>{
    const dir = this.baseUrl + "api/auth/signin";
    return this.httpClient.post<iResponse>(dir, form);
  }

  getAll(): Promise<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + "api/users").toPromise();
  }

  getById(pId: string): Promise<any>{
    return this.httpClient.get<any>(`${this.baseUrl + "api/users"}/${pId}`).toPromise();
  }

  create({ username, passwornd, email, roles }){
    const bodyRequest = { username, passwornd, email, roles };
    return this.httpClient.post<any>(this.baseUrl + "api/users", bodyRequest).toPromise();
  }

}
