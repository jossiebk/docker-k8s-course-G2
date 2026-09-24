import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class Reviews {

  private readonly apiUrl = `${API_CONFIG.reviews}/api/reviews`;

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  getById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  create(review: Omit<Review, 'id'>): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }
}