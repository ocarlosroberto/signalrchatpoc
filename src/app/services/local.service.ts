import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getUserName(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "username");
  }
}
