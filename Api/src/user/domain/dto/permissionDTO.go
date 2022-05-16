package dto

type UserPermissionDTO struct {
	AppId    int    `json:"app_id"`
	AppName  string `json:"app_name"`
	Url      string `json:"url"`
	SvgLight string `json:"svg_light"`
	SvgDark  string `json:"svg_dark"`
}
