package web

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

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
	log.Println("EXEC DATA:", data)

	c.IndentedJSON(http.StatusOK, data)
}

func apiGetItems(c *gin.Context) {

	items := yaml.Read(appConfig.ItemPath)

	c.IndentedJSON(http.StatusOK, items)
}
