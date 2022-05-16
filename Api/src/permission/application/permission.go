package application

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/repository"
)

type PermissionAppIer interface {
	Get(id int) (*entity.Permission, error)
	Save(*entity.Permission) error
	Update(permission *entity.Permission, id int) error
	Delete(id int) error
}

type PermissionApp struct {
	db repository.PermissionRepository
}

func NewPermissionApp(db repository.PermissionRepository) *PermissionApp {
	return &PermissionApp{db}
}

func (app *PermissionApp) Get(id int) (*entity.Permission, error) {
	return app.db.Get(id)
}

func (app *PermissionApp) Save(permission *entity.Permission) error {
	return app.db.Save(permission)
}

func (app *PermissionApp) Update(permission *entity.Permission, id int) error {
	return app.db.Update(permission, id)
}

func (app *PermissionApp) Delete(id int) error {
	return app.db.Delete(id)
}
