package router

// import (
// 	"strconv"
// 	"time"

// 	"github.com/gofiber/fiber/v2"
// 	"github.com/golang-jwt/jwt"
// 	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/respond"
// 	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/entity"
// 	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/infra"
// )

const SecretKey = "secret"

// func SendEmail(c *fiber.Ctx) error {
// 	var user entity.User
// 	ID, err := strconv.Atoi(c.Params("id"))
// 	if err != nil {
// 		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
// 	}

// 	infra.SendEmail(ID)

// 	if err != nil {
// 		return respond.Error(c, fiber.StatusNotFound, err, err.Error())
// 	}

// 	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
// 		Issuer:    strconv.Itoa(int(user.ID)),
// 		ExpiresAt: time.Now().Add(time.Minute * 30).Unix(), //1 day
// 	})

// 	token, err := claims.SignedString([]byte(SecretKey))

// 	if err != nil {
// 		c.Status(fiber.StatusInternalServerError)
// 		return c.JSON(fiber.Map{
// 			"message": "could not login",
// 		})
// 	}

// 	cookie := fiber.Cookie{
// 		Name:     "jwt",
// 		Value:    token,
// 		Expires:  time.Now().Add(time.Minute * 30),
// 		HTTPOnly: true,
// 	}

// 	c.Cookie(&cookie)

// 	return c.JSON(fiber.Map{
// 		"message": "success",
// 	})

// }
