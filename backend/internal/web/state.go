package web

import (
	"github.com/aceberg/QuickStart/internal/models"
	"github.com/aceberg/QuickStart/internal/service"
)

func getStates(items []models.Item, types map[string]models.OneType) (res []models.Item) {

	for _, item := range items {

		item.Exec = "State"
		ok, _ := service.Exec(item, types)
		if ok {
			item.State = "on"
		} else {
			item.State = "off"
		}
		res = append(res, item)
	}

	return res
}
