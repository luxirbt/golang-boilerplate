package services

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
)

func Upload(c *fiber.Ctx, key string) (string, error) {
	handler, err := c.FormFile(key)

	if err != nil {
		return "", err
	}

	if _, err := os.Stat(os.Getenv("UPLOAD_PATH")); os.IsNotExist(err) {
		err := os.Mkdir(os.Getenv("UPLOAD_PATH"), os.ModePerm)

		if err != nil {
			return "", err
		}
	}

	err = c.SaveFile(handler, fmt.Sprintf("%s/%s", os.Getenv("UPLOAD_PATH"), handler.Filename))

	if err != nil {
		return "", err
	}

	return handler.Filename, nil
}
