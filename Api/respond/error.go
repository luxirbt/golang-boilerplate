package respond

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

// printDebugf behaves like log.Printf only in the debug env
func printDebugf(format string, args ...interface{}) {
	log.Printf("[DEBUG] "+format+"\n", args...)

}

// ErrorResponse is Error response template
type ErrorResponse struct {
	Message string `json:"reason"`
	Error   error  `json:"-"`
}

func (e *ErrorResponse) String() string {
	return fmt.Sprintf("reason: %s, error: %s", e.Message, e.Error.Error())
}

// Respond is response write to ResponseWriter
func Respond(c *fiber.Ctx, code int, src interface{}) error {
	var body []byte
	var err error

	switch s := src.(type) {
	case []byte:
		if !json.Valid(s) {
			Error(c, fiber.StatusInternalServerError, err, "invalid json")
			return err
		}
		body = s
	case string:
		body = []byte(s)
	case *ErrorResponse, ErrorResponse:
		// avoid infinite loop
		if body, err = json.Marshal(src); err != nil {
			c.Set("Content-Type", "application/json; charset=UTF-8")
			c.Status(http.StatusInternalServerError)
			c.Write([]byte("{\"reason\":\"failed to parse json\"}"))
			return err
		}
	default:
		if body, err = json.Marshal(src); err != nil {
			Error(c, fiber.StatusInternalServerError, err, "failed to parse json")
			return err
		}
	}
	c.Status(code)
	c.Write(body)

	return err
}

// Error is wrapped Respond when error response
func Error(c *fiber.Ctx, code int, err error, msg string) error {
	e := &ErrorResponse{
		Message: msg,
		Error:   err,
	}
	printDebugf("%s", e.String())
	c.Set("Content-Type", "application/json; charset=UTF-8")
	err = Respond(c, code, e)

	return err
}

// JSON is wrapped Respond when success response
func JSON(c *fiber.Ctx, code int, src interface{}) error {
	c.Set("Content-Type", "application/json; charset=UTF-8")
	err := Respond(c, code, src)

	return err
}
