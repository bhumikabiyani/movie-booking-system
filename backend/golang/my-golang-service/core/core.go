package core

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	datamapper "my-golang-service/dataMapper"
	entityModels "my-golang-service/models/entityModels"
	requestResponseModels "my-golang-service/models/requestResponseModels"
	repo "my-golang-service/repo"
	"net/http"
	"strconv"
	"strings"
	"time"

	"golang.org/x/exp/rand"
	"gorm.io/gorm"
)

func HomePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Home Page!")
	fmt.Println("Endpoint Hit: homePage")
}

func GetAllTheatres(db *gorm.DB, theatreRequestPayload requestResponseModels.TheatreRequestPayload) ([]requestResponseModels.TheatrePayload, error) {
	var theatres []entityModels.Theatre

	// Construct the filter string based on the name and location in the payload
	filterString := ""
	if theatreRequestPayload.SearchString != "" {
		filterString += "name ILIKE '%" + theatreRequestPayload.SearchString + "%'"
	}
	if theatreRequestPayload.Location != "" {
		if filterString != "" {
			filterString += " AND "
		}
		filterString += "info->>'city' ILIKE '%" + theatreRequestPayload.Location + "%'"
	}

	// Pass the filterString to the repository function
	theatres, err := repo.GetAllTheatres(db, filterString)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("No theatre found for location: %s", theatreRequestPayload.Location)
			return []requestResponseModels.TheatrePayload{}, nil
		}
		return nil, err
	}

	var response []requestResponseModels.TheatrePayload
	for _, theatre := range theatres {
		responseTheatre, err := datamapper.MapTheatreToPayload(theatre)
		if err != nil {
			log.Printf("Error mapping theatre ID %d: %v", theatre.ID, err)
			continue
		}
		response = append(response, *responseTheatre)
	}
	return response, nil
}

func GetAllMovies(db *gorm.DB, movieRequestPayload requestResponseModels.MovieRequestPayload) ([]requestResponseModels.MoviePayload, error) {
	var movies []entityModels.Movie

	filterParts := []string{}

	if movieRequestPayload.Language != "" {
		languageFilter := "info->>'language' ILIKE '" + movieRequestPayload.Language + "'"
		filterParts = append(filterParts, languageFilter)
	}

	if movieRequestPayload.SearchString != "" {
		searchFilter := "name ILIKE '%" + movieRequestPayload.SearchString + "%'"
		filterParts = append(filterParts, searchFilter)
	}

	filterString := ""
	if len(filterParts) > 0 {
		filterString = strings.Join(filterParts, " AND ")
	}
	movies, err := repo.GetAllMovies(db, filterString)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("No movies found for language: %s", movieRequestPayload.Language)
			return []requestResponseModels.MoviePayload{}, nil
		}
		return nil, err
	}
	var response []requestResponseModels.MoviePayload
	for _, movie := range movies {
		responseMovie, err := datamapper.MapMovieToPayload(movie)
		if err != nil {
			// Log the error and skip to the next movie
			log.Printf("Error mapping movie ID %d: %v", movie.ID, err)
			continue
		}

		// Only append if there's no error
		response = append(response, *responseMovie)
	}
	return response, nil
}

// func PrefillSeats(db *gorm.DB, showID int, rows []string) error {

// }

func PrefillShows(db *gorm.DB) error {
	// Define the list of movie IDs and theatre IDs
	movieIDs := []int{1, 2, 3, 4, 5}
	theatreIDs := []int{1, 2, 3, 4, 5}

	// Define the show times (in hours)
	showTimes := []int{11, 14, 18, 21} // 11 AM, 2 PM, 6 PM, 9 PM

	// Get today's date and add shows for the next 3 days
	startDate := time.Now().Truncate(24 * time.Hour) // Midnight today
	numDays := 4                                     // Today + next 3 days

	var shows []entityModels.Show

	// Loop through each date, movie ID, theatre ID, and show time
	for day := 0; day < numDays; day++ {
		date := startDate.AddDate(0, 0, day)

		for _, movieID := range movieIDs {
			for _, theatreID := range theatreIDs {
				for _, showHour := range showTimes {
					showTime := time.Date(date.Year(), date.Month(), date.Day(), showHour, 0, 0, 0, date.Location())

					show := entityModels.Show{
						StartTime: showTime,
						Date:      date,
						MovieID:   movieID,
						TheatreID: theatreID,
					}

					shows = append(shows, show)
				}
			}
		}
	}

	err := repo.CreateShows(db, shows)
	if err != nil {
		log.Printf("Error creating show %v", err)
		return err
	}
	return nil
}

func GetMovieByID(db *gorm.DB, movieDetailPayload requestResponseModels.MovieDetailByIdPayload) (*requestResponseModels.MovieDetailPayload, error) {
	var movie entityModels.Movie

	// Construct the filter string based on the ID in the payload
	filterID := movieDetailPayload.ID

	// Pass the filterID to the repository function
	movie, err := repo.GetMovieByID(db, filterID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, gorm.ErrRecordNotFound
		}
		log.Printf("Error retrieving movie: %v", err)
		return nil, err
	}

	// Map the movie entity to the payload
	responseMovie, err := datamapper.MapMovieByIDToPayload(movie)
	if err != nil {
		log.Printf("Error mapping movie ID %d: %v", movie.ID, err)
		return nil, err
	}

	return responseMovie, nil
}

func CreateBooking(db *gorm.DB, bookingRequest requestResponseModels.BookingRequest) (int, error) {
	filterString := fmt.Sprintf("id = %d", bookingRequest.ShowID)
	show, _ := repo.GetShows(db, filterString)
	movie, err := repo.GetMovieByID(db, show.MovieID)

	if err != nil {
		log.Printf("Error retrieving show: %v", err)
		return 0, err
	}

	rand.Seed(uint64(time.Now().UnixNano()))

	ticketNumber := fmt.Sprintf("%010d", rand.Intn(10000000000))

	bookingEntity := datamapper.MapRequestToBookingEntity(bookingRequest, ticketNumber, movie, show)

	// seats := make([]int, len(bookingRequest.Seats))
	// for i, s := range bookingRequest.Seats {
	// 	seats[i], err = strconv.Atoi(s)
	// 	if err != nil {
	// 		log.Printf("Error converting seat %s to int: %v", s, err)
	// 		return 0, err
	// 	}
	// }

	avalibility, err := repo.CheckSeatsAvailability(db, bookingRequest.ShowID, bookingRequest.Seats)
	if err != nil {
		log.Printf("Error checking seat availability: %v", err)
		return 0, err
	}
	if !avalibility {
		log.Println("One or more requested seats are already booked.")
		return 0, errors.New("one or more requested seats are already booked")
	}

	tx := db.Begin()
	if tx.Error != nil {
		return 0, tx.Error
	}

	bookingID, err := repo.CreateBooking(tx, bookingEntity)
	if err != nil {
		log.Printf("Error creating booking: %v", err)
		tx.Rollback()
		return 0, err
	}

	err = repo.UpdateBookedSeatsForShow(tx, bookingRequest.ShowID, bookingRequest.Seats)
	if err != nil {
		log.Printf("Error updating seats: %v", err)
		tx.Rollback()
		return 0, err
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return 0, err
	}

	return bookingID, nil
}

func GetAllBookings(db *gorm.DB) ([]requestResponseModels.BookingResponse, error) {
    var bookings []entityModels.Booking
    bookings, err := repo.GetAllBookings(db)
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            log.Println("No bookings found")
            return []requestResponseModels.BookingResponse{}, nil
        }
        log.Printf("Error retrieving bookings: %v", err)
        return nil, err
    }

    if len(bookings) == 0 {
        log.Println("No bookings found")
        return []requestResponseModels.BookingResponse{}, nil
    }

    var response []requestResponseModels.BookingResponse
    for _, booking := range bookings {
        responseBooking, err := datamapper.MapBookingEntityToResponse(booking)
        if err != nil {
            log.Printf("Error mapping booking ID %d: %v", booking.ID, err)
            continue
        }
        response = append(response, *responseBooking)
    }
    return response, nil
}
func GetBookingById(db *gorm.DB, bookingDetailPayload requestResponseModels.BookingDetailByIdPayload) (*requestResponseModels.BookingResponse, error) {
	var booking entityModels.Booking

	// Construct the filter string based on the ID in the payload
	filterString := "id = " + strconv.Itoa(bookingDetailPayload.ID)

	// Pass the filterString to the repository function
	booking, err := repo.GetBookingById(db, filterString)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, gorm.ErrRecordNotFound
		}
		log.Printf("Error retrieving booking: %v", err)
		return nil, err
	}

	// Map the booking entity to the response payload
	responseBooking, err := datamapper.MapBookingEntityToResponse(booking)
	if err != nil {
		log.Printf("Error mapping booking ID %d: %v", booking.ID, err)
		return nil, err
	}

	return responseBooking, nil
}

func GetShowsByMovieID(db *gorm.DB, movieId int) ([]requestResponseModels.ShowDetailByIDPayload, error) {
	var shows []entityModels.Show

	// Construct the filter string based on the ID in the payload
	filterString := "movie_id = " + strconv.Itoa(movieId)

	// Pass the filterString to the repository function
	shows, err := repo.GetAllShows(db, filterString)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, gorm.ErrRecordNotFound
		}
		log.Printf("Error retrieving shows: %v", err)
		return nil, err
	}
	// for loop -> array of show ids -> seats table -> get all booked seats for each show
	var response []requestResponseModels.ShowDetailByIDPayload
	for _, show := range shows {
		filterStringTheatre := "id = " + strconv.Itoa(show.TheatreID)
		theatre, err := repo.GetTheatres(db, filterStringTheatre)
		if err != nil {
			log.Printf("Error retrieving theatre: %v", err)
			continue
		}

		responseShow := requestResponseModels.ShowDetailByIDPayload{
			ID:          show.ID,
			StartTime:   show.StartTime,
			Date:        show.Date,
			TheatreID:   show.TheatreID,
			TheatreName: theatre.Name,
		}
		response = append(response, responseShow)
	}
	return response, nil
}

func GetBookedSeatsForShow(db *gorm.DB, showID int) ([]string, error) {
    filter := fmt.Sprintf("id = %d", showID)
    show, err := repo.GetShows(db, filter)
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, gorm.ErrRecordNotFound
        }
        log.Printf("Error retrieving show: %v", err)
        return nil, err
    }

    seatsJSON := strings.TrimSpace(show.BookedSeats)
    if seatsJSON == "" || seatsJSON == "null" || seatsJSON == "[]" {
        return []string{}, nil
    }

    var seats []string
    if err := json.Unmarshal([]byte(seatsJSON), &seats); err != nil {
        log.Printf("Error unmarshalling booked_seats for show %d: %v", showID, err)
        return nil, err
    }

    return seats, nil
}
