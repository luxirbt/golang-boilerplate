package repository

import "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/domain/entity"

type CompanyRepository interface {
	GetAll() ([]entity.Company, error)
	Save(*entity.Company) error
}
