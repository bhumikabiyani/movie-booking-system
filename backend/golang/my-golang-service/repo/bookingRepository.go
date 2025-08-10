package repo

import (
	"errors"
	"fmt"
	entityModel "my-golang-service/models/entityModels"

	"gorm.io/gorm"
)

type IBooking interface {
	CreateBooking(tx *gorm.DB, bookings entityModel.Booking) error
	GetAllBookings(tx *gorm.DB) (Bookings []entityModel.Booking, err error)
	GetBookingById(tx *gorm.DB, filter string) (entityModel.Booking, error)
}

func CreateBooking(tx *gorm.DB, booking entityModel.Booking) (int, error) {
	result := tx.Debug().Create(&booking)
	if result.Error != nil {
		return 0, errors.New("some error in create Movies at repository level")
	}
	fmt.Printf("completed repo level operations to create Bookings, booking_id: %d\n", booking.ID)
	return int(booking.ID), nil

}

func GetAllBookings(tx *gorm.DB) (Bookings []entityModel.Booking, err error) {
	result := tx.Debug().Find(&Bookings)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return Bookings, gorm.ErrRecordNotFound
		}
		return Bookings, errors.New("some error in get all Bookings at repository level")
	}
	return Bookings, nil
}

func GetBookingById(tx *gorm.DB, filter string) (entityModel.Booking, error) {
    var booking entityModel.Booking
    result := tx.Where(filter).First(&booking)
    if result.Error != nil {
        if errors.Is(result.Error, gorm.ErrRecordNotFound) {
            return booking, gorm.ErrRecordNotFound
        }
        return booking, result.Error
    }
    return booking, nil
}

