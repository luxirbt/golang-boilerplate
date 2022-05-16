package router

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/respond"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/application"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/domain/repository"
)

type RoleHandler struct {
	RoleApp application.RoleAppIer
}

func NewRoleHandler(app repository.RoleRepository) *RoleHandler {
	return &RoleHandler{RoleApp: app}
}

func (h *RoleHandler) GetAll(c *fiber.Ctx) error {
	roles, err := h.RoleApp.GetAll()

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, roles)
}
