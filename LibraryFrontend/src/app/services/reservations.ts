import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class Reservations {

  private readonly apiUrl = `${API_CONFIG.reservations}/api/reservations`;

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  create(reservation: Omit<Reservation, 'id'>): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }
}