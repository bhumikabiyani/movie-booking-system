package repo

import (
	"errors"
	"fmt"
	entityModel "my-golang-service/models/entityModels"

	"gorm.io/gorm"
)

type IMovies interface {
	CreateMovies(tx *gorm.DB, movies entityModel.Movie) (int, error)
	GetMovies(tx *gorm.DB, filters string) (Movies entityModel.Movie, err error)
	UpdateMovies(tx *gorm.DB, Movies entityModel.Movie) error
	GetAllMoviess(tx *gorm.DB, filters string) (Movies []entityModel.Movie, err error)
}

func CreateMovies(tx *gorm.DB, Movies entityModel.Movie) (int, error) {
	result := tx.Debug().Create(&Movies)
	if result.Error != nil {
		return 0, errors.New("some error in create Movies at repository level")
	}
	fmt.Printf("completed repo level operations to create Movies, Movies_id: %d\n", Movies.ID)
	return int(Movies.ID), nil
}

func GetMovieByID(tx *gorm.DB, id int) (entityModel.Movie, error) {
    var movie entityModel.Movie
    result := tx.Where("id = ?", id).Last(&movie)
    if result.Error != nil {
        if errors.Is(result.Error, gorm.ErrRecordNotFound) {
            return movie, gorm.ErrRecordNotFound
        }
        return movie, errors.New("error retrieving movie at repository level")
    }
    return movie, nil
}

func UpdateMovies(tx *gorm.DB, Movies entityModel.Movie) error {
	err := tx.Updates(&Movies).Error
	if err != nil {
		return errors.New("some error in update Movies at repository level")
	}
	return nil
}

func GetAllMovies(tx *gorm.DB, filter string) (Movies []entityModel.Movie, err error) {
	result := tx.Debug().Where(filter).Find(&Movies)
	if result.Error != nil || result.RowsAffected == 0 {
		if result.RowsAffected == 0 {
			return Movies, gorm.ErrRecordNotFound
		}
		return Movies, errors.New("some error in get all Movies at repository level")
	}
	return Movies, nil
}
