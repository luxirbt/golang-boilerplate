package application

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/domain/repository"
)

type RoleAppIer interface {
	GetAll() ([]entity.Role, error)
}

type RoleApp struct {
	db repository.RoleRepository
}

func NewRoleApp(db repository.RoleRepository) *RoleApp {
	return &RoleApp{db}
}

func (app *RoleApp) GetAll() ([]entity.Role, error) {
	return app.db.GetAll()
}
