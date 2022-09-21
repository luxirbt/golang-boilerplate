package src

import (
	"log"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/entity"
)

func VerifyToken(tokenString string) error {
	claims, err := ExtractClaims(tokenString)

	if err != nil {
		return err
	}

	_, err = jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	return err
}

func CheckToken(c *fiber.Ctx) error {
	accessToken := c.Cookies("access_token")
	refreshToken := c.Cookies("refresh_token")
	var err error

	token := c.Get("Authorization")
	tokenArray := strings.Split(token, " ")
	if token != "" && VerifyToken(tokenArray[len(tokenArray)-1]) == nil {
		return c.Next()
	}

	if refreshToken == "" {
		return c.Status(fiber.StatusForbidden).SendString("no refresh token found")
	}

	if accessToken == "" {
		accessToken, refreshToken, err = RenewToken(refreshToken)

		if err != nil {

			return c.Status(fiber.StatusForbidden).SendString("can't get new tokens")
		}
		accessTokenCookie, refreshTokenCoockie := GetAuthCookies(accessToken, refreshToken)
		c.Cookie(accessTokenCookie)
		c.Cookie(refreshTokenCoockie)

	}

	if VerifyToken(accessToken) != nil {
		return c.Status(fiber.ErrBadRequest.Code).SendString("accessToken is not valid")
	}

	return c.Next()
}

func ExtractClaims(tokenStr string) (jwt.MapClaims, error) {
	hmacSecret := []byte(os.Getenv("JWT_SECRET"))
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		// check token signing method etc
		return hmacSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	} else {
		log.Printf("Invalid JWT Token")
		return nil, err
	}
}

func GenerateToken(user entity.User) (string, string, error) {
	claims := jwt.MapClaims{
		"iss": user.Username,
		"exp": time.Now().Add(time.Hour * 15).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token
	t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		log.Fatalf("An Error Occured %v", err)
	}

	rtClaims := jwt.MapClaims{
		"iss": user.Username,
		"exp": time.Now().Add(time.Hour * time.Duration(24)).Unix(),
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)

	rt, err := refreshToken.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		log.Fatalf("An Error Occured %v", err)
	}

	return t, rt, err
}

func RenewToken(refreshToken string) (string, string, error) {
	err := VerifyToken(refreshToken)
	if err != nil {
		return "", "", err
	}

	rtClaims, err := ExtractClaims(refreshToken)

	if err != nil {
		return "", "", err
	}
	// Create token

	claims := jwt.MapClaims{
		"iss": rtClaims["iss"],
		"exp": time.Now().Add(time.Hour * 15).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token
	t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		log.Fatalf("An Error Occured %v", err)
	}

	// Create refresh token
	newRtClaims := jwt.MapClaims{
		"iss": rtClaims["iss"],
		"exp": time.Now().Add(time.Hour * time.Duration(24)).Unix(),
	}

	refreshTkn := jwt.NewWithClaims(jwt.SigningMethodHS256, newRtClaims)

	rt, _ := refreshTkn.SignedString([]byte(os.Getenv("JWT_SECRET")))

	return t, rt, nil
}

func GetAuthCookies(accessToken, refreshToken string) (*fiber.Cookie, *fiber.Cookie) {
	accessCookie := &fiber.Cookie{
		Name:     "access_token",
		Value:    accessToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
	}

	refreshCookie := &fiber.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		Expires:  time.Now().Add(2 * 24 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
	}

	return accessCookie, refreshCookie
}

func InvalidToken(accessToken, refreshToken string) (*fiber.Cookie, *fiber.Cookie) {
	accessCookie := &fiber.Cookie{
		Name:     "access_token",
		Value:    accessToken,
		Expires:  time.Now().Add(0),
		HTTPOnly: true,
		Secure:   true,
	}

	refreshCookie := &fiber.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		Expires:  time.Now().Add(0),
		HTTPOnly: true,
		Secure:   true,
	}

	return accessCookie, refreshCookie
}
