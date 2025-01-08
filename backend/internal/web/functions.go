package web

import (
	"sync"

	"github.com/aceberg/AnyAppStart/internal/models"
	"github.com/aceberg/AnyAppStart/internal/service"
	"github.com/aceberg/AnyAppStart/internal/yaml"
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

	return tmpMap
}

func getAllStates(items []models.Item) (newItems []models.Item) {
	var wg sync.WaitGroup

	types := yaml.ReadTypes(appConfig.TypePath)
	newItems = []models.Item{}

	for _, item := range items {

		wg.Add(1)
		go func() {
			defer wg.Done()
			item = getOneState(item, types)
			newItems = append(newItems, item)
		}()
	}
	wg.Wait()

	return newItems
}

func getOneState(item models.Item, types map[string]map[string]string) models.Item {

	item.Exec = "State"
	ok, _ := service.Exec(item, types)
	if ok {
		item.State = "on"
	} else {
		item.State = "off"
	}

	return item
}
