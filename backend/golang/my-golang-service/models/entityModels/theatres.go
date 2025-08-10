package entitymodels

import (
    "time"
)

type Theatre struct {
    ID        int       `json:"id" gorm:"primaryKey"`
    Name      string    `json:"name"`
    Info      []byte     `json:"info" gorm:"type:jsonb;default:'{}'"`
    CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
    UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
    DeletedAt *time.Time `json:"deleted_at" gorm:"index"`
}
