package repository

import "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/domain/entity"

type RoleRepository interface {
	GetAll() ([]entity.Role, error)
}
