package application

import (
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/repository"
)

type ApplicationAppIer interface {
	GetAll() ([]entity.Application, error)
	Get(id int) (*entity.Application, error)
	Save(*entity.Application) (int64, error)
	Update(application *entity.Application, idApplication int) error
	SaveSvg(*entity.Svg) error
}

type ApplicationApp struct {
	db repository.ApplicationRepository
}

func NewApplicationApp(db repository.ApplicationRepository) *ApplicationApp {
	return &ApplicationApp{db}
}

func (app *ApplicationApp) GetAll() ([]entity.Application, error) {
	return app.db.GetAll()
}

func (app *ApplicationApp) Get(id int) (*entity.Application, error) {
	return app.db.Get(id)
}

func (app *ApplicationApp) Save(application *entity.Application) (int64, error) {
	return app.db.Save(application)
}

func (app *ApplicationApp) Update(application *entity.Application, idApplication int) error {
	return app.db.Update(application, idApplication)
}

func (app *ApplicationApp) SaveSvg(svg *entity.Svg) error {
	return app.db.SaveSvg(svg)
}
