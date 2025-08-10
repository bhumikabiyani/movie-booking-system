package requestResponseModels

type TheatrePayload struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	ImageURL string `json:"image_url"`
	Address string `json:"address"`
	City    string `json:"city"`
}

type TheatreInfo struct {
	URL           string  `json:"url"`
	City          string  `json:"city"`
	Source        string  `json:"source"`
	Address       string  `json:"address"`
	Latitude      float64 `json:"latitude"`
	Longitude     float64 `json:"longitude"`
	Occupancy     int     `json:"occupancy"`
	ChainName     string  `json:"chain_name"`
	MaxCapacity   int     `json:"max_capacity"`
	ScreenCount   int     `json:"screen_count"`
	TheatreType   string  `json:"theatre_type"`
	TicketPrice   float64 `json:"ticket_price"`
	AdditionalInfo *string `json:"additional_info,omitempty"`
}

type TheatreRequestPayload struct{
	SearchString string `json:"search_string"`
	Location string `json:"location"`
}