package server

import (
	"os"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"

	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/config"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/router"
	applicationApplication "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/application"
	companyApplication "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/company/application"
	permissionApplication "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/permission/application"
	RoleApplication "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/role/application"

	infraApplication "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/application/infra"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/application"
	infraUser "gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/infra"
)

// Run start server
func Run() error {
	server := Routes()

	return server.Listen(":" + os.Getenv("SERVER_PORT"))
}

// Routes returns the initialized router
func Routes() *fiber.App {
	r := fiber.New()

	conn, _ := config.ConnectDB()

	userApp := application.NewUserApp(conn.UserRepository)
	userHandler := infraUser.NewUserHandler(userApp)

	permissionApp := permissionApplication.NewPermissionApp(conn.PermissionRepository)
	permissionHandler := router.NewPermissionHandler(permissionApp)

	applicationApp := applicationApplication.NewApplicationApp(conn.ApplicationRepository)
	applicationHandler := infraApplication.NewApplicationHandler(applicationApp)

	companyApp := companyApplication.NewCompanyApp(conn.CompanyRepository)
	companyHandler := router.NewCompanyHandler(companyApp)

	RoleApp := RoleApplication.NewRoleApp(conn.RoleRepository)
	RoleHandler := router.NewRoleHandler(RoleApp)

	r.Patch("/user/password/:id", userHandler.UpdatePwd)
	r.Post("/invalidUrl", userHandler.InvalidUrl)

	r.Use(jwtware.New(jwtware.Config{
		SigningMethod: "HS256",
		SigningKey:    []byte(os.Getenv("JWT_SECRET")),
	}))

	r.Post("/user", userHandler.SaveUser)
	r.Patch("/user/:id", userHandler.UpdateUser)
	r.Get("/users", userHandler.GetAllUsers)
	r.Get("/user/:id", userHandler.GetUser)

	r.Get("/applications", applicationHandler.GetAll)
	r.Get("/application/:id", applicationHandler.Get)
	r.Post("/application", applicationHandler.Save)
	r.Put("/application/:id", applicationHandler.Update)

	r.Get("/roles", RoleHandler.GetAll)

	r.Get("/companys", companyHandler.GetAll)
	r.Post("/company", companyHandler.Save)

	r.Get("/permission/:id", permissionHandler.GetPermissionById)
	r.Post("/permission", permissionHandler.Save)
	r.Patch("/permission/:id", permissionHandler.Update)
	r.Delete("/permission/:id", permissionHandler.Delete)

	r.Get("/permissions", userHandler.GetAllPermissions)
	r.Get("/permissions/:id", userHandler.GetPermissionByUserId)

	return r
}
