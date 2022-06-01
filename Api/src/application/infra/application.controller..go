package infra

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/respond"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/application"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/entity"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/repository"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/domain/services"
)

type ApplicationHandler struct {
	applicationApp application.ApplicationAppIer
}

func NewApplicationHandler(app repository.ApplicationRepository) *ApplicationHandler {
	return &ApplicationHandler{applicationApp: app}
}

func (h *ApplicationHandler) GetAll(c *fiber.Ctx) error {
	applications, err := h.applicationApp.GetAll()

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}
	return respond.JSON(c, fiber.StatusOK, applications)
}

func (h *ApplicationHandler) Get(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return respond.Error(c, fiber.StatusBadRequest, err, err.Error())
	}

	application, err := h.applicationApp.Get(id)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusOK, application)
}

func (h *ApplicationHandler) Save(c *fiber.Ctx) error {
	var app entity.Application
	app.Appname = c.FormValue("appname")
	app.Displayname = c.FormValue("displayname")
	app.Webapp, _ = strconv.ParseBool(c.FormValue("webapp"))
	app.Url = c.FormValue("url")

	res, err := h.applicationApp.Save(&app)

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	dirFileLight, err := services.Upload(c, "filelight")

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	dirFileDark, err := services.Upload(c, "filedark")

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	var svg entity.Svg

	svg.Svg_light = dirFileLight
	svg.Svg_dark = dirFileDark
	svg.Id_application = int(res)

	err = h.applicationApp.SaveSvg(&svg)

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	return respond.JSON(c, fiber.StatusCreated, app)
}

func (h *ApplicationHandler) Update(c *fiber.Ctx) error {

	var app entity.Application

	app.Appname = c.FormValue("appname")
	app.Displayname = c.FormValue("displayname")
	app.Webapp, _ = strconv.ParseBool(c.FormValue("webapp"))
	app.Url = c.FormValue("url")

	idApplication, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return respond.Error(c, fiber.StatusBadRequest, err, err.Error())
	}

	err = h.applicationApp.Update(&app, idApplication)

	if err != nil {
		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
	}

	app.Id = idApplication
	filelight, err := c.FormFile("filelight")

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	filedark, err := c.FormFile("filedark")

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	var svg entity.Svg

	if filelight.Filename != "" {

		dirFileLight, err := services.Upload(c, "filelight")

		if err != nil {
			return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
		}
		svg.Svg_light = dirFileLight

	}

	if filedark.Filename != "" {

		dirFileDark, err := services.Upload(c, "filelight")

		if err != nil {
			return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
		}
		svg.Svg_dark = dirFileDark

	}

	svg.Id_application = int(idApplication)

	err = h.applicationApp.UpdateSvg(&svg, idApplication)

	if err != nil {
		return respond.Error(c, fiber.StatusInternalServerError, err, err.Error())
	}

	svg.Id_application = idApplication

	return respond.JSON(c, fiber.StatusOK, app)
}
