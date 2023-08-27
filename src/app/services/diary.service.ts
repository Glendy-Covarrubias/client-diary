import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Diary } from '../models/diary';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  public endpoint: string;
  constructor(private http: HttpClient) {
    this.endpoint = 'http://localhost:3000/api';
  }

  public getAllDiary(): Observable<Array<Diary>>{
    return this.http.get<Array<Diary>>(`${this.endpoint}/diaries`);
  }

  public createDiary(data: Diary): Observable<Diary>{
    console.log("SAVE SERVICIO:", data);
    //this.endpoint + `/monitor-califica/lotes`
    return this.http.post<Diary>(`${this.endpoint}/diary`, data);
  }

  public deleteRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/diary/${id}`);
  }
}
