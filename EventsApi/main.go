package main

import (
	"log"
	"net/http"
	"os"

	"EventsApi/controllers"
	"EventsApi/services"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	eventService := services.NewEventService()
	eventController := controllers.NewEventController(eventService)

	mux := http.NewServeMux()

	mux.HandleFunc("/api/events", eventController.HandleEvents)
	mux.HandleFunc("/api/events/", eventController.HandleEventByID)

	mux.HandleFunc("/health/live", eventController.HealthLive)
	mux.HandleFunc("/health/ready", eventController.HealthReady)

	port := os.Getenv("PORT")

	if port == "" {
		port = "6003"
	}

	server := corsMiddleware(mux)

	log.Printf("EventsApi listening on port :%s", port)

	if err := http.ListenAndServe(":"+port, server); err != nil {
		log.Fatalf("Error al iniciar EventsApi: %v", err)
	}
}