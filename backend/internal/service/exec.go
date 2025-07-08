package service

import (
	// "log"

	"os/exec"
	"strings"

	"github.com/aceberg/AnyAppStart/internal/check"
	"github.com/aceberg/AnyAppStart/internal/models"
)

// Exec - run command
func Exec(item models.Item, typesMap map[string]map[string]string) (bool, string) {
	var str string

	t, ok := typesMap[item.Type]
	if ok {
		str, ok = t[item.Exec]
		if ok {
			return anyExec(item.Name, t["SSH"], str)
		}
	}

	return false, "No such Type"
}

// ExecAny - run command
func ExecAny(item models.Item, typesMap map[string]map[string]string, cmd string) (bool, string) {

	t, ok := typesMap[item.Type]
	if ok {
		return anyExec(item.Name, t["SSH"], cmd)
	}

	return false, "No such Type"
}

func anyExec(name string, ssh string, str string) (bool, string) {
	if ssh != "" {
		str = ssh + " " + str
	}

	str = strings.Replace(str, "$ITEMNAME", name, -1)

	cmd := exec.Command("sh", "-c", str)

	out, err := cmd.CombinedOutput()

	_ = cmd.Process.Kill()

	str = string(out)
	l := len(str)
	if l > 10000 {
		str = str[l-10000:]
	}
	if !check.IfError(err) {
		return true, str
	}

	return false, str
}
