package requestResponseModels

import (
	"time"
)

type BookingRequest struct {
	ShowID int `json:"show_id"`
	Seats []string `json:"seats"`
}
type ShowDetailPayload struct {
	ID int `json:"id"`
}
type ShowDetailByIDPayload struct {
	ID          int       `json:"id"`
	StartTime   time.Time `json:"start_time"`
	Date        time.Time `json:"date"`
	TheatreID   int       `json:"theatre_id"`
	TheatreName string    `json:"theatre_name"`
}
type BookingInfo struct {
	MovieName     string    `json:"movie_name"`
	Language      string    `json:"language"`
	ImageURL      string    `json:"image_url"`
	Duration      string    `json:"duration"`
	Rating        string    `json:"rating"`
	ReleaseDate   string    `json:"release_dates"`
	Genre         string    `json:"genre"`
	ShowStartTime time.Time `json:"show_start_time"`
	ShowDate      time.Time `json:"show_date"`
	TheatreID     int       `json:"theatre_id"`
	Seats         []string  `json:"seats"`
}

type BookingResponse struct {
	BookingID        int         `json:"booking_id"`
	ShowID           int         `json:"show_id"`
	TicketNo         string      `json:"ticket_no"`
	TotalSeatsBooked int         `json:"total_seats_booked"`
	Seats            []string    `json:"seats"`
	BookingInfo      BookingInfo `json:"booking_info"`
}
type BookingDetailByIdPayload struct {
	ID int `json:"id"`
}
