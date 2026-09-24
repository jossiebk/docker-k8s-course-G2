import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class Orders {

  private readonly apiUrl = `${API_CONFIG.orders}/api/orders`;

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  create(order: Omit<Order, 'id'>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}