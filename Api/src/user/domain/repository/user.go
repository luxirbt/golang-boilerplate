package repository

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/dto"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/entity"
)

type UserRepository interface {
	GetAll() ([]entity.User, error)
	GetAllLight(applicationName string) ([]entity.UserLight, error)
	GetAllPermissions() ([]entity.UserPermission, error)
	Save(*entity.User) (int64, error)
	Update(user *dto.UpdateUserDTO, idUser int) error
	GetApplications(idUser int) ([]entity.UserPermissionLight, error)
	GetOneUserPermission(userId int) ([]entity.UserPermission, error)
	UpdatePassword(user *entity.User, idUser int) error
	GetUser(idUser int) (*entity.User, error)
	SaveRequestResetPassword(*entity.ResetPassword) error
	GetResetPasswordToken(int) (*entity.ResetPassword, error)
	DeleteResetPasswordToken(idUser int) error
}
