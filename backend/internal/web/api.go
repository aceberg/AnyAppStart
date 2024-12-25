package web

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/QuickStart/internal/check"
	"github.com/aceberg/QuickStart/internal/conf"
	"github.com/aceberg/QuickStart/internal/models"
	"github.com/aceberg/QuickStart/internal/service"
	"github.com/aceberg/QuickStart/internal/yaml"
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
	type output struct {
		Ok  bool
		Out string
	}
	var data output

	oneItem.Name = c.Query("name")
	oneItem.Type = c.Query("type")
	oneItem.Exec = c.Query("exec")

	types := yaml.ReadTypes(appConfig.TypePath)
	data.Ok, data.Out = service.Exec(oneItem, types)

	c.IndentedJSON(http.StatusOK, data)
}

func apiGetItems(c *gin.Context) {

	items := yaml.Read(appConfig.ItemPath)

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
			if item == oldItem {
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

	log.Println("CONF", config)
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

	log.Println("OLD TYPE", oldType)
	log.Println("NEW TYPE", newType)

	c.IndentedJSON(http.StatusOK, true)
}
