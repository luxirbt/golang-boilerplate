package application

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/repository"
)

type PermissionAppIer interface {
	GetAll() ([]entity.Permission, error)
	Get(id int) (*entity.Permission, error)
	Save(*entity.AddPermissionDTO) error
	Update(permission *entity.UpdatePermissionDTO, id int) error
	Delete(id int) error
}

type PermissionApp struct {
	db repository.PermissionRepository
}

func NewPermissionApp(db repository.PermissionRepository) *PermissionApp {
	return &PermissionApp{db}
}

func (app *PermissionApp) GetAll() ([]entity.Permission, error) {
	return app.db.GetAll()
}

func (app *PermissionApp) Get(id int) (*entity.Permission, error) {
	return app.db.Get(id)
}

func (app *PermissionApp) Save(permission *entity.AddPermissionDTO) error {
	return app.db.Save(permission)
}

func (app *PermissionApp) Update(permission *entity.UpdatePermissionDTO, id int) error {
	return app.db.Update(permission, id)
}

func (app *PermissionApp) Delete(id int) error {
	return app.db.Delete(id)
}
