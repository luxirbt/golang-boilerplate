package repository

import "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/entity"

type ApplicationRepository interface {
	GetAll() ([]entity.Application, error)
	Get(id int) (*entity.Application, error)
	Save(*entity.Application) (int64, error)
	Update(application *entity.Application, idApplication int) error
	SaveSvg(*entity.Svg) error
}
