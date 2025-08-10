package entitymodels

import (
	"time"
)

type User struct {
	ID        uint       `json:"id" gorm:"primaryKey"`
	Username  string     `json:"username"`
	Email     string     `json:"email"`
	Phone     int        `json:"phone"`
	CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt *time.Time `json:"deleted_at" gorm:"index"`
}
