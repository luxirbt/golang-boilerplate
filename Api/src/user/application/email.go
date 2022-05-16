package application

import (
	"crypto/tls"
	"fmt"

	"gopkg.in/gomail.v2"
)

func SendEmail(ID int) {

	m := gomail.NewMessage()

	addresse := "app.test@clirisgroup.net"
	password := "DasiaBitche6!"
	destination := "faysal.ch.2000@gmail.com"
	msg := fmt.Sprintf(`<h1>Cliris Group</h1>_________________________________________<br><br>Click here to choose a new password for your Cliris account.<br>http://localhost:3000/user/updatePassword?iduser=%d`, ID)

	m.SetHeader("From", addresse)

	m.SetHeader("To", destination)

	m.SetHeader("Subject", "Cliris group Cloud Change Password")

	m.SetBody("text/html", msg)

	d := gomail.NewDialer("mail.infomaniak.com", 465, addresse, password)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
		panic(err)
	}

}
