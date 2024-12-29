package web

import (
	"github.com/aceberg/QuickStart/internal/models"
	"github.com/aceberg/QuickStart/internal/service"
	"github.com/aceberg/QuickStart/internal/yaml"
)

func typesToStruct(types map[string]models.OneType) (typeStructArray []models.TypeStruct) {
	var oneStruct models.TypeStruct

	for key, value := range types {
		oneStruct = models.TypeStruct{}
		oneStruct.Name = key

		oneStruct.Start = value.ExecMap["Start"]
		oneStruct.Restart = value.ExecMap["Restart"]
		oneStruct.Stop = value.ExecMap["Stop"]
		oneStruct.Logs = value.ExecMap["Logs"]
		oneStruct.State = value.ExecMap["State"]

		typeStructArray = append(typeStructArray, oneStruct)
	}

	return typeStructArray
}

func toOneType(tStruct models.TypeStruct) (oneType models.OneType) {

	tmpMap := make(map[string]string)

	tmpMap["Start"] = tStruct.Start
	tmpMap["Stop"] = tStruct.Stop
	tmpMap["Restart"] = tStruct.Restart
	tmpMap["Logs"] = tStruct.Logs
	tmpMap["State"] = tStruct.State

	oneType.ExecMap = tmpMap
	return oneType
}

func getAllStates(items []models.Item) (newItems []models.Item) {
	var ok bool

	types := yaml.ReadTypes(appConfig.TypePath)

	for _, item := range items {

		item.Exec = "State"
		ok, _ = service.Exec(item, types)
		if ok {
			item.State = "on"
		} else {
			item.State = "off"
		}
		newItems = append(newItems, item)
	}

	return newItems
}
