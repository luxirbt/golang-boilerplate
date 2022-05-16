package application

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/dto"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/repository"
)

type UserAppIer interface {
	GetAll() ([]entity.User, error)
	GetAllLight(applicationName string) ([]entity.UserLight, error)
	GetAllPermissions() ([]entity.UserPermission, error)
	Save(*entity.User) (int64, error)
	Update(user *dto.UpdateUserDTO, idUser int) error
	GetApplications(idUser int) ([]entity.UserPermissionLight, error)
	GetOneUserPermission(userId int) ([]entity.UserPermission, error)
	UpdatePassword(user *entity.User, idUser int) error
	GetUser(idUser int) (*entity.User, error)
}

type UserApp struct {
	db repository.UserRepository
}

func NewUserApp(db repository.UserRepository) *UserApp {
	return &UserApp{db}
}

func (app *UserApp) GetAll() ([]entity.User, error) {
	return app.db.GetAll()
}

func (app *UserApp) GetAllLight(applicationName string) ([]entity.UserLight, error) {
	return app.db.GetAllLight(applicationName)
}

func (app *UserApp) GetUser(idUser int) (*entity.User, error) {
	return app.db.GetUser(idUser)
}

func (app *UserApp) Save(user *entity.User) (int64, error) {
	return app.db.Save(user)
}

func (app *UserApp) Update(user *dto.UpdateUserDTO, idUser int) error {
	return app.db.Update(user, idUser)
}

func (app *UserApp) UpdatePassword(user *entity.User, idUser int) error {
	return app.db.UpdatePassword(user, idUser)
}

func (app *UserApp) GetAllPermissions() ([]entity.UserPermission, error) {
	return app.db.GetAllPermissions()
}

func (app *UserApp) GetOneUserPermission(userId int) ([]entity.UserPermission, error) {
	return app.db.GetOneUserPermission(userId)
}

func (app *UserApp) GetApplications(idUser int) ([]entity.UserPermissionLight, error) {
	return app.db.GetApplications(idUser)
}
