package config

import (
	"fmt"
	"os"

	applicationRepo "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/repository"
	infraApplication "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/infra"
	companyRepo "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/domain/repository"

	infraCompany "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/infra"
	permissionRepo "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/repository"
	infraPermission "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/infra"
	roleRepo "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/domain/repository"
	infraRole "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/infra"

	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/repository"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/infra"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type ConnectRepositories struct {
	CompanyRepository     companyRepo.CompanyRepository
	ApplicationRepository applicationRepo.ApplicationRepository
	PermissionRepository  permissionRepo.PermissionRepository
	UserRepository        repository.UserRepository
	RoleRepository        roleRepo.RoleRepository

	DB *gorm.DB
}

func ConnectDB() (*ConnectRepositories, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", os.Getenv("USER_DB"), os.Getenv("PASSWORD_DB"), os.Getenv("HOST_DB"), os.Getenv("PORT_DB"), os.Getenv("DB_NAME"))
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})

	if err != nil {
		return nil, err
	}

	return &ConnectRepositories{
		CompanyRepository:     infraCompany.NewCompanyRepository(db),
		ApplicationRepository: infraApplication.NewApplicationRepository(db),
		PermissionRepository:  infraPermission.NewPermissionRepository(db),
		UserRepository:        infra.NewUserRepository(db),
		RoleRepository:        infraRole.NewRoleRepository(db),

		DB: db,
	}, nil
}
