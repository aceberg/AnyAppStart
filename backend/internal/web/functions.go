package web

import (
	"github.com/aceberg/QuickStart/internal/models"
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
