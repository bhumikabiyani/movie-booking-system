package entitymodels

import (
	"time"
)

type Movie struct {
	ID        uint       `json:"id" gorm:"primaryKey"`
	Name      string     `json:"name"`
	Info      []byte      `json:"info" gorm:"type:jsonb;default:'{}'::jsonb"`
	CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt *time.Time `json:"deleted_at" gorm:"index"`
}
