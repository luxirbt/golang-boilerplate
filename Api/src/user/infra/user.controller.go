package infra

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/respond"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/application"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/dto"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/repository"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/service"
)

type UserHandler struct {
	userApp application.UserAppIer
}

func NewUserHandler(app repository.UserRepository) *UserHandler {
	return &UserHandler{userApp: app}
}

func (h *UserHandler) GetAllPermissions(c *fiber.Ctx) error {
	users, err := h.userApp.GetAllPermissions()

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, users)
}

func (h *UserHandler) GetPermissionByUserId(c *fiber.Ctx) error {
	userId, _ := strconv.Atoi(c.Params("id"))

	permissions, err := h.userApp.GetOneUserPermission(userId)

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	var permissionDto []dto.UserPermissionDTO

	for _, data := range permissions {
		permissionDto = append(permissionDto, dto.UserPermissionDTO{
			AppId:       data.AppId,
			AppName:     data.AppName,
			Url:         data.Url,
			DisplayName: data.DisplayName,
			WebApp:      data.WebApp,
			SvgLight:    data.SvgLight,
			SvgDark:     data.SvgDark,
		})
	}

	if len(permissionDto) == 0 {
		return respond.Error(c, fiber.StatusNotFound, fmt.Errorf("No permissions found"), "No permissions found")
	}

	return respond.JSON(c, fiber.StatusOK, permissionDto)
}

func (h *UserHandler) GetApplications(c *fiber.Ctx) error {
	userId, _ := strconv.Atoi(c.Params("id"))
	users, err := h.userApp.GetApplications(userId)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, users)
}

func (h *UserHandler) GetAllUsers(c *fiber.Ctx) error {

	users, err := h.userApp.GetAll()

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, users)
}

func (h *UserHandler) SaveUser(c *fiber.Ctx) error {
	var user entity.User

	if err := c.BodyParser(&user); err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	id, err := h.userApp.Save(&user)

	if err != nil {
		return respond.Error(c, fiber.StatusUnprocessableEntity, err, err.Error())
	}

	resetPassword := entity.ResetPassword{Token: service.GenerateToken(id), IdUser: id}

	err = h.userApp.SaveRequestResetPassword(&resetPassword)

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	err = service.SendMail(&user, id)

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusCreated, id)
}

func (h *UserHandler) UpdateUser(c *fiber.Ctx) error {

	body := c.Body()

	var user dto.UpdateUserDTO

	if err := json.Unmarshal(body, &user); err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	idUser, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	err = h.userApp.Update(&user, idUser)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusOK, nil)
}

func (h *UserHandler) GetUsersLight(c *fiber.Ctx) error {
	applicationName := c.Params("application_name")

	users, err := h.userApp.GetAllLight(applicationName)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, users)
}

func (h *UserHandler) GetUser(c *fiber.Ctx) error {

	idUser, err := strconv.Atoi(c.Params("id"))

	users, err := h.userApp.GetUser(idUser)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, users)
}

func (h *UserHandler) UpdatePwd(c *fiber.Ctx) error {
	body := c.Body()

	var (
		user entity.User
	)

	if err := json.Unmarshal(body, &user); err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	idUser, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	err = h.userApp.UpdatePassword(&user, idUser)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusOK, nil)
}

func (h *UserHandler) CheckResetPassword(c *fiber.Ctx) error {
	idUser, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	resetPassword, err := h.userApp.GetResetPasswordToken(idUser)

	fmt.Println(resetPassword)

	if err := service.VerifyToken(resetPassword.Token); err != nil {
		if resetPassword.Token == "" {
			return respond.Error(c, fiber.StatusForbidden, err, err.Error())
		}
		return respond.Error(c, fiber.StatusUnauthorized, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusOK, nil)
}

func (h *UserHandler) DeleteResetPasswordToken(c *fiber.Ctx) error {
	idUser, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	err = h.userApp.DeleteResetPasswordToken(idUser)

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusOK, nil)
}
