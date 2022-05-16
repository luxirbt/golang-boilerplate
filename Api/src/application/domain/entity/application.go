package entity

type Application struct {
	Id          int    `json:"id"`
	Appname     string `json:"appname"`
	Url         string `json:"url"`
	Displayname string `json:"displayname"`
	Webapp      bool   `json:"webapp"`
}

type Svg struct {
	Id             int    `json:"id"`
	Svg_light      string `json:"svg_light"`
	Svg_dark       string `json:"svg_dark"`
	Id_application int    `json:"id_application"`
}
