package dto

type UpdateUserDTO struct {
	Username  string `json:"username"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	IdCompany int    `json:"id_company"`
	IsActive  bool   `json:"is_active"`
}
