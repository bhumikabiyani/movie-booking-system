package entitymodels

import (
    "time"
)

type Seat struct {
    ID        int       `json:"id" gorm:"primaryKey"`
    SeatNumber string      `json:"seat_number"`
    ShowID    int       `json:"show_id"`
    Occupied  bool      `json:"occupied"`
    CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
    UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
    DeletedAt *time.Time `json:"deleted_at" gorm:"index"`
}
