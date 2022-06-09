package entity

type AddPermissionDTO struct {
	ID     int
	UserId int `gorm:"column:id_user" json:"id_user"`
	AppId  int `gorm:"column:id_app" json:"id_app"`
	RoleId int `gorm:"column:id_role" json:"id_role"`
}

type UpdatePermissionDTO struct {
	AppId  int `gorm:"column:id_app" json:"id_app"`
	RoleId int `gorm:"column:id_role" json:"id_role"`
}

type Permission struct {
	ID          int
	UserId      int    `gorm:"column:id_user" json:"id_user"`
	AppId       int    `gorm:"column:id_app" json:"id_app"`
	RoleId      int    `gorm:"column:id_role" json:"id_role"`
	Username    string `json:"username"`
	AppName     string `json:"app_name"`
	DisplayName string `json:"display_name"`
	Role        string `json:"role"`
}
