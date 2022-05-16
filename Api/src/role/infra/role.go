package infra

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/domain/repository"
	"gorm.io/gorm"
)

type RoleRepositoryImpl struct {
	Conn *gorm.DB
}

func NewRoleRepository(conn *gorm.DB) repository.RoleRepository {
	return &RoleRepositoryImpl{Conn: conn}
}

func (r *RoleRepositoryImpl) GetAll() ([]entity.Role, error) {

	var roles []entity.Role

	err := r.Conn.Table("role").Find(&roles).Scan(&roles).Error
	if err != nil {
		return nil, err
	}

	return roles, nil
}
