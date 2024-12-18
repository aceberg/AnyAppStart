package service

import (
	"log"
	"os/exec"

	"github.com/aceberg/QuickStart/internal/check"
	"github.com/aceberg/QuickStart/internal/models"
)

// Exec - run commnd
func Exec(item models.Item) (bool, string) {
	var str string

	if item.Type == "Docker" {

		str = "/usr/bin/docker "

		switch item.Exec {
		case "Start":
			str = str + "start "
		case "Stop":
			str = str + "stop "
		case "Restart":
			str = str + "restart "
		case "Logs":
			str = str + "logs "
		}

		str = str + item.Name
		log.Println("STR:", str)
	}

	cmd := exec.Command("/bin/bash", "-c", str)

	out, err := cmd.CombinedOutput()
	if check.IfError(err) {
		return false, string(out)
	}

	return true, string(out)
}
