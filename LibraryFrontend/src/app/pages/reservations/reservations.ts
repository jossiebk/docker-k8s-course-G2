import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Reservation } from '../../models/reservation';
import { Reservations } from '../../services/reservations';

@Component({
  selector: 'app-reservations',
  imports: [FormsModule, DatePipe],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css'
})
export class ReservationsPage implements OnInit {

  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];

  searchId = '';
  showForm = false;

  newReservation: Omit<Reservation, 'id'> = {
    tituloLibro: '',
    nombreUsuario: '',
    fechaReserva: '',
    fechaDevolucion: null,
    diasReservados: 1
  };

  constructor(private readonly reservationsService: Reservations) {
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    console.log('RESERVATIONS: iniciando GET');

    this.reservationsService.getAll().subscribe({
      next: (reservations) => {
        console.log('RESERVATIONS: respuesta recibida:', reservations);

        this.reservations = reservations;
        this.filteredReservations = reservations;

        console.log(
          'RESERVATIONS: registros asignados:',
          this.reservations.length
        );
      },
      error: (error) => {
        console.error('RESERVATIONS: ERROR:', error);
      }
    });
  }

  search(): void {
    const id = Number(this.searchId);

    if (!this.searchId.trim()) {
      this.filteredReservations = this.reservations;
      return;
    }

    if (Number.isNaN(id)) {
      this.filteredReservations = [];
      return;
    }

    this.reservationsService.getById(id).subscribe({
      next: (reservation) => {
        this.filteredReservations = [reservation];
      },
      error: (error) => {
        console.error('RESERVATION SEARCH ERROR:', error);
        this.filteredReservations = [];
      }
    });
  }

  clearSearch(): void {
    this.searchId = '';
    this.filteredReservations = this.reservations;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createReservation(): void {
    this.reservationsService.create(this.newReservation).subscribe({
      next: (reservation) => {
        console.log('RESERVATION CREATED:', reservation);

        this.reservations.push(reservation);
        this.filteredReservations = this.reservations;

        this.newReservation = {
          tituloLibro: '',
          nombreUsuario: '',
          fechaReserva: '',
          fechaDevolucion: null,
          diasReservados: 1
        };

        this.showForm = false;
      },
      error: (error) => {
        console.error('RESERVATION CREATE ERROR:', error);
      }
    });
  }
}