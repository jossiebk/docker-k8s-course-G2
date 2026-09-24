import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Review } from '../../models/review';
import { Reviews } from '../../services/reviews';

@Component({
  selector: 'app-reviews',
  imports: [FormsModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class ReviewsPage implements OnInit {

  reviews: Review[] = [];
  filteredReviews: Review[] = [];

  searchId = '';

  showForm = false;

  newReview: Omit<Review, 'id'> = {
    tituloLibro: '',
    nombreUsuario: '',
    calificacion: 5,
    comentario: ''
  };

  constructor(private readonly reviewsService: Reviews) {
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    console.log('REVIEWS: iniciando GET');

    this.reviewsService.getAll().subscribe({
      next: (reviews) => {
        console.log('REVIEWS: respuesta recibida:', reviews);

        this.reviews = reviews;
        this.filteredReviews = reviews;

        console.log('REVIEWS: registros asignados:', this.reviews.length);
      },
      error: (error) => {
        console.error('REVIEWS: ERROR:', error);
      }
    });
  }

  search(): void {
    const id = Number(this.searchId);

    if (!this.searchId.trim()) {
      this.filteredReviews = this.reviews;
      return;
    }

    if (Number.isNaN(id)) {
      this.filteredReviews = [];
      return;
    }

    this.reviewsService.getById(id).subscribe({
      next: (review) => {
        this.filteredReviews = [review];
      },
      error: (error) => {
        console.error('REVIEWS SEARCH ERROR:', error);
        this.filteredReviews = [];
      }
    });
  }

  clearSearch(): void {
    this.searchId = '';
    this.filteredReviews = this.reviews;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createReview(): void {
    this.reviewsService.create(this.newReview).subscribe({
      next: (review) => {
        console.log('REVIEW CREATED:', review);

        this.reviews.push(review);
        this.filteredReviews = this.reviews;

        this.newReview = {
          tituloLibro: '',
          nombreUsuario: '',
          calificacion: 5,
          comentario: ''
        };

        this.showForm = false;
      },
      error: (error) => {
        console.error('REVIEW CREATE ERROR:', error);
      }
    });
  }
}