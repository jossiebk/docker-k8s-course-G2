package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"EventsApi/models"
	"EventsApi/services"
)

type EventController struct {
	service *services.EventService
}

func NewEventController(service *services.EventService) *EventController {
	return &EventController{
		service: service,
	}
}

func (c *EventController) HandleEvents(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		c.getEvents(w, r)
	case http.MethodPost:
		c.createEvent(w, r)
	default:
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
	}
}

func (c *EventController) HandleEventByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	c.getEventByID(w, r)
}

func (c *EventController) HealthLive(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"status": "Healthy",
	})
}

func (c *EventController) HealthReady(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"status": "Healthy",
	})
}

func (c *EventController) getEvents(w http.ResponseWriter, r *http.Request) {
	log.Println("GET /api/events - Inicio")

	events := c.service.GetAll()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(events); err != nil {
		log.Printf("GET /api/events - Error: %v", err)
		return
	}

	log.Printf("GET /api/events - Respuesta 200. Eventos: %d", len(events))
}

func (c *EventController) getEventByID(w http.ResponseWriter, r *http.Request) {
	idText := strings.TrimPrefix(r.URL.Path, "/api/events/")

	id, err := strconv.Atoi(idText)

	if err != nil {
		http.Error(w, "El ID debe ser un número entero.", http.StatusBadRequest)
		return
	}

	log.Printf("GET /api/events/%d - Inicio", id)

	event := c.service.GetByID(id)

	if event == nil {
		log.Printf("GET /api/events/%d - Evento no encontrado", id)
		http.Error(w, "Evento no encontrado.", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(event); err != nil {
		log.Printf("GET /api/events/%d - Error: %v", id, err)
		return
	}

	log.Printf("GET /api/events/%d - Respuesta 200", id)
}

func (c *EventController) createEvent(w http.ResponseWriter, r *http.Request) {
	log.Println("POST /api/events - Inicio")

	var event models.Event

	if err := json.NewDecoder(r.Body).Decode(&event); err != nil {
		log.Printf("POST /api/events - JSON inválido: %v", err)
		http.Error(w, "JSON inválido.", http.StatusBadRequest)
		return
	}

	createdEvent := c.service.Create(event)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(createdEvent); err != nil {
		log.Printf("POST /api/events - Error: %v", err)
		return
	}

	log.Printf("POST /api/events - Evento creado. Id: %d", createdEvent.ID)
}
