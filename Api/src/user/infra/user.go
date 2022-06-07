package infra

import (
	"fmt"
	"os"

	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/dto"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/entity"
	"gorm.io/gorm"
)

type UserRepositoryImpl struct {
	Conn *gorm.DB
}

func NewUserRepository(conn *gorm.DB) *UserRepositoryImpl {
	return &UserRepositoryImpl{Conn: conn}
}

func (r *UserRepositoryImpl) GetAllPermissions() ([]entity.UserPermission, error) {

	var users []entity.UserPermission

	err := r.Conn.Table("user").
		Select("user.id as UserId, permission.id, user.username, application.id as AppId, application.appname as AppName, role.denomination as Role, role.id as RoleId").
		Joins("INNER JOIN permission on permission.id_user=user.id").
		Joins("INNER JOIN application on application.id=permission.id_app").
		Joins("INNER JOIN role on role.id=permission.id_role").
		Scan(&users).Error
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepositoryImpl) GetOneUserPermission(userId int) ([]entity.UserPermission, error) {

	var userPermission []entity.UserPermission

	if err := r.Conn.Table("user").
		Select("user.id as UserId, permission.id, user.username, application.id as AppId, application.appname as AppName, application.url, role.denomination as Role, role.id as RoleId, svg_light, svg_dark, displayname as DisplayName, webapp as WebApp").
		Joins("INNER JOIN permission on permission.id_user=user.id").
		Joins("INNER JOIN application on application.id=permission.id_app").
		Joins("INNER JOIN role on role.id=permission.id_role").
		Joins("LEFT JOIN svg on svg.id_application=application.id").
		Where("user.id = ?", userId).
		Scan(&userPermission).Error; err != nil {
		return nil, err
	}

	return userPermission, nil
}

func (r *UserRepositoryImpl) GetAll() ([]entity.User, error) {

	var users []entity.User

	err := r.Conn.Table("user").
		Select("user.id as id, user.username, user.firstname, user.lastname, user.email, user.is_active, user.id_company, company.name as company_name").
		Joins("LEFT JOIN company on company.id=user.id_company").
		Scan(&users).Error
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepositoryImpl) GetAllLight(applicationName string) ([]entity.UserLight, error) {
	var users []entity.UserLight

	err := r.Conn.Raw("SELECT distinct user.id, username from user, application, permission where application.appname=? AND application.id=permission.id_app AND user.id=permission.id_user", applicationName).Scan(&users).Error

	if err != nil {
		return nil, err
	}

	return users, nil

}

func (r *UserRepositoryImpl) Save(user *entity.User) (int64, error) {
	DB, err := r.Conn.DB()
	res, err := DB.Exec(fmt.Sprintf("insert into user (username, password, is_active, firstname, lastname, email, id_company) values ('%s', aes_encrypt('%s', '%s'), '%v', '%s', '%s', '%s', '%d')", user.Username, user.Password, os.Getenv("MYSQL_SECRET"), 0, user.Firstname, user.Lastname, user.Email, user.IdCompany))
	if err != nil {
		return 0, err
	}
	lid, err := res.LastInsertId()

	if err != nil {
		return 0, err
	}

	return lid, nil
}

func (r *UserRepositoryImpl) Update(user *dto.UpdateUserDTO, idUser int) error {
	return r.Conn.Exec("UPDATE user SET firstname = ?, lastname = ?, username = ?, email = ?, id_company = ?, is_active = ? where id =?", user.Firstname, user.Lastname, user.Username, user.Email, user.IdCompany, user.IsActive, idUser).Error
}

func (r *UserRepositoryImpl) GetApplications(idUser int) ([]entity.UserPermissionLight, error) {

	var users []entity.UserPermissionLight

	err := r.Conn.Raw("select appname as AppName, denomination as Role from user, application, role, permission where role.id = permission.id_role and application.id = permission.id_app and permission.id_user = user.id and user.id = ?", idUser).Scan(&users).Error
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepositoryImpl) UpdatePassword(user *entity.User, idUser int) error {

	err := r.Conn.Exec(fmt.Sprintf("UPDATE user SET password = aes_encrypt('%s', '%s'), is_active = 1 where id ='%d'", user.Password, os.Getenv("MYSQL_SECRET"), idUser)).Error

	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepositoryImpl) GetUser(idUser int) (*entity.User, error) {
	var user entity.User

	err := r.Conn.Table("user").
		Select(fmt.Sprintf("user.id as id, user.username, user.firstname, user.lastname, user.email, user.is_active, aes_decrypt(user.password,'%s') as password, user.id_company, company.name as CompanyName ", os.Getenv("MYSQL_SECRET"))).
		Joins("INNER JOIN company on company.id=user.id_company").
		Where("user.id = ?", idUser).
		Scan(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
