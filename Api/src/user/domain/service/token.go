package service

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateToken(idUser int64) string {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	claims["iss"] = idUser

	t, err := token.SignedString([]byte(os.Getenv("RESET_PASSWORD_SECRET")))

	if err != nil {
		log.Fatalf("An Error Occured %v", err)
	}

	return t
}

func VerifyToken(tokenString string) error {
	claims, err := ExtractClaims(tokenString)

	if err != nil {
		return err
	}

	_, err = jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("RESET_PASSWORD_SECRET")), nil
	})

	return err
}

func ExtractClaims(tokenStr string) (jwt.MapClaims, error) {
	hmacSecret := []byte(os.Getenv("RESET_PASSWORD_SECRET"))
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
