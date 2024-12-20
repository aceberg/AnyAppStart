package service

import (
	"log"
	"os/exec"

	"github.com/aceberg/QuickStart/internal/check"
	"github.com/aceberg/QuickStart/internal/models"
)

// Exec - run commnd
func Exec(item models.Item, typesMap map[string]models.OneType) (bool, string) {
	var str string

	t, ok := typesMap[item.Type]
	if ok {
		str, ok = t.ExecMap[item.Exec]
		if ok {

			str = str + " " + item.Name

			log.Println("String to exec:", str)
			cmd := exec.Command("sh", "-c", str)

			out, err := cmd.CombinedOutput()
			str = string(out)
			l := len(str)
			if l > 10000 {
				str = str[l-10000:]
			}
			if !check.IfError(err) {
				return true, str
			}
		}
	}

	return false, str
}
