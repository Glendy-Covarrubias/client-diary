import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.url_base}/api`
  }

  public login(data: User): Observable<string> {
    return this.http.post<any>(`${this.endpoint}/login`, data);
  }
}
