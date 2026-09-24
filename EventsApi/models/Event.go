package models

type Event struct {
	ID           int    `json:"id"`
	NombreEvento string `json:"nombreEvento"`
	FechaHora    string `json:"fechaHora"`
	Descripcion  string `json:"descripcion"`
}
