package repo

import (
	"encoding/json"
	"errors"
	"fmt"
	entityModel "my-golang-service/models/entityModels"

	"gorm.io/gorm"
)

type ISeats interface {
	CreateSeats(tx *gorm.DB, Seats entityModel.Show) (int, error)
	GetSeats(tx *gorm.DB, filters string) (Seats entityModel.Show, err error)
	GetAllSeats(tx *gorm.DB, filter string) (Seats []entityModel.Show, err error)
	UpdateBookedSeatsForShow(tx *gorm.DB, showID int) error
}

func CreateSeats(tx *gorm.DB, seats []entityModel.Seat) error {
	// Start a database transaction
	err := tx.Transaction(func(tx *gorm.DB) error {
		for _, seat := range seats {
			result := tx.Debug().Create(&seat)
			if result.Error != nil {
				return errors.New("some error in creating Seats at repository level")
			}
			fmt.Printf("Completed repo level operations to create show, show_id: %d\n", seat.ID)
		}
		return nil
	})

	return err
}

func GetSeats(tx *gorm.DB, filters string) (Seats entityModel.Show, err error) {
	result := tx.Where(filters).Last(&Seats)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return Seats, gorm.ErrRecordNotFound
		}
		return Seats, errors.New("some error in get Seats at repository level")
	}
	return Seats, nil
}

func GetAllSeats(tx *gorm.DB, filter string) (Seats []entityModel.Show, err error) {
	result := tx.Debug().Where(filter).Find(&Seats)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return Seats, gorm.ErrRecordNotFound
		}
		return Seats, errors.New("some error in get all Seats at repository level")
	}
	return Seats, nil
}

func GetBookedSeatsForShow(tx *gorm.DB, filterString string) ([]entityModel.Seat, error) {
	var seats []entityModel.Seat
	result := tx.Debug().Model(&entityModel.Seat{}).Where(filterString).Find(&seats)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return seats, gorm.ErrRecordNotFound
		}
		return seats, errors.New("some error in get booked seats at repository level")
	}
	return seats, nil
}

func UpdateBookedSeatsForShow(tx *gorm.DB, showID int, seats []string) error {
	var show entityModel.Show

	// Fetch existing booked seats
	if err := tx.First(&show, showID).Error; err != nil {
		return fmt.Errorf("failed to fetch show: %w", err)
	}

	// Unmarshal booked_seats JSON into slice
	var bookedSeats []string
	if err := json.Unmarshal([]byte(show.BookedSeats), &bookedSeats); err != nil {
		return fmt.Errorf("failed to unmarshal booked_seats from shows table: %w", err)
	}

	// Append new seats
	bookedSeats = append(bookedSeats, seats...)

	// Marshal back to JSON
	updatedSeats, err := json.Marshal(bookedSeats)
	if err != nil {
		return fmt.Errorf("failed to marshal updated seats: %w", err)
	}

	// Update the column
	if err := tx.Model(&entityModel.Show{}).Where("id = ?", showID).Update("booked_seats", string(updatedSeats)).Error; err != nil {
		return fmt.Errorf("failed to update booked_seats: %w", err)
	}

	return nil
}


func CheckSeatsAvailability(db *gorm.DB, showID int, seats []string) (bool, error) {
	var bookedSeatsStr string

	// Fetch the booked_seats column for the show
	err := db.Table("shows").Select("booked_seats").Where("id = ?", showID).Scan(&bookedSeatsStr).Error
	if err != nil {
		return false, err
	}

	// Parse the booked_seats JSON/text into a slice
	var bookedSeats []string
	if err := json.Unmarshal([]byte(bookedSeatsStr), &bookedSeats); err != nil {
		return false, err
	}

	// Convert bookedSeats slice to a map for quick lookup
	bookedMap := make(map[string]bool, len(bookedSeats))
	for _, s := range bookedSeats {
		bookedMap[s] = true
	}
	fmt.Printf("sujal %v\n", bookedMap)
	// Check if any requested seat is already booked
	for _, seat := range seats {
		if bookedMap[seat] {
			fmt.Printf("sujal 1 %v\n", seat)
			return false, nil // seat already booked
		}
	}

	return true, nil // all seats are available
}
