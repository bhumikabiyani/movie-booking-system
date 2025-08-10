package repo

import (
	"errors"
	"fmt"
	entityModel "my-golang-service/models/entityModels"

	"gorm.io/gorm"
)

type IShows interface {
	CreateShows(tx *gorm.DB, Shows entityModel.Show) (int, error)
	GetShows(tx *gorm.DB, filters string) (Shows entityModel.Show, err error)
	UpdateShows(tx *gorm.DB, Shows entityModel.Show) error
	GetAllShows(tx *gorm.DB, filters string) (Showss []entityModel.Show, err error)
}

func CreateShows(tx *gorm.DB, shows []entityModel.Show) error {
	// Start a database transaction
	err := tx.Transaction(func(tx *gorm.DB) error {
		for _, show := range shows {
			result := tx.Debug().Create(&show)
			if result.Error != nil {
				return errors.New("some error in creating shows at repository level")
			}
			fmt.Printf("Completed repo level operations to create show, show_id: %d\n", show.ID)
		}
		return nil
	})

	return err
}

func GetShows(tx *gorm.DB, filters string) (shows entityModel.Show, err error) {
	result := tx.Where(filters).Last(&shows)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return shows, gorm.ErrRecordNotFound
		}
		return shows, errors.New("some error in get shows at repository level")
	}
	return shows, nil
}

func UpdateShows(tx *gorm.DB, shows entityModel.Show) error {
	err := tx.Updates(&shows).Error
	if err != nil {
		return errors.New("some error in update shows at repository level")
	}
	return nil
}

func GetAllShows(tx *gorm.DB, filter string) (shows []entityModel.Show, err error) {
	// logger := providers.CreateLoggerFromContext(ctx, e.RequestLogger)
	// logger.Info("starting repo level operations to get all showss")
	result := tx.Debug().Where(filter).Find(&shows)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			// logger.Warn("no record found in getAllshowss")
			return shows, gorm.ErrRecordNotFound
		}
		// logger.WithField(base.LogError, result.Error).Error("error in get all shows")
		return shows, errors.New("some error in get all shows at repository level")
	}
	return shows, nil
}
