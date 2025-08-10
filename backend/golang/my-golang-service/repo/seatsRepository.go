package repo

import (
	"errors"
	"fmt"
	entityModel "my-golang-service/models/entityModels"

	"gorm.io/gorm"
)

type ISeats interface {
	CreateSeats(tx *gorm.DB, Seats entityModel.Show) (int, error)
	GetSeats(tx *gorm.DB, filters string) (Seats entityModel.Show, err error)
	GetAllSeats(tx *gorm.DB, filter string) (Seats []entityModel.Show, err error)
	UpdateBookedSeats(tx *gorm.DB, showID int) error
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
func UpdateBookedSeats(tx *gorm.DB, showID int, seats []string) error {
	result := tx.Debug().Model(&entityModel.Seat{}).Where("show_id = ? AND seat_number IN ?", showID, seats).Update("occupied", true)
	if result.Error != nil {
		return errors.New("some error in updating seats at repository level")
	}
	return nil
}

func CheckSeatsAvailability(db *gorm.DB, showID int, seats []int) (bool, error) {
	var count int64
	err := db.Table("booked_seats").Where("show_id = ? AND seat_number IN ?", showID, seats).Count(&count).Error
	if err != nil {
		return false, err
	}
	return count == 0, nil
}