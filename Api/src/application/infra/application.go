package infra

import (
	"fmt"

	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/entity"
	"gorm.io/gorm"
)

type ApplicationRepositoryImpl struct {
	Conn *gorm.DB
}

func NewApplicationRepository(conn *gorm.DB) *ApplicationRepositoryImpl {
	return &ApplicationRepositoryImpl{Conn: conn}
}

func (r *ApplicationRepositoryImpl) GetAll() ([]entity.Application, error) {

	var applications []entity.Application

	err := r.Conn.Table("application").Select(("id, appname, url, displayname, webapp")).Scan(&applications).Error
	if err != nil {
		return nil, err
	}

	return applications, nil
}

func (r *ApplicationRepositoryImpl) Get(id int) (*entity.Application, error) {
	var application entity.Application

	err := r.Conn.Table("application").Where("id = ?", id).Find(&application).Error

	if err != nil {
		return nil, err
	}
	return &application, nil
}

func (r *ApplicationRepositoryImpl) Save(application *entity.Application) (int64, error) {
	db, err := r.Conn.DB()

	if err != nil {
		return 0, err
	}
	res, err := db.Exec(fmt.Sprintf("insert into application (appname, url, displayname, webapp) values ('%s', '%s', '%s', %v)", application.Appname, application.Url, application.Displayname, application.Webapp))

	if err != nil {
		return 0, err
	}

	lid, err := res.LastInsertId()

	if err != nil {
		return 0, err
	}

	return lid, nil
}

func (r *ApplicationRepositoryImpl) Update(application *entity.Application, idApplication int) error {
	return r.Conn.Exec(fmt.Sprintf("UPDATE application SET appname = '%s' where id ='%d'", application.Appname, idApplication)).Error
}

func (r *ApplicationRepositoryImpl) UpdateSvg(id int, svg string, typeSvg string) error {
	if typeSvg == "svg_light" {
		return r.Conn.Exec(fmt.Sprintf("UPDATE svg SET svg_light = '%s' where id = %d", svg, id)).Error

	} else {
		return r.Conn.Exec(fmt.Sprintf("UPDATE svg SET svg_dark = '%s' where id = %d", svg, id)).Error
	}
}

func (r *ApplicationRepositoryImpl) SaveSvg(svg *entity.Svg) error {
	return r.Conn.Table("svg").Save(svg).Error
}
