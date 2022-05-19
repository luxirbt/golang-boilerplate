package entity

type User struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	Password     string `json:"password"`
	Firstname    string `json:"firstname"`
	Lastname     string `json:"lastname"`
	IsActive     bool   `json:"is_active"`
	Email        string `json:"email"`
	CompanyName  string `json:"company_name"`
	IdCompany    int    `json:"id_company"`
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type UserPermission struct {
	Id       int    `json:"ID"`
	UserId   int    `json:"user_id"`
	Username string `json:"username"`
	AppName  string `json:"app_name"`
	Role     string `json:"role"`
	RoleId   int    `json:"role_id"`
	AppId    int    `json:"app_id"`
	Url      string `json:"url"`
	SvgLight string `json:"svg_light"`
	SvgDark  string `json:"svg_dark"`
}

type UserPermissionLight struct {
	AppName string
	Role    string
}

type UserLight struct {
	ID       int
	Username string `json:"username"`
}

type RefreshToken struct {
	Token string `json:"refresh_token"`
}
