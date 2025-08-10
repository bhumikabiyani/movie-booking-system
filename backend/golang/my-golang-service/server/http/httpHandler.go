package httpserver

import (
	"encoding/json"
	"errors"
	"log"
	c "my-golang-service/core"
	entityModel "my-golang-service/models/entityModels"
	requestResponseModels "my-golang-service/models/requestResponseModels"
	"net/http"
	"strconv"

	"gorm.io/gorm"
)

func HandleRequests(db *gorm.DB) {
	http.HandleFunc("/", c.HomePage)
	http.HandleFunc("/movies", GetAllMovies(db))
	http.HandleFunc("/movie", GetMovieByID(db))
	http.HandleFunc("/theatres", GetAllTheatres(db))
	http.HandleFunc("/prefill-shows", PrefillShows(db))
	http.HandleFunc("/bookings", CreateBooking(db))
	http.HandleFunc("/getAllBookings", GetAllBookings(db))
	http.HandleFunc("/getBookingById", GetBookingById(db))
	http.HandleFunc("/getShowsByMovieId", GetShowsByMovieId(db))
	http.HandleFunc("/getBookedSeatsForShow", GetBookedSeatsForShow(db))
	http.HandleFunc("/getShows", GetAllBookings(db))
	http.HandleFunc("/prefill-seats", PrefillSeats(db))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// Functions serving as handlers take a
// `http.ResponseWriter` and a `http.Request` as
// arguments. The response writer is used to fill in the
// HTTP response.

func GetBookedSeatsForShow(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		showIDStr := r.URL.Query().Get("show_id")
		if showIDStr == "" {
			http.Error(w, "Show ID is required", http.StatusBadRequest)
			return
		}
		showID, err := strconv.Atoi(showIDStr)
		if err != nil {
			http.Error(w, "Invalid Show ID", http.StatusBadRequest)
			return
		}
		seats, err := c.GetBookedSeatsForShow(db, showID)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				http.Error(w, "No seats found for the show", http.StatusNotFound)
				return
			}
			log.Printf("Error retrieving seats: %v", err)
			http.Error(w, "Failed to fetch seats", http.StatusInternalServerError)
			return
		}
		response := struct {
			Success bool               `json:"success"`
			Seats   []entityModel.Seat `json:"seats"`
		}{
			Success: true,
			Seats:   seats,
		}
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}
	}
}

func GetMovieByID(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		// Check if the movie ID is present in the query parameters
		movieID := r.URL.Query().Get("id")
		if movieID == "" {
			http.Error(w, "Movie ID is required", http.StatusBadRequest)
			return
		}

		// Convert the movie ID to an integer
		movieIDInt, err := strconv.Atoi(movieID)
		if err != nil {
			http.Error(w, "Invalid Movie ID", http.StatusBadRequest)
			return
		}

		// Create the payload for the movie ID
		moviePayload := requestResponseModels.MovieDetailByIdPayload{
			ID: movieIDInt,
		}

		// Call the core function to get the movie by ID
		movie, err := c.GetMovieByID(db, moviePayload)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				http.Error(w, "Movie not found", http.StatusNotFound)
				return
			}
			log.Printf("Error retrieving movie: %v", err)
			http.Error(w, "Failed to fetch movie", http.StatusInternalServerError)
			return
		}

		// Prepare the response object
		response := struct {
			Success bool                                     `json:"success"`
			Movie   requestResponseModels.MovieDetailPayload `json:"movie"`
		}{
			Success: true,
			Movie:   *movie,
		}

		// Set the Content-Type header to application/json
		w.Header().Set("Content-Type", "application/json")

		// Encode the response into JSON and write to the response
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}

		// If everything went well, respond with 200 OK
		w.WriteHeader(http.StatusOK)
	}
}
func GetAllMovies(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		language := r.URL.Query().Get("language")
		searchString := r.URL.Query().Get("search_string")

		moviePayload := requestResponseModels.MovieRequestPayload{
			Language:     language,
			SearchString: searchString,
		}
		movies, err := c.GetAllMovies(db, moviePayload)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				// Handle record not found scenario
				http.Error(w, "No movies found matching the criteria", http.StatusNotFound)
				return
			}

			log.Printf("Error retrieving movies: %v", err)

			http.Error(w, "Failed to fetch movies", http.StatusInternalServerError)
			return
		}

		// Prepare the response object
		response := struct {
			Success bool                                 `json:"success"`
			Movies  []requestResponseModels.MoviePayload `json:"movies"`
		}{
			Success: true,
			Movies:  movies,
		}

		w.Header().Set("Content-Type", "application/json")

		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)

			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}
func GetAllTheatres(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		searchString := r.URL.Query().Get("name")
		location := r.URL.Query().Get("location")

		theatreRequestPayload := requestResponseModels.TheatreRequestPayload{
			SearchString: searchString,
			Location:     location,
		}

		theatres, err := c.GetAllTheatres(db, theatreRequestPayload)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				http.Error(w, "No theatres found matching the criteria", http.StatusNotFound)
				return
			}
			log.Printf("Error retrieving theatres: %v", err)
			http.Error(w, "Failed to fetch theatres", http.StatusInternalServerError)
			return
		}

		response := struct {
			Success  bool                                   `json:"success"`
			Theatres []requestResponseModels.TheatrePayload `json:"theatres"`
		}{
			Success:  true,
			Theatres: theatres,
		}

		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}
	}
}
func CreateBooking(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var bookingRequest requestResponseModels.BookingRequest
		if err := json.NewDecoder(r.Body).Decode(&bookingRequest); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		bookingId, err := c.CreateBooking(db, bookingRequest)

		if err != nil {
			log.Printf("Error creating booking: %v", err)
			http.Error(w, "Failed to create booking", http.StatusInternalServerError)
			return
		}
		response := struct {
			Success  bool `json:"success"`
			Bookings int  `json:"booking"`
		}{
			Success:  true,
			Bookings: bookingId,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}
	}
}
func PrefillShows(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := c.PrefillShows(db)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		// err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}
	}
}

func GetAllBookings(db *gorm.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		bookings, err := c.GetAllBookings(db)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				http.Error(w, "No bookings found matching the criteria", http.StatusNotFound)
				return
			}
			log.Printf("Error retrieving bookings: %v", err)
			http.Error(w, "Failed to fetch bookings", http.StatusInternalServerError)
			return
		}
		response := struct {
			Success  bool                                    `json:"success"`
			Bookings []requestResponseModels.BookingResponse `json:"bookings"`
		}{
			Success:  true,
			Bookings: bookings,
		}
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}

	}
}

func GetBookingById(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		bookingId := r.URL.Query().Get("id")
		if bookingId == "" {
			http.Error(w, "Booking ID is required", http.StatusBadRequest)
			return
		}
		bookingIdInt, err := strconv.Atoi(bookingId)

		if err != nil {
			http.Error(w, "Invalid Booking ID", http.StatusBadRequest)
			return
		}
		bookingPayload := requestResponseModels.BookingDetailByIdPayload{
			ID: bookingIdInt,
		}
		booking, err := c.GetBookingById(db, bookingPayload)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				http.Error(w, "Booking not found", http.StatusNotFound)
				return
			}
			log.Printf("Error retrieving booking: %v", err)
			http.Error(w, "Failed to fetch booking", http.StatusInternalServerError)
			return
		}

		response := struct {
			Success bool                                  `json:"success"`
			Booking requestResponseModels.BookingResponse `json:"booking"`
		}{
			Success: true,
			Booking: *booking,
		}

		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}
	}
}

func GetShowsByMovieId(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		movieIDStr := r.URL.Query().Get("movie_id")
		if movieIDStr == "" {
			http.Error(w, "Movie ID is required", http.StatusBadRequest)
			return
		}
		movieID, err := strconv.Atoi(movieIDStr)
		if err != nil {
			http.Error(w, "Invalid Movie ID", http.StatusBadRequest)
			return
		}
		shows, err := c.GetShowsByMovieID(db, movieID)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				http.Error(w, "No shows found for the movie", http.StatusNotFound)
				return
			}
			log.Printf("Error retrieving shows: %v", err)
			http.Error(w, "Failed to fetch shows", http.StatusInternalServerError)
			return
		}
		response := struct {
			Success bool                                          `json:"success"`
			Shows   []requestResponseModels.ShowDetailByIDPayload `json:"shows"`
		}{
			Success: true,
			Shows:   shows,
		}
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("Error encoding response to JSON: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}
	}
}

func PrefillSeats(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		
		// Extract show ID from the query parameters
		showIDStr := r.URL.Query().Get("show_id")
		if showIDStr == "" {
			http.Error(w, "Show ID is required", http.StatusBadRequest)
			return
		}
		showID, err := strconv.Atoi(showIDStr)
		if err != nil {
			http.Error(w, "Invalid Show ID", http.StatusBadRequest)
			return
		}
		// Define seat layout (rows and columns)
		rows := []string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J"}
		columns := 10 // Number of seats in each row
		// Prepare seats for insertion
		var seats []entityModel.Seat
		for _, row := range rows {
			for col := 1; col <= columns; col++ {
				seat := entityModel.Seat{
					ShowID:     showID,
					SeatNumber: row + strconv.Itoa(col),
					Occupied:   false,
				}
				seats = append(seats, seat)
			}
		}
		// Insert the seats into the database
		err = db.Create(&seats).Error
		if err != nil {
			log.Printf("Error creating seats: %v", err)
			http.Error(w, "Failed to create seats", http.StatusInternalServerError)
			return
		}
		// Respond with success
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{
			"success": true,
			"message": "Seats created successfully",
		}
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("Error encoding response: %v", err)
			http.Error(w, "Failed to encode response as JSON", http.StatusInternalServerError)
			return
		}
	}
}
