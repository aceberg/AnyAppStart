package web

import (
	// "log"

	"github.com/aceberg/AnyAppStart/internal/models"
)

func typesToStruct(types map[string]map[string]string) (typeStructArray []models.TypeStruct) {
	var oneStruct models.TypeStruct

	for key, value := range types {
		oneStruct = models.TypeStruct{}
		oneStruct.Name = key

		oneStruct.Start = value["Start"]
		oneStruct.Restart = value["Restart"]
		oneStruct.Stop = value["Stop"]
		oneStruct.Logs = value["Logs"]
		oneStruct.State = value["State"]
		oneStruct.Mem = value["Mem"]
		oneStruct.CPU = value["CPU"]
		oneStruct.SSH = value["SSH"]
		oneStruct.AnyCom = value["AnyCom"]

		typeStructArray = append(typeStructArray, oneStruct)
	}

	return typeStructArray
}

func toOneType(tStruct models.TypeStruct) (tmpMap map[string]string) {

	tmpMap = make(map[string]string)

	tmpMap["Start"] = tStruct.Start
	tmpMap["Stop"] = tStruct.Stop
	tmpMap["Restart"] = tStruct.Restart
	tmpMap["Logs"] = tStruct.Logs
	tmpMap["State"] = tStruct.State
	tmpMap["Mem"] = tStruct.Mem
	tmpMap["CPU"] = tStruct.CPU
	tmpMap["SSH"] = tStruct.SSH
	tmpMap["AnyCom"] = tStruct.AnyCom

	return tmpMap
}

func setItemIDs(items []models.Item) []models.Item {
	var newItems []models.Item

	for i, item := range items {
		item.ID = i
		newItems = append(newItems, item)
	}
	return newItems
}
