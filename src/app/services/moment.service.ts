import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';
import { Response } from '../Response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(`${this.baseApiUrl}/moments`);
  }

  createMoment(moment: Moment): Observable<Moment> {
    return this.http.post<Moment>(`${this.baseApiUrl}/moment`, moment);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    return this.http.get<Response<Moment>>(`${this.baseApiUrl}/moments/${id}`);
  }

  removeMoment(id: number) {
    return this.http.delete(`${this.baseApiUrl}/moments/${id}`);
  }

  updateMoment(moment: Moment): Observable<Response<Moment>> {
    return this.http.put<Response<Moment>>(`${this.baseApiUrl}/moment`, moment);
  }
}
