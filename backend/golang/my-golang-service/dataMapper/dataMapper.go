package datamapper

import (
	"encoding/json"
	"fmt"
	entityModel "my-golang-service/models/entityModels"
	requestResponseModels "my-golang-service/models/requestResponseModels"
)

func MapMovieToPayload(movie entityModel.Movie) (*requestResponseModels.MoviePayload, error) {
	// Unmarshal the Info field into the MovieInfo struct
	var info requestResponseModels.MovieInfo
	err := json.Unmarshal(movie.Info, &info)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal info field: %v", err)
	}

	// Extract the image URL from the nested structure
	var imageURL string
	for _, poster := range info.Images.Poster {
		imageURL = poster.Medium.FilmImage
		break 
	}

	// Create the MoviePayload
	payload := &requestResponseModels.MoviePayload{
		ID:          int(movie.ID),
		Name:        movie.Name,
		Language:    info.Language,
		ImageURL:    imageURL,
		Description: info.SynopsisLong,
	}

	return payload, nil
}

func MapMovieByIDToPayload(movie entityModel.Movie) (*requestResponseModels.MovieDetailPayload, error) {
	// Unmarshal the Info field into the MovieInfo struct
	var info requestResponseModels.MovieInfo
	err := json.Unmarshal(movie.Info, &info)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal info field: %v", err)
	}

	// Extract the image URL from the nested structure
	var imageURL string
	for _, poster := range info.Images.Poster {
		imageURL = poster.Medium.FilmImage
		break 
	}

	var rating string
	for _, ageRating := range info.AgeRating {
		rating = ageRating.Rating
		break 
	}

	var release_date string
	var year string
	for _, releaseDate := range info.ReleaseDates {
		release_date = releaseDate.ReleaseDate
		year = release_date[0:4]
		break 
	}

	// Create the MoviePayload
	payload := &requestResponseModels.MovieDetailPayload{
		ID:          int(movie.ID),
		Name:        movie.Name,
		Language:    info.Language,
		ImageURL:    imageURL,
		Rating:      rating,
		Duration:    info.Duration,
		Description: info.SynopsisLong,
		Genre:       info.Genre,
		Release_year: year , 

	}
	return payload, nil
}

func MapTheatreToPayload(Theatre entityModel.Theatre) (*requestResponseModels.TheatrePayload, error) {
	// Unmarshal the Info field into the TheatreInfo struct
	var info requestResponseModels.TheatreInfo
	err := json.Unmarshal(Theatre.Info, &info)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal info field: %v", err)
	}
	// Create the TheatrePayload and assign the URL as ImageURL
	payload := &requestResponseModels.TheatrePayload{
		ID:       int(Theatre.ID), 
		Name:     Theatre.Name,   
		ImageURL: info.URL,        
		Address:  info.Address,  
		City:     info.City,  
	}
	return payload, nil
}

func MapRequestToBookingEntity(request requestResponseModels.BookingRequest, ticketNo string, movie entityModel.Movie, show entityModel.Show) entityModel.Booking {
	// unmarshal movie ka info
	var movieInfo requestResponseModels.MovieInfo
	err := json.Unmarshal(movie.Info, &movieInfo)
	if err != nil {
		return entityModel.Booking{}
	}

	//movieInfo
	info := requestResponseModels.BookingInfo{
		MovieName:     movie.Name,
		Language:      movieInfo.Language,
		ImageURL:      movieInfo.Images.Poster["1"].Medium.FilmImage,
		Duration:      movieInfo.Duration,
		Rating:        movieInfo.AgeRating[0].Rating,
		ReleaseDate:   movieInfo.ReleaseDates[0].ReleaseDate,
		Genre:         movieInfo.Genre,
		ShowStartTime: show.StartTime,
		ShowDate:      show.Date,
		TheatreID:     show.TheatreID,
		Seats:         request.Seats,
	}

	// Marshal the BookingInfo to JSON
	infoJSON, err := json.Marshal(info)
	if err != nil {
		return entityModel.Booking{}
	}

	//marshal the info
	return entityModel.Booking{
		ShowID:           request.ShowID,
		TotalSeatsBooked: len(request.Seats),
		TicketNo:         ticketNo,
		Info:             infoJSON,
	}
}

func MapBookingEntityToResponse(booking entityModel.Booking) (*requestResponseModels.BookingResponse, error) {
	// Unmarshal the Info field into the BookingInfo struct
	var info requestResponseModels.BookingInfo
	err := json.Unmarshal(booking.Info, &info)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal info field: %v", err)
	}

	// Create the BookingResponse
	response := &requestResponseModels.BookingResponse{
		BookingID:        int(booking.ID),
		ShowID:           booking.ShowID,
		TicketNo:         booking.TicketNo,
		TotalSeatsBooked: booking.TotalSeatsBooked,
		BookingInfo:      info,
	}
	return response, nil
}


