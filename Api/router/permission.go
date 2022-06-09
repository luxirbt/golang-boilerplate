package router

import (
	"encoding/json"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/respond"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/application"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/domain/repository"
)

type PermissionHandler struct {
	permissionApp application.PermissionAppIer
}

func NewPermissionHandler(app repository.PermissionRepository) *PermissionHandler {
	return &PermissionHandler{permissionApp: app}
}

func (h *PermissionHandler) GetAllPermissions(c *fiber.Ctx) error {
	users, err := h.permissionApp.GetAll()

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, users)
}

func (h *PermissionHandler) GetPermissionById(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return respond.Error(c, fiber.StatusBadRequest, err, err.Error())
	}

	var permission *entity.Permission

	permission, err = h.permissionApp.Get(id)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusCreated, permission)
}

func (h *PermissionHandler) Save(c *fiber.Ctx) error {
	var permission entity.AddPermissionDTO

	if err := c.BodyParser(&permission); err != nil {
		return respond.Error(c, fiber.StatusBadRequest, err, err.Error())
	}

	err := h.permissionApp.Save(&permission)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusCreated, permission)
}

func (h *PermissionHandler) Update(c *fiber.Ctx) error {

	body := c.Body()

	var permission entity.UpdatePermissionDTO

	if err := json.Unmarshal(body, &permission); err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	err = h.permissionApp.Update(&permission, id)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusOK, permission)
}

func (h *PermissionHandler) Delete(c *fiber.Ctx) error {

	id, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	err = h.permissionApp.Delete(id)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusOK, nil)
}
