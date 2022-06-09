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

func (r *PermissionRepositoryImpl) GetAll() ([]entity.Permission, error) {

	var users []entity.Permission

	err := r.Conn.Table("user").
		Select("user.id as UserId, permission.id, user.username, application.id as AppId, application.appname as AppName, application.displayname as DisplayName, role.denomination as Role, role.id as RoleId").
		Joins("INNER JOIN permission on permission.id_user=user.id").
		Joins("INNER JOIN application on application.id=permission.id_app").
		Joins("INNER JOIN role on role.id=permission.id_role").
		Scan(&users).Error
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *PermissionRepositoryImpl) Get(id int) (*entity.Permission, error) {
	var permission entity.Permission

	err := r.Conn.Table("permission").Where("id = ?", id).Find(&permission).Error

	if err != nil {
		return nil, err
	}

	return &permission, nil
}

func (r *PermissionRepositoryImpl) Save(permission *entity.AddPermissionDTO) error {
	err := r.Conn.Exec(fmt.Sprintf("insert into permission (id_user, id_app, id_role) values ('%d', '%d', '%d')", permission.UserId, permission.AppId, permission.RoleId)).Error

	if err != nil {
		return err
	}

	return nil
}

func (r *PermissionRepositoryImpl) Update(permission *entity.UpdatePermissionDTO, id int) error {
	err := r.Conn.Exec(fmt.Sprintf("UPDATE permission SET id_app = '%d', id_role = '%d' where id ='%d'", permission.AppId, permission.RoleId, id)).Error

	if err != nil {
		return err
	}

	return nil
}

func (r *PermissionRepositoryImpl) Delete(id int) error {
	err := r.Conn.Table("permission").Delete(&entity.AddPermissionDTO{}, id).Error

	if err != nil {
		return err
	}

	return nil
}
