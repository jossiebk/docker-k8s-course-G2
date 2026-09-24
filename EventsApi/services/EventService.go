package services

import (
	"EventsApi/models"
)

type EventService struct {
	events []models.Event
}

func NewEventService() *EventService {
	return &EventService{
		events: []models.Event{
			{ID: 1, NombreEvento: "Feria del Libro", FechaHora: "2026-01-15T10:00:00", Descripcion: "Feria anual de libros y literatura."},
			{ID: 2, NombreEvento: "Club de Lectura", FechaHora: "2026-01-20T18:00:00", Descripcion: "Reunión mensual del club de lectura."},
			{ID: 3, NombreEvento: "Presentación Literaria", FechaHora: "2026-02-05T17:00:00", Descripcion: "Presentación de nuevas obras literarias."},
			{ID: 4, NombreEvento: "Taller de Escritura", FechaHora: "2026-02-12T15:00:00", Descripcion: "Taller práctico de escritura creativa."},
			{ID: 5, NombreEvento: "Encuentro de Autores", FechaHora: "2026-02-20T16:00:00", Descripcion: "Encuentro con autores nacionales."},
			{ID: 6, NombreEvento: "Lectura Infantil", FechaHora: "2026-03-01T11:00:00", Descripcion: "Actividad de lectura para niños."},
			{ID: 7, NombreEvento: "Conferencia de Literatura", FechaHora: "2026-03-10T18:30:00", Descripcion: "Conferencia sobre literatura contemporánea."},
			{ID: 8, NombreEvento: "Tarde de Poesía", FechaHora: "2026-03-18T17:30:00", Descripcion: "Lectura y recital de poesía."},
			{ID: 9, NombreEvento: "Taller de Novela", FechaHora: "2026-04-02T14:00:00", Descripcion: "Taller sobre creación y estructura de novelas."},
			{ID: 10, NombreEvento: "Día del Libro", FechaHora: "2026-04-23T10:00:00", Descripcion: "Celebración internacional del Día del Libro."},
			{ID: 11, NombreEvento: "Café Literario", FechaHora: "2026-05-08T18:00:00", Descripcion: "Conversación abierta sobre literatura."},
			{ID: 12, NombreEvento: "Exposición de Libros", FechaHora: "2026-05-20T09:00:00", Descripcion: "Exposición de libros destacados."},
			{ID: 13, NombreEvento: "Seminario de Literatura", FechaHora: "2026-06-05T16:00:00", Descripcion: "Seminario sobre historia de la literatura."},
			{ID: 14, NombreEvento: "Festival de Lectura", FechaHora: "2026-06-15T10:30:00", Descripcion: "Festival dedicado a promover la lectura."},
			{ID: 15, NombreEvento: "Noche de Autores", FechaHora: "2026-07-10T19:00:00", Descripcion: "Conversatorio nocturno con escritores invitados."},
		},
	}
}

func (s *EventService) GetAll() []models.Event {
	return s.events
}

func (s *EventService) GetByID(id int) *models.Event {
	for i := range s.events {
		if s.events[i].ID == id {
			return &s.events[i]
		}
	}

	return nil
}

func (s *EventService) Create(event models.Event) models.Event {
	event.ID = len(s.events) + 1
	s.events = append(s.events, event)

	return event
}
