package entitymodels

import (
    "time"
)

type Show struct {
    ID        int       `json:"id" gorm:"primaryKey"`
    StartTime time.Time `json:"start_time"`
    Date      time.Time `json:"date"`
    MovieID   int       `json:"movie_id"`
    TheatreID int       `json:"theatre_id"`
    CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
    UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
    DeletedAt *time.Time `json:"deleted_at" gorm:"index"`
    BookedSeats string `gorm:"column:booked_seats;type:text" json:"booked_seats"`
}
