package web

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/AnyAppStart/internal/check"
	"github.com/aceberg/AnyAppStart/internal/conf"
	"github.com/aceberg/AnyAppStart/internal/models"
	"github.com/aceberg/AnyAppStart/internal/service"
	"github.com/aceberg/AnyAppStart/internal/yaml"
)

func apiHandler(c *gin.Context) {

	msg := "This is API"
	log.Println(msg)

	c.IndentedJSON(http.StatusOK, msg)
}

func apiGetConfig(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, appConfig)
}

func apiExec(c *gin.Context) {
	var oneItem models.Item
	var data models.ExecOutput

	oneItem.Name = c.Query("name")
	oneItem.Type = c.Query("type")
	oneItem.Exec = c.Query("exec")

	types := yaml.ReadTypes(appConfig.TypePath)
	data.Ok, data.Out = service.Exec(oneItem, types)

	c.IndentedJSON(http.StatusOK, data)
}

func apiGetItems(c *gin.Context) {

	items := yaml.Read(appConfig.ItemPath)

	sort.Slice(items, func(i, j int) bool {
		return items[i].Name < items[j].Name
	})

	items = setItemIDs(items)

	c.IndentedJSON(http.StatusOK, items)
}

func apiSaveItem(c *gin.Context) {
	var oldItem, newItem models.Item
	var items []models.Item

	str := c.PostForm("old")
	err := json.Unmarshal([]byte(str), &oldItem)
	check.IfError(err)

	str = c.PostForm("new")
	err = json.Unmarshal([]byte(str), &newItem)
	check.IfError(err)

	if oldItem.Name == "" && newItem.Name != "" {
		items = yaml.Read(appConfig.ItemPath)
		items = append(items, newItem)
	} else {
		for _, item := range yaml.Read(appConfig.ItemPath) {
			if item.Name == oldItem.Name && item.Type == oldItem.Type {
				if newItem.Name != "" {
					items = append(items, newItem)
				}
			} else {
				items = append(items, item)
			}
		}
	}

	yaml.Write(appConfig.ItemPath, items)

	c.IndentedJSON(http.StatusOK, true)
}

func apiSaveConf(c *gin.Context) {
	var config models.Conf

	str := c.PostForm("conf")
	err := json.Unmarshal([]byte(str), &config)
	check.IfError(err)

	// log.Println("CONF", config)
	appConfig.Host = config.Host
	appConfig.Port = config.Port
	appConfig.Theme = config.Theme
	appConfig.Color = config.Color
	appConfig.NodePath = config.NodePath

	conf.Write(appConfig)

	c.IndentedJSON(http.StatusOK, true)
}

func apiGetTypes(c *gin.Context) {

	types := yaml.ReadTypes(appConfig.TypePath)
	tStruct := typesToStruct(types)

	sort.Slice(tStruct, func(i, j int) bool {
		return tStruct[i].Name < tStruct[j].Name
	})

	c.IndentedJSON(http.StatusOK, tStruct)
}

func apiSaveType(c *gin.Context) {
	var oldType, newType models.TypeStruct

	str := c.PostForm("old")
	err := json.Unmarshal([]byte(str), &oldType)
	check.IfError(err)

	str = c.PostForm("new")
	err = json.Unmarshal([]byte(str), &newType)
	check.IfError(err)

	types := yaml.ReadTypes(appConfig.TypePath)

	if types == nil {
		types = make(map[string]map[string]string)
	}

	if oldType.Name == "" && newType.Name != "" { // If new type
		types[newType.Name] = toOneType(newType)
	} else {
		for key := range types {
			if key == oldType.Name { // Found type to edit
				if newType.Name != "" { // Edit
					delete(types, oldType.Name)
					types[newType.Name] = toOneType(newType)
				} else { // Delete
					delete(types, key)
				}
			}
		}
	}

	yaml.WriteTypes(appConfig.TypePath, types)

	c.IndentedJSON(http.StatusOK, true)
}

func apiExecAny(c *gin.Context) {
	var item models.Item
	var data models.ExecOutput

	str := c.PostForm("item")
	err := json.Unmarshal([]byte(str), &item)
	check.IfError(err)

	str = c.PostForm("command")

	types := yaml.ReadTypes(appConfig.TypePath)
	data.Ok, data.Out = service.ExecAny(item, types, str)

	c.IndentedJSON(http.StatusOK, data)
}
