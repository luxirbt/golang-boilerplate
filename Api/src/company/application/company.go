package application

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/domain/repository"
)

type CompanyAppIer interface {
	GetAll() ([]entity.Company, error)
	Save(*entity.Company) error
}

type CompanyApp struct {
	db repository.CompanyRepository
}

func NewCompanyApp(db repository.CompanyRepository) *CompanyApp {
	return &CompanyApp{db}
}

func (app *CompanyApp) GetAll() ([]entity.Company, error) {
	return app.db.GetAll()
}

func (app *CompanyApp) Save(company *entity.Company) error {
	return app.db.Save(company)
}
