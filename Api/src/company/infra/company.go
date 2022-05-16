package infra

import (
	"fmt"

	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/domain/entity"
	"gorm.io/gorm"
)

type CompanyRepositoryImpl struct {
	Conn *gorm.DB
}

func NewCompanyRepository(conn *gorm.DB) *CompanyRepositoryImpl {
	return &CompanyRepositoryImpl{Conn: conn}
}

func (r *CompanyRepositoryImpl) GetAll() ([]entity.Company, error) {

	var companys []entity.Company

	err := r.Conn.Table("company").Select(("id, name")).Scan(&companys).Error
	if err != nil {
		return nil, err
	}

	return companys, nil
}

func (r *CompanyRepositoryImpl) Save(company *entity.Company) error {
	err := r.Conn.Exec(fmt.Sprintf("insert into company (name) values ('%s')", company.Name)).Error

	if err != nil {
		return err
	}

	return nil
}
