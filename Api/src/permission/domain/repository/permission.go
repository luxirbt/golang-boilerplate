package repository

import "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/entity"

type PermissionRepository interface {
	Get(id int) (*entity.Permission, error)
	Save(*entity.Permission) error
	Update(permission *entity.Permission, id int) error
	Delete(id int) error
}
