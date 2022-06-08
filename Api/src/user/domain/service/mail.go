package service

import (
	"crypto/tls"
	"fmt"
	"os"

	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/src/user/domain/entity"
	"gopkg.in/gomail.v2"
)

func SendMail(user *entity.User, lid int64) error {
	m := gomail.NewMessage()

	addresse := "app.test@clirisgroup.net"
	password := "DasiaBitche6!"
	msg := fmt.Sprintf(`Bonjour %s %s.<br /><br />Votre compte utilisateur des applications "Cliris" a été créé.<br/> Veuillez l'activer via le lien suivant et modifier votre mot de passe temporaire : <br><a href="%s/updatePassword?iduser=%d">Cliquez ici</a><br/><br/>`, user.Firstname, user.Lastname, os.Getenv("URL"), lid)

	msg += fmt.Sprintf(`Hello %s %s.<br /><br />Your user account for "Cliris" applications has been created.<br/> Click on the following link to activate the account and change the password : <br><a href="%s/updatePassword?iduser=%d">Click here</a><br/><br/>`, user.Firstname, user.Lastname, os.Getenv("URL"), lid)

	m.SetHeader("From", addresse)

	m.SetHeader("To", user.Email)

	m.SetHeader("Subject", "Activation compte utilisateur applications Cliris")

	m.SetBody("text/html", msg)

	d := gomail.NewDialer("mail.infomaniak.com", 465, addresse, password)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
