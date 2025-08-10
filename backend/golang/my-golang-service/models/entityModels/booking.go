package entitymodels

type Booking struct {
	ID               int    `json:"id"`
	ShowID           int    `json:"show_id"`
	TicketNo         string `json:"ticket_no"`
	TotalSeatsBooked int    `json:"total_seats_booked"`
	Info             []byte `json:"info"`
}
