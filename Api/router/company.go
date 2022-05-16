package router

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/respond"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/application"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/domain/repository"
)

type CompanyHandler struct {
	companyApp application.CompanyAppIer
}

func NewCompanyHandler(app repository.CompanyRepository) *CompanyHandler {
	return &CompanyHandler{companyApp: app}
}

func (h *CompanyHandler) GetAll(c *fiber.Ctx) error {
	companys, err := h.companyApp.GetAll()

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, companys)
}

func (h *CompanyHandler) Save(c *fiber.Ctx) error {

	var company entity.Company

	if err := c.BodyParser(&company); err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	err := h.companyApp.Save(&company)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusCreated, company)
}
