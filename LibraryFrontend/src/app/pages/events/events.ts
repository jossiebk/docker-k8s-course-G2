import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Event } from '../../models/event';
import { Events } from '../../services/events';

@Component({
  selector: 'app-events',
  imports: [FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class EventsPage implements OnInit {

  events: Event[] = [];

  searchId: number | null = null;

  editingEventId: number | null = null;

  formEvent: Omit<Event, 'id'> = {
    nombreEvento: '',
    fechaHora: '',
    descripcion: ''
  };

  message = '';
  errorMessage = '';

  constructor(private readonly eventsService: Events) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.clearMessages();

    this.eventsService.getAll().subscribe({
      next: (events) => {
        console.log('EVENTS RESPONSE:', events);
        this.events = events;
      },
      error: (error) => {
        console.error('EVENTS ERROR:', error);
        this.errorMessage = 'No fue posible obtener los eventos.';
      }
    });
  }

  searchEvent(): void {
    this.clearMessages();

    if (this.searchId === null || this.searchId <= 0) {
      this.errorMessage = 'Ingresa un ID válido.';
      return;
    }

    this.eventsService.getById(this.searchId).subscribe({
      next: (event) => {
        this.events = [event];
      },
      error: (error) => {
        console.error('EVENT SEARCH ERROR:', error);

        if (error.status === 404) {
          this.errorMessage = 'No se encontró un evento con ese ID.';
        } else {
          this.errorMessage = 'No fue posible buscar el evento.';
        }

        this.events = [];
      }
    });
  }

  showAllEvents(): void {
    this.searchId = null;
    this.loadEvents();
  }

  submitForm(): void {
    this.clearMessages();

    if (
      !this.formEvent.nombreEvento.trim() ||
      !this.formEvent.fechaHora ||
      !this.formEvent.descripcion.trim()
    ) {
      this.errorMessage = 'Completa todos los campos correctamente.';
      return;
    }

    if (this.editingEventId === null) {
      this.createEvent();
    } else {
      this.updateEvent();
    }
  }

  createEvent(): void {
    this.eventsService.create(this.formEvent).subscribe({
      next: (event) => {
        console.log('EVENT CREATED:', event);

        this.message = 'Evento creado correctamente.';
        this.resetForm();
        this.loadEvents();
      },
      error: (error) => {
        console.error('EVENT CREATE ERROR:', error);
        this.errorMessage = 'No fue posible crear el evento.';
      }
    });
  }

  editEvent(event: Event): void {
    this.clearMessages();

    this.editingEventId = event.id;

    this.formEvent = {
      nombreEvento: event.nombreEvento,
      fechaHora: event.fechaHora,
      descripcion: event.descripcion
    };
  }

  updateEvent(): void {
    if (this.editingEventId === null) {
      return;
    }

    this.eventsService.update(
      this.editingEventId,
      this.formEvent
    ).subscribe({
      next: (event) => {
        console.log('EVENT UPDATED:', event);

        this.message = 'Evento actualizado correctamente.';
        this.resetForm();
        this.loadEvents();
      },
      error: (error) => {
        console.error('EVENT UPDATE ERROR:', error);
        this.errorMessage = 'No fue posible actualizar el evento.';
      }
    });
  }

  deleteEvent(event: Event): void {
    this.clearMessages();

    const confirmed = confirm(
      `¿Deseas eliminar el evento "${event.nombreEvento}"?`
    );

    if (!confirmed) {
      return;
    }

    this.eventsService.delete(event.id).subscribe({
      next: () => {
        this.message = 'Evento eliminado correctamente.';
        this.loadEvents();
      },
      error: (error) => {
        console.error('EVENT DELETE ERROR:', error);
        this.errorMessage = 'No fue posible eliminar el evento.';
      }
    });
  }

  resetForm(): void {
    this.editingEventId = null;

    this.formEvent = {
      nombreEvento: '',
      fechaHora: '',
      descripcion: ''
    };
  }

  cancelEdit(): void {
    this.resetForm();
    this.clearMessages();
  }

  private clearMessages(): void {
    this.message = '';
    this.errorMessage = '';
  }
}