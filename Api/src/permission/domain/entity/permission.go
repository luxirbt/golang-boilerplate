package entity

type Permission struct {
	ID     int
	UserId int `gorm:"column:id_user" json:"id_user"`
	AppId  int `gorm:"column:id_app" json:"id_app"`
	RoleId int `gorm:"column:id_role" json:"id_role"`
}
