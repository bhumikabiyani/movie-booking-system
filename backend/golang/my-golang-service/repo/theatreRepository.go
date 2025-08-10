package repo

import (
	"errors"
	"fmt"
	entityModel "my-golang-service/models/entityModels"

	"gorm.io/gorm"
)

type ITheatres interface {
	CreateTheatres(tx *gorm.DB, Theatres entityModel.Theatre) (int, error)
	GetTheatres(tx *gorm.DB, filters string) (Theatres entityModel.Theatre, err error)
	UpdateTheatres(tx *gorm.DB, Theatres entityModel.Theatre) error
	GetAllTheatress(tx *gorm.DB, filters string) (Theatres []entityModel.Theatre, err error)
}

func CreateTheatres(tx *gorm.DB, Theatres entityModel.Theatre) (int, error) {
	result := tx.Debug().Create(&Theatres)
	if result.Error != nil {
		return 0, errors.New("some error in create Theatres at repository level")
	}
	fmt.Printf("completed repo level operations to create Theatres, Theatres_id: %d\n", Theatres.ID)
	return int(Theatres.ID), nil
}

func GetTheatres(tx *gorm.DB, filters string) (Theatres entityModel.Theatre, err error) {
	result := tx.Debug().Table("theatre").Where(filters).Find(&Theatres)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return Theatres, gorm.ErrRecordNotFound
		}
		return Theatres, errors.New("some error in get Theatres at repository level")
	}
	return Theatres, nil
}

func UpdateTheatres(tx *gorm.DB, Theatres entityModel.Theatre) error {
	err := tx.Updates(&Theatres).Error
	if err != nil {
		return errors.New("some error in update Theatres at repository level")
	}
	return nil
}

func GetAllTheatres(tx *gorm.DB, filters string) ([]entityModel.Theatre, error) {
	var theatres []entityModel.Theatre
	result := tx.Debug().Table("theatre").Where(filters).Find(&theatres)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return theatres, gorm.ErrRecordNotFound
		}
		return theatres, errors.New("some error in get all theatres at repository level")
	}
	return theatres, nil
}
