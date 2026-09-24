import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Users } from './pages/users/users';
import { BooksPage } from './pages/books/books';
import { EventsPage } from './pages/events/events';
import { ReviewsPage } from './pages/reviews/reviews';
import { ReservationsPage } from './pages/reservations/reservations';
import { OrdersPage } from './pages/orders/orders';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'users',
    component: Users
  },
  {
    path: 'books',
    component: BooksPage
  },
  {
    path: 'events',
    component: EventsPage
  },
  {
    path: 'reviews',
    component: ReviewsPage
  },
  {
    path: 'reservations',
    component: ReservationsPage
  },
  {
    path: 'orders',
    component: OrdersPage
  }
];