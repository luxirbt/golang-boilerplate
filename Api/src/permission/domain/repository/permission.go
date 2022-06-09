package repository

import "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/entity"

type PermissionRepository interface {
	GetAll() ([]entity.Permission, error)
	Get(id int) (*entity.Permission, error)
	Save(*entity.AddPermissionDTO) error
	Update(permission *entity.UpdatePermissionDTO, id int) error
	Delete(id int) error
}
