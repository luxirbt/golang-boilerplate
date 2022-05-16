package infra

import (
	"fmt"

	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/entity"
	"gorm.io/gorm"
)

type PermissionRepositoryImpl struct {
	Conn *gorm.DB
}

func NewPermissionRepository(conn *gorm.DB) *PermissionRepositoryImpl {
	return &PermissionRepositoryImpl{Conn: conn}
}

func (r *PermissionRepositoryImpl) Get(id int) (*entity.Permission, error) {
	var permission entity.Permission

	err := r.Conn.Table("permission").Where("id = ?", id).Find(&permission).Error

	if err != nil {
		return nil, err
	}

	return &permission, nil
}

func (r *PermissionRepositoryImpl) Save(permission *entity.Permission) error {
	err := r.Conn.Exec(fmt.Sprintf("insert into permission (id_user, id_app, id_role) values ('%d', '%d', '%d')", permission.UserId, permission.AppId, permission.RoleId)).Error

	if err != nil {
		return err
	}

	return nil
}

func (r *PermissionRepositoryImpl) Update(permission *entity.Permission, id int) error {
	err := r.Conn.Exec(fmt.Sprintf("UPDATE permission SET id_app = '%d', id_role = '%d' where id ='%d'", permission.AppId, permission.RoleId, id)).Error

	if err != nil {
		return err
	}

	return nil
}

func (r *PermissionRepositoryImpl) Delete(id int) error {
	err := r.Conn.Table("permission").Delete(&entity.Permission{}, id).Error

	if err != nil {
		return err
	}

	return nil
}
