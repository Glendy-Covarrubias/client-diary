import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diary } from '../models/diary';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  public endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.url_base}/api`;
  }

  public getAllDiary(): Observable<Array<Diary>>{
    return this.http.get<Array<Diary>>(`${this.endpoint}/diaries`);
    //INTERCEPTOR Manual
    /*const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get<Array<Diary>>(`${this.endpoint}/diaries`, { headers: headers });*/
  }

  public createDiary(data: Diary): Observable<Diary>{
    console.log("SAVE SERVICIO CREATE:", data);
    //this.endpoint + `/monitor-califica/lotes`
    return this.http.post<Diary>(`${this.endpoint}/diary`, data);
  }

  public editDiary(data: Diary): Observable<Diary>{
    console.log("SAVE SERVICIO EDIT:", data, `${this.endpoint}/diary/${data.id}`);
    return this.http.put<Diary>(`${this.endpoint}/diary/${data.id}`, data)
  }

  public deleteRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/diary/${id}`);
  }

  public getRecord(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/diary/${id}`);
  }
}
