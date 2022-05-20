package dto

type UserPermissionDTO struct {
	AppId       int    `json:"app_id"`
	AppName     string `json:"app_name"`
	Url         string `json:"url"`
	DisplayName string `json:"display_name"`
	WebApp      bool   `json:"web_app"`
	SvgLight    string `json:"svg_light"`
	SvgDark     string `json:"svg_dark"`
}
