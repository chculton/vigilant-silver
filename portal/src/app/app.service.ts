import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  login(loginData: any) {
    const url = 'http://localhost:3000/login'
    return this.httpClient.post(url, loginData, { observe: 'response' })
  }
}
